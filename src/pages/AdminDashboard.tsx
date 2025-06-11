
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { mockAccounts, mockTransactions, promotionPackages } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Eye, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [pendingAccounts, setPendingAccounts] = useState(
    mockAccounts.filter(account => account.verificationStatus === 'pending')
  );

  if (!user || user.type !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">アクセス権限がありません</h1>
          <p className="text-gray-600">グローバル管理者としてログインしてください。</p>
        </div>
      </div>
    );
  }

  const handleAccountApproval = (accountId: string, approved: boolean) => {
    setPendingAccounts(prev => prev.filter(acc => acc.id !== accountId));
    toast({
      title: approved ? t('admin.approved.message') : t('admin.rejected.message'),
      description: t('admin.review.completed'),
    });
  };

  const approvedAccounts = mockAccounts.filter(account => account.verificationStatus === 'approved');
  const totalRevenue = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('admin.title')}</h1>
          <p className="text-gray-600">{t('admin.description')}</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('admin.approved')}</p>
                  <p className="text-2xl font-bold text-gray-900">{approvedAccounts.length}</p>
                </div>
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('admin.pending')}</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingAccounts.length}</p>
                </div>
                <Eye className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('admin.revenue')}</p>
                  <p className="text-2xl font-bold text-gray-900">¥{totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('admin.followers')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {approvedAccounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">{t('admin.pending.accounts')}</TabsTrigger>
            <TabsTrigger value="accounts">{t('admin.approved.list')}</TabsTrigger>
            <TabsTrigger value="transactions">{t('admin.transaction.list')}</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.pending.accounts')}</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingAccounts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">{t('admin.no.pending')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingAccounts.map((account) => (
                      <div key={account.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <img 
                            src={account.image} 
                            alt={account.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{account.name}</h3>
                            <p className="text-gray-600 mb-3">{account.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {account.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            {account.location && (
                              <p className="text-sm text-gray-500">{account.location.address}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button 
                            onClick={() => handleAccountApproval(account.id, true)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            {t('admin.approve')}
                          </Button>
                          <Button 
                            onClick={() => handleAccountApproval(account.id, false)}
                            variant="destructive"
                          >
                            <X className="w-4 h-4 mr-2" />
                            {t('admin.reject')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.approved.list')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={account.image} 
                          alt={account.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{account.name}</h3>
                          <p className="text-sm text-gray-600">{account.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">{t('admin.followers')}</p>
                          <p className="font-semibold">{account.followers.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">{t('manager.rating')}</p>
                          <p className="font-semibold">{account.rating}/5.0</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">{t('manager.views')}</p>
                          <p className="font-semibold">{account.views.toLocaleString()}</p>
                        </div>
                        {account.isPromoted && (
                          <Badge className="bg-orange-500">{t('manager.promoting')}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.transaction.list')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => {
                    const pkg = promotionPackages.find(p => p.id === transaction.packageId);
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">{t('admin.transaction.id')}: {transaction.id}</h3>
                          <p className="text-sm text-gray-600">{t('admin.package')}: {pkg?.name}</p>
                          <p className="text-sm text-gray-600">{t('admin.organizer.id')}: {transaction.organizerId}</p>
                          <p className="text-sm text-gray-600">{t('admin.date')}: {transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">¥{transaction.amount.toLocaleString()}</p>
                          <Badge 
                            variant={
                              transaction.status === 'completed' ? 'default' :
                              transaction.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {transaction.status === 'completed' ? t('manager.completed') :
                             transaction.status === 'pending' ? t('manager.pending') : t('manager.failed')}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
