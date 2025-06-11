
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { AccountRegistrationForm } from '../components/AccountRegistrationForm';
import { mockAccounts, promotionPackages, mockTransactions } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, UserPlus, Users, Star, TrendingUp, Package, CreditCard, Download, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';

export function OrganizerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  if (!user || user.type !== 'organizer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">アクセス権限がありません</h1>
          <p className="text-gray-600">オーガナイザーとしてログインしてください。</p>
        </div>
      </div>
    );
  }

  const myAccounts = mockAccounts.filter(account => account.ownerId === user.id);
  const myTransactions = mockTransactions.filter(t => t.organizerId === user.id);

  // Mock analytics data
  const analyticsData = [
    { name: '1月', views: 1200, friendAdds: 180 },
    { name: '2月', views: 1800, friendAdds: 250 },
    { name: '3月', views: 2500, friendAdds: 320 },
    { name: '4月', views: 2200, friendAdds: 290 },
    { name: '5月', views: 2800, friendAdds: 380 },
    { name: '6月', views: 3200, friendAdds: 450 }
  ];

  const handlePackagePurchase = (packageId: string) => {
    setSelectedPackage(packageId);
    const pkg = promotionPackages.find(p => p.id === packageId);
    alert(`${pkg?.name} パッケージの購入手続きを開始します。`);
  };

  const handleExportExcel = () => {
    // Create Excel data
    const data = myAccounts.map(account => ({
      name: account.name,
      category: account.category,
      followers: account.followers,
      views: account.views,
      friendAdds: account.friendAdds,
      rating: account.rating
    }));

    // Convert to CSV format (simplified Excel export)
    const headers = ['Name', 'Category', 'Followers', 'Views', 'Friend Adds', 'Rating'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'line_oa_statistics.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: t('manager.export.success'),
      description: 'CSV ファイルがダウンロードされました',
    });
  };

  const handleRegistrationSubmit = (data: any) => {
    // Add logic to submit registration
    toast({
      title: "申請を送信しました",
      description: "LINE OA登録申請が正常に送信されました。",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('manager.title')}</h1>
            <p className="text-gray-600">{t('manager.description')}</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleExportExcel}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('manager.export.excel')}
            </Button>
            <Button 
              onClick={() => setShowRegistrationForm(true)}
              className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t('manager.submit.application')}
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('manager.total.views')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myAccounts.reduce((sum, acc) => sum + acc.views, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('manager.friend.adds')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myAccounts.reduce((sum, acc) => sum + acc.friendAdds, 0).toLocaleString()}
                  </p>
                </div>
                <UserPlus className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('manager.total.followers')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myAccounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('manager.average.rating')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(myAccounts.reduce((sum, acc) => sum + acc.rating, 0) / myAccounts.length || 0).toFixed(1)}
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Analytics Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t('manager.analytics')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} name={t('manager.views')} />
                  <Line type="monotone" dataKey="friendAdds" stroke="#10b981" strokeWidth={2} name={t('manager.friend.adds')} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Account Performance */}
          <Card>
            <CardHeader>
              <CardTitle>{t('manager.account.performance')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={myAccounts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="friendAdds" fill="#10b981" name={t('manager.friend.adds')} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* My Accounts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('manager.my.accounts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myAccounts.map((account) => (
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
                      <p className="text-sm text-gray-600">{t('manager.views')}</p>
                      <p className="font-semibold">{account.views.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">{t('manager.friend.adds')}</p>
                      <p className="font-semibold">{account.friendAdds.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">{t('manager.rating')}</p>
                      <p className="font-semibold">{account.rating}/5.0</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Promotion Packages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                {t('manager.promotion.packages')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotionPackages.map((pkg) => (
                  <div key={pkg.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                        {pkg.isPopular && (
                          <Badge className="bg-orange-500 text-white mt-1">{t('manager.popular')}</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">¥{pkg.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{pkg.duration}日間</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => handlePackagePurchase(pkg.id)}
                      className="w-full"
                      variant={pkg.isPopular ? "default" : "outline"}
                    >
                      {t('manager.purchase')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                {t('manager.transaction.history')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTransactions.map((transaction) => {
                  const pkg = promotionPackages.find(p => p.id === transaction.packageId);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{pkg?.name}</h3>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">¥{transaction.amount.toLocaleString()}</p>
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
        </div>

        <AccountRegistrationForm
          isOpen={showRegistrationForm}
          onClose={() => setShowRegistrationForm(false)}
          onSubmit={handleRegistrationSubmit}
        />
      </div>
    </div>
  );
}
