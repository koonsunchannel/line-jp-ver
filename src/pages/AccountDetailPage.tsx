
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAccounts, categories } from '../data/mockData';
import { Star, Users, MapPin, ExternalLink, ArrowLeft, Eye, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const account = mockAccounts.find(acc => acc.id === id);

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบบัญชี</h1>
          <Button onClick={() => navigate('/')}>กลับสู่หน้าแรก</Button>
        </div>
      </div>
    );
  }

  const categoryInfo = categories.find(c => c.id === account.category);

  const handleAddFriend = () => {
    // In a real app, this would open LINE app or show QR code
    window.open(`https://line.me/R/ti/p/@${account.id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับ
        </Button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="relative h-64 md:h-80">
            <img 
              src={account.image} 
              alt={account.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {account.isPromoted && (
              <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                โปรโมชั่น
              </Badge>
            )}

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{account.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                {categoryInfo && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {categoryInfo.icon} {categoryInfo.name}
                  </Badge>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{account.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{account.followers.toLocaleString()} คน</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Description */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">แนะนำบัญชี</h2>
                  <p className="text-gray-700 leading-relaxed">{account.description}</p>
                </section>

                {/* Tags */}
                <section className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">แท็ก</h3>
                  <div className="flex flex-wrap gap-2">
                    {account.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </section>

                {/* Location */}
                {account.location && (
                  <section className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">ที่ตั้ง</h3>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-gray-700">{account.location.address}</p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-sm text-blue-600"
                          onClick={() => window.open(`https://maps.google.com/?q=${account.location?.lat},${account.location?.lng}`, '_blank')}
                        >
                          เปิดใน Google Maps <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              <div className="lg:col-span-1">
                {/* Stats */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">สถิติ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">การดู</span>
                      </div>
                      <span className="font-semibold">{account.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">เพิ่มเพื่อน</span>
                      </div>
                      <span className="font-semibold">{account.friendAdds.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">ผู้ติดตาม</span>
                      </div>
                      <span className="font-semibold">{account.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-600">คะแนน</span>
                      </div>
                      <span className="font-semibold">{account.rating}/5.0</span>
                    </div>
                  </CardContent>
                </Card>

                {/* QR Code */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">QR Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <img 
                        src={account.qrCode} 
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs text-gray-600 text-center">
                      สแกน QR Code ด้วยแอป LINE เพื่อเพิ่มเพื่อน
                    </p>
                  </CardContent>
                </Card>

                {/* Add Friend Button */}
                <Button 
                  onClick={handleAddFriend}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold"
                >
                  เพิ่มเพื่อน
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
