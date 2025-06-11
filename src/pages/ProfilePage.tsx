
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, Lock } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
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
    toast({
      title: t('profile.update.success'),
      description: t('profile.update.success.description'),
    });
    setEditMode(false);
  };

  const getUserTypeDisplay = (type: string) => {
    switch (type) {
      case 'general': return t('auth.user.type.user');
      case 'organizer': return t('auth.user.type.organizer');
      case 'admin': return t('auth.user.type.admin');
      default: return type;
    }
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
          <div className="lg:col-span-2">
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
                        {t('profile.save')}
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
          </div>
        </div>
      </div>
    </div>
  );
}
