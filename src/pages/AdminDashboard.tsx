
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { mockAccounts, mockTransactions, promotionPackages } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Check, X, Eye, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 10;

export function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [pendingAccounts, setPendingAccounts] = useState(
    mockAccounts.filter(account => account.verificationStatus === 'pending')
  );
  const [pendingPage, setPendingPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);
  const [transactionPage, setTransactionPage] = useState(1);

  if (!user || user.type !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">アクセス権限がありません</h1>
          <p className="text-gray-600 text-sm md:text-base">グローバル管理者としてログインしてください。</p>
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

  // Pagination helpers
  const getPaginatedData = (data: any[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (dataLength: number) => Math.ceil(dataLength / ITEMS_PER_PAGE);

  const PaginationComponent = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
  }: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void; 
  }) => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('admin.title')}</h1>
          <p className="text-gray-600 text-sm md:text-base">{t('admin.description')}</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t('admin.approved')}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">{approvedAccounts.length}</p>
                </div>
                <Check className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t('admin.pending')}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">{pendingAccounts.length}</p>
                </div>
                <Eye className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t('admin.revenue')}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">฿{(totalRevenue * 0.9).toFixed(0)}</p>
                </div>
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t('admin.followers')}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">
                    {approvedAccounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="text-xs md:text-sm">{t('admin.pending.accounts')}</TabsTrigger>
            <TabsTrigger value="accounts" className="text-xs md:text-sm">{t('admin.approved.list')}</TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs md:text-sm">{t('admin.transaction.list')}</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('admin.pending.accounts')}</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingAccounts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">{t('admin.no.pending')}</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {getPaginatedData(pendingAccounts, pendingPage).map((account) => (
                        <div key={account.id} className="border border-gray-200 rounded-lg p-4 md:p-6">
                          <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
                            <img 
                              src={account.image} 
                              alt={account.name}
                              className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-2">{account.name}</h3>
                              <p className="text-gray-600 mb-3 text-sm md:text-base">{account.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {account.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              {account.location && (
                                <p className="text-xs md:text-sm text-gray-500">{account.location.address}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button 
                              onClick={() => handleAccountApproval(account.id, true)}
                              className="bg-green-500 hover:bg-green-600 w-full sm:w-auto"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              {t('admin.approve')}
                            </Button>
                            <Button 
                              onClick={() => handleAccountApproval(account.id, false)}
                              variant="destructive"
                              className="w-full sm:w-auto"
                            >
                              <X className="w-4 h-4 mr-2" />
                              {t('admin.reject')}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <PaginationComponent
                      currentPage={pendingPage}
                      totalPages={getTotalPages(pendingAccounts.length)}
                      onPageChange={setPendingPage}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('admin.approved.list')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getPaginatedData(approvedAccounts, approvedPage).map((account) => (
                    <div key={account.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={account.image} 
                          alt={account.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{account.name}</h3>
                          <p className="text-xs md:text-sm text-gray-600">{account.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 lg:gap-6 w-full lg:w-auto">
                        <div className="text-center">
                          <p className="text-xs text-gray-600">{t('admin.followers')}</p>
                          <p className="font-semibold text-sm">{account.followers.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">{t('manager.rating')}</p>
                          <p className="font-semibold text-sm">{account.rating}/5.0</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">{t('manager.views')}</p>
                          <p className="font-semibold text-sm">{account.views.toLocaleString()}</p>
                        </div>
                        {account.isPromoted && (
                          <Badge className="bg-orange-500 text-xs">{t('manager.promoting')}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <PaginationComponent
                  currentPage={approvedPage}
                  totalPages={getTotalPages(approvedAccounts.length)}
                  onPageChange={setApprovedPage}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('admin.transaction.list')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getPaginatedData(mockTransactions, transactionPage).map((transaction) => {
                    const pkg = promotionPackages.find(p => p.id === transaction.packageId);
                    return (
                      <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{t('admin.transaction.id')}: {transaction.id}</h3>
                          <p className="text-xs md:text-sm text-gray-600">{t('admin.package')}: {pkg?.name}</p>
                          <p className="text-xs md:text-sm text-gray-600">{t('admin.organizer.id')}: {transaction.organizerId}</p>
                          <p className="text-xs md:text-sm text-gray-600">{t('admin.date')}: {transaction.date}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-lg md:text-xl font-bold text-gray-900">฿{(transaction.amount * 0.9).toFixed(0)}</p>
                          <Badge 
                            variant={
                              transaction.status === 'completed' ? 'default' :
                              transaction.status === 'pending' ? 'secondary' : 'destructive'
                            }
                            className="text-xs"
                          >
                            {transaction.status === 'completed' ? t('manager.completed') :
                             transaction.status === 'pending' ? t('manager.pending') : t('manager.failed')}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <PaginationComponent
                  currentPage={transactionPage}
                  totalPages={getTotalPages(mockTransactions.length)}
                  onPageChange={setTransactionPage}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
