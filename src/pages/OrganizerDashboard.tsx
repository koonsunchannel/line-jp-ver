
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
      <div className="min-h-screen flex items-center justify-center px-4">
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
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('manager.title')}</h1>
            <p className="text-gray-600 text-sm md:text-base">{t('manager.description')}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button 
              onClick={handleExportExcel}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{t('manager.export.excel')}</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button 
              onClick={() => setShowRegistrationForm(true)}
              className="bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t('manager.submit.application')}</span>
              <span className="sm:hidden">New Application</span>
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t('manager.total.views')}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">
                    {myAccounts.reduce((sum, acc) => sum + acc.views, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t('manager.friend.adds')}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">
                    {myAccounts.reduce((sum, acc) => sum + acc.friendAdds, 0).toLocaleString()}
                  </p>
                </div>
                <UserPlus className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t('manager.total.followers')}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">
                    {myAccounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t('manager.average.rating')}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">
                    {(myAccounts.reduce((sum, acc) => sum + acc.rating, 0) / myAccounts.length || 0).toFixed(1)}
                  </p>
                </div>
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Analytics Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                {t('manager.analytics')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
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
              <CardTitle className="text-base md:text-lg">{t('manager.account.performance')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={myAccounts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={10} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="friendAdds" fill="#10b981" name={t('manager.friend.adds')} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* My Accounts */}
        <Card className="mb-6 md:mb-8">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">{t('manager.my.accounts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myAccounts.map((account) => (
                <div key={account.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
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
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full sm:w-auto">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">{t('manager.views')}</p>
                      <p className="font-semibold text-sm">{account.views.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">{t('manager.friend.adds')}</p>
                      <p className="font-semibold text-sm">{account.friendAdds.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">{t('manager.rating')}</p>
                      <p className="font-semibold text-sm">{account.rating}/5.0</p>
                    </div>
                    {account.isPromoted && (
                      <Badge className="bg-orange-500 text-xs">{t('manager.promoting')}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Promotion Packages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Package className="w-4 h-4 md:w-5 md:h-5" />
                {t('manager.promotion.packages')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotionPackages.map((pkg) => (
                  <div key={pkg.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">{pkg.name}</h3>
                        {pkg.isPopular && (
                          <Badge className="bg-orange-500 text-white mt-1 text-xs">{t('manager.popular')}</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-gray-900">฿{(pkg.price * 0.9).toFixed(0)}</p>
                        <p className="text-xs md:text-sm text-gray-600">{pkg.duration}日間</p>
                      </div>
                    </div>
                    <ul className="text-xs md:text-sm text-gray-600 mb-4 space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => handlePackagePurchase(pkg.id)}
                      className="w-full text-sm"
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
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                {t('manager.transaction.history')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTransactions.map((transaction) => {
                  const pkg = promotionPackages.find(p => p.id === transaction.packageId);
                  return (
                    <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">{pkg?.name}</h3>
                        <p className="text-xs md:text-sm text-gray-600">{transaction.date}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-semibold text-gray-900 text-sm md:text-base">฿{(transaction.amount * 0.9).toFixed(0)}</p>
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
