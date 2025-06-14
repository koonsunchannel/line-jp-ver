import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { mockAccounts } from '../data/mockData';
import { LineOAAccount } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, Lock, Shield, CheckCircle, Edit, UserCog } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AccountEditModal } from '../components/AccountEditModal';

export function ProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<LineOAAccount | null>(null);
  const [showAccountEdit, setShowAccountEdit] = useState(false);
  const [myAccounts, setMyAccounts] = useState<LineOAAccount[]>(
    mockAccounts.filter(account => account.ownerId === user?.id)
  );
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t('auth.login.required')}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t('auth.login.required.description')}</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setShowVerificationModal(true);
  };

  const handleVerification = async () => {
    setIsVerifying(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verificationCode === '123456') {
        toast({
          title: "บันทึกข้อมูลสำเร็จ",
          description: "ข้อมูลโปรไฟล์ของคุณได้รับการอัปเดตเรียบร้อยแล้ว",
        });
        setEditMode(false);
        setShowVerificationModal(false);
        setVerificationCode('');
      } else {
        toast({
          title: "รหัสยืนยันไม่ถูกต้อง",
          description: "กรุณาตรวจสอบรหัสยืนยันและลองใหม่อีกครั้ง",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถยืนยันตัวตนได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const sendVerificationCode = async () => {
    toast({
      title: "ส่งรหัสยืนยันแล้ว",
      description: "รหัสยืนยันถูกส่งไปยังอีเมลของคุณแล้ว (ทดสอบ: 123456)",
    });
  };

  const getUserTypeDisplay = (type: string) => {
    switch (type) {
      case 'general': return t('auth.user.type.user');
      case 'organizer': return t('auth.user.type.organizer');
      case 'admin': return t('auth.user.type.admin');
      default: return type;
    }
  };

  const handleEditAccount = (account: LineOAAccount) => {
    setSelectedAccount(account);
    setShowAccountEdit(true);
  };

  const handleSaveAccount = (updatedAccount: LineOAAccount) => {
    setMyAccounts(prev => prev.map(acc => 
      acc.id === updatedAccount.id ? updatedAccount : acc
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('profile.title')}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t('profile.description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-4">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                <CardTitle className="text-lg sm:text-xl">{t('profile.information')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">{t('auth.name')}</Label>
                  {editMode ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 p-2 bg-gray-50 rounded">{user.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">{t('auth.email')}</Label>
                  {editMode ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 p-2 bg-gray-50 rounded">{user.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">{t('auth.phone')}</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder={t('auth.phone.placeholder')}
                    disabled={!editMode}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">{t('auth.user.type')}</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      {getUserTypeDisplay(user.type)}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  {editMode ? (
                    <>
                      <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-sm sm:text-base">
                        <Shield className="w-4 h-4 mr-2" />
                        {t('profile.save')} (ต้องยืนยันตัวตน)
                      </Button>
                      <Button variant="outline" onClick={() => setEditMode(false)} className="text-sm sm:text-base">
                        {t('auth.cancel')}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setEditMode(true)} variant="outline" className="text-sm sm:text-base">
                      <Settings className="w-4 h-4 mr-2" />
                      {t('profile.edit')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* My LINE OA Accounts */}
            {user.type === 'organizer' && (
              <Card>
                <CardHeader className="flex flex-row items-center gap-3 pb-4">
                  <UserCog className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  <CardTitle className="text-lg sm:text-xl">บัญชี LINE OA ของฉัน</CardTitle>
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
                            <Badge variant="outline" className="text-xs mt-1">
                              {account.lineId}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleEditAccount(account)}
                          variant="outline" 
                          size="sm"
                          className="text-sm"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          แก้ไข
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Security Settings */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-4">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                <CardTitle className="text-lg sm:text-xl">{t('profile.security')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm sm:text-base text-gray-600">
                  <p className="mb-3">{t('profile.2fa.description')}</p>
                  <Badge variant="outline" className="text-xs sm:text-sm text-green-700 bg-green-50">
                    {t('profile.2fa.enabled')}
                  </Badge>
                </div>
                
                <Button variant="outline" className="w-full text-sm sm:text-base">
                  {t('profile.change.password')}
                </Button>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card className="mt-4">
              <CardHeader className="flex flex-row items-center gap-3 pb-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                <CardTitle className="text-lg sm:text-xl">สถานะการยืนยัน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm sm:text-base text-gray-600">
                  <p className="mb-3">การแก้ไขข้อมูลโปรไฟล์ต้องยืนยันตัวตนเพื่อความปลอดภัย</p>
                  <Badge variant="outline" className="text-xs sm:text-sm text-blue-700 bg-blue-50">
                    ยืนยันผ่านอีเมล
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              ยืนยันตัวตนเพื่อบันทึกข้อมูล
            </DialogTitle>
            <DialogDescription>
              เราได้ส่งรหัสยืนยันไปยังอีเมล {user.email} กรุณากรอกรหัสเพื่อยืนยันการเปลี่ยนแปลง
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="verificationCode">รหัสยืนยัน</Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="กรอกรหัส 6 หลัก"
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-gray-500 mt-1">
                สำหรับการทดสอบ: ใช้รหัส "123456"
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleVerification}
                disabled={isVerifying || verificationCode.length !== 6}
                className="bg-green-500 hover:bg-green-600"
              >
                {isVerifying ? 'กำลังยืนยัน...' : 'ยืนยันและบันทึก'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={sendVerificationCode}
                className="text-sm"
              >
                ส่งรหัสใหม่
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => {
                  setShowVerificationModal(false);
                  setVerificationCode('');
                }}
                className="text-sm"
              >
                ยกเลิก
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Edit Modal */}
      {selectedAccount && (
        <AccountEditModal
          isOpen={showAccountEdit}
          onClose={() => {
            setShowAccountEdit(false);
            setSelectedAccount(null);
          }}
          account={selectedAccount}
          onSave={handleSaveAccount}
        />
      )}
    </div>
  );
}
