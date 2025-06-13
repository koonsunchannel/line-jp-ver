
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Home, User, Settings, LogOut, Menu, MessageCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ChatWindow } from './ChatWindow';
import { ChatNotificationBadge } from './ChatNotificationBadge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Layout() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isChatOpen, setIsChatOpen] = useState(false);

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
        <>
          <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
            <Settings className="w-5 h-5" />
            <span>{t('nav.management')}</span>
          </Link>
          <Link to="/admin/chat" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors relative">
            <MessageCircle className="w-5 h-5" />
            <span>ระบบแชท</span>
            <ChatNotificationBadge />
          </Link>
          <Link to="/admin/verification" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
            <Shield className="w-5 h-5" />
            <span>{t('verification.admin.title') || 'ตรวจสอบการยืนยัน'}</span>
          </Link>
        </>
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
                          <Link to="/profile" className="flex items-center gap-2 mb-4 text-gray-700 hover:text-green-600 transition-colors">
                            <User className="w-5 h-5" />
                            <span className="font-medium">{user.name}</span>
                          </Link>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 relative">
                          <User className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{user.name}</span>
                          {user.type === 'admin' && <ChatNotificationBadge />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                            <User className="w-4 h-4" />
                            <span>{t('profile.title')}</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                          <LogOut className="w-4 h-4" />
                          <span>{t('nav.logout')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      {/* Chat Support Buttons */}
      {user && user.type !== 'admin' && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button 
            className={`rounded-full w-14 h-14 shadow-lg ${
              user.type === 'organizer' 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      <ChatWindow 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
