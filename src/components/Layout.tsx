
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Home, User, Settings, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Layout() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavItems = () => (
    <>
      <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
        <Home className="w-5 h-5" />
        <span>{t('nav.home')}</span>
      </Link>
      
      {user?.type === 'organizer' && (
        <Link to="/organizer" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
          <Settings className="w-5 h-5" />
          <span>{t('nav.management')}</span>
        </Link>
      )}
      
      {user?.type === 'admin' && (
        <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
          <Settings className="w-5 h-5" />
          <span>{t('nav.management')}</span>
        </Link>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LINE</span>
              </div>
              <span className="font-bold text-xl text-gray-900">{t('site.title')}</span>
            </Link>

            {isMobile ? (
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <div className="flex flex-col gap-6 mt-8">
                      <NavItems />
                      {user ? (
                        <div className="border-t pt-4">
                          <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5" />
                            <span className="font-medium">{user.name}</span>
                          </div>
                          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start">
                            <LogOut className="w-4 h-4 mr-2" />
                            {t('nav.logout')}
                          </Button>
                        </div>
                      ) : (
                        <Link to="/login">
                          <Button className="w-full bg-green-500 hover:bg-green-600">
                            {t('nav.login')}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <nav className="flex items-center gap-6">
                  <NavItems />
                </nav>
                
                <LanguageSwitcher />
                
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    </div>
                    <Button onClick={handleLogout} variant="ghost" size="sm">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button className="bg-green-500 hover:bg-green-600">
                      {t('nav.login')}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
