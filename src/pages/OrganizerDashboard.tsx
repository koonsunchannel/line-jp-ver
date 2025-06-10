
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockAccounts, promotionPackages, mockTransactions } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, UserPlus, Users, Star, TrendingUp, Package, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function OrganizerDashboard() {
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

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
    // In a real app, this would redirect to payment processing
    alert(`${promotionPackages.find(p => p.id === packageId)?.name} パッケージの購入手続きを開始します。`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">オーガナイザーダッシュボード</h1>
          <p className="text-gray-600">ようこそ、{user.name}さん</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">総閲覧数</p>
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
                  <p className="text-sm text-gray-600">友だち追加数</p>
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
                  <p className="text-sm text-gray-600">総フォロワー数</p>
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
                  <p className="text-sm text-gray-600">平均評価</p>
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
                アクセス推移
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} name="閲覧数" />
                  <Line type="monotone" dataKey="friendAdds" stroke="#10b981" strokeWidth={2} name="友だち追加" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Account Performance */}
          <Card>
            <CardHeader>
              <CardTitle>アカウント別パフォーマンス</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={myAccounts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="friendAdds" fill="#10b981" name="友だち追加" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* My Accounts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>管理中のアカウント</CardTitle>
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
                      <p className="text-sm text-gray-600">閲覧数</p>
                      <p className="font-semibold">{account.views.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">友だち追加</p>
                      <p className="font-semibold">{account.friendAdds.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">評価</p>
                      <p className="font-semibold">{account.rating}/5.0</p>
                    </div>
                    {account.isPromoted && (
                      <Badge className="bg-orange-500">プロモーション中</Badge>
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
                プロモーションパッケージ
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
                          <Badge className="bg-orange-500 text-white mt-1">人気</Badge>
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
                      購入する
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
                取引履歴
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
                          {transaction.status === 'completed' ? '完了' :
                           transaction.status === 'pending' ? '処理中' : '失敗'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
