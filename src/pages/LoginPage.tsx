
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { UserRegistrationForm } from '../components/UserRegistrationForm';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password, userType);
      if (success) {
        toast({
          title: t('auth.login.success'),
          description: t('auth.login.success.description'),
        });
        
        // Redirect based on user type
        if (userType === 'organizer') {
          navigate('/organizer');
        } else if (userType === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: t('auth.login.failed'),
          description: t('auth.login.failed.description'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSuccess = (userData: any) => {
    toast({
      title: t('auth.register.success'),
      description: t('auth.register.success.description'),
    });
    setShowRegistration(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      {/* Language Switcher in top right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            {t('auth.login.title')}
          </CardTitle>
          <p className="text-sm sm:text-base text-gray-600">{t('auth.login.description')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="userType" className="text-sm sm:text-base">{t('auth.user.type')}</Label>
              <Select value={userType} onValueChange={(value: UserType) => setUserType(value)}>
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="general">{t('auth.user.type.user')}</SelectItem>
                  <SelectItem value="organizer">{t('auth.user.type.organizer')}</SelectItem>
                  <SelectItem value="admin">{t('auth.user.type.admin')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm sm:text-base">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="text-sm sm:text-base"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm sm:text-base">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.password.placeholder')}
                required
                className="text-sm sm:text-base"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? t('auth.login.loading') : t('auth.login.button')}
            </Button>
          </form>

          <div className="mt-4">
            <Button 
              type="button"
              variant="outline"
              className="w-full text-sm sm:text-base"
              onClick={() => setShowRegistration(true)}
            >
              {t('auth.register.button')}
            </Button>
          </div>

          <div className="mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-xs sm:text-sm text-gray-700 mb-2">{t('auth.test.accounts')}</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>{t('auth.organizer')}: tanaka@example.com</div>
              <div>{t('auth.admin')}: admin@example.com</div>
              <div>{t('auth.general')}: yamada@example.com</div>
              <div className="font-medium">{t('auth.password.any')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <UserRegistrationForm
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
}
