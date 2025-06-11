
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'th' | 'en' | 'jp';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  th: {
    // Header
    'site.title': 'ค้นหา OA',
    'nav.home': 'หน้าแรก',
    'nav.management': 'หน้าจัดการ',
    'nav.login': 'เข้าสู่ระบบ',
    'nav.logout': 'ออกจากระบบ',
    
    // Search
    'search.placeholder': 'ค้นหาบัญชี LINE Official...',
    'search.button': 'ค้นหา',
    'search.location.success': 'ได้รับข้อมูลตำแหน่งแล้ว',
    'search.location.searching': 'กำลังค้นหาบัญชี LINE Official ใกล้เคียง...',
    'search.location.error': 'ไม่สามารถหาตำแหน่งได้',
    'search.location.browser.error': 'เบราว์เซอร์ไม่รองรับ',
    
    // Categories
    'category.all': 'ทั้งหมด',
    
    // Account Card
    'account.addFriend': 'เพิ่มเพื่อน',
    'account.promotion': 'โปรโมชั่น',
    
    // Home Page
    'home.hero.title': 'เครื่องมือค้นหา',
    'home.hero.subtitle': 'บัญชี LINE Official',
    'home.hero.description': 'ค้นหาบัญชี LINE Official ที่เหมาะสมกับคุณ',
    'home.promoted.title': 'โปรโมชั่น',
    'home.promoted.badge': 'แนะนำ',
    'home.popular.title': 'บัญชียอดนิยม',
    'home.popular.badge': 'ยอดนิยม',
    'home.categories.title': 'หมวดหมู่',
    'home.search.results': 'ผลการค้นหา',
    'home.category.results': 'บัญชีในหมวด',
    'home.results.found': 'พบ',
    'home.results.accounts': 'บัญชี',
    'home.no.results.title': 'ไม่พบผลการค้นหา',
    'home.no.results.description': 'ลองค้นหาด้วยคำอื่น',
    
    // Admin
    'admin.title': 'แดชบอร์ดผู้ดูแลระบบ',
    'admin.description': 'การจัดการและตรวจสอบระบบ',
    'admin.approved': 'บัญชีที่อนุมัติแล้ว',
    'admin.pending': 'บัญชีรออนุมัติ',
    'admin.revenue': 'รายได้รวม',
    'admin.followers': 'ผู้ติดตามรวม',
    'admin.approve': 'อนุมัติ',
    'admin.reject': 'ปฏิเสธ',
    'admin.approved.message': 'อนุมัติบัญชีแล้ว',
    'admin.rejected.message': 'ปฏิเสธบัญชีแล้ว',
    'admin.review.completed': 'การตรวจสอบบัญชีเสร็จสิ้น',
    'admin.no.pending': 'ไม่มีบัญชีรออนุมัติ',
    'admin.submit.application': 'ส่งใบสมัครลงทะเบียน LINE OA',
    
    // 404
    '404.title': 'ขออภัย! ไม่พบหน้าที่คุณต้องการ',
    '404.back': 'กลับสู่หน้าแรก'
  },
  en: {
    // Header
    'site.title': 'OA Search',
    'nav.home': 'Home',
    'nav.management': 'Management',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Search
    'search.placeholder': 'Search LINE Official Accounts...',
    'search.button': 'Search',
    'search.location.success': 'Location obtained',
    'search.location.searching': 'Searching for nearby LINE Official Accounts...',
    'search.location.error': 'Unable to get location',
    'search.location.browser.error': 'Browser not supported',
    
    // Categories
    'category.all': 'All',
    
    // Account Card
    'account.addFriend': 'Add Friend',
    'account.promotion': 'Promotion',
    
    // Home Page
    'home.hero.title': 'Search Tool for',
    'home.hero.subtitle': 'LINE Official Accounts',
    'home.hero.description': 'Find the LINE Official Account that suits you',
    'home.promoted.title': 'Promoted',
    'home.promoted.badge': 'Featured',
    'home.popular.title': 'Popular Accounts',
    'home.popular.badge': 'Popular',
    'home.categories.title': 'Categories',
    'home.search.results': 'Search Results',
    'home.category.results': 'Accounts in Category',
    'home.results.found': 'Found',
    'home.results.accounts': 'accounts',
    'home.no.results.title': 'No Results Found',
    'home.no.results.description': 'Try searching with different keywords',
    
    // Admin
    'admin.title': 'System Administrator Dashboard',
    'admin.description': 'System management and monitoring',
    'admin.approved': 'Approved Accounts',
    'admin.pending': 'Pending Accounts',
    'admin.revenue': 'Total Revenue',
    'admin.followers': 'Total Followers',
    'admin.approve': 'Approve',
    'admin.reject': 'Reject',
    'admin.approved.message': 'Account approved',
    'admin.rejected.message': 'Account rejected',
    'admin.review.completed': 'Account review completed',
    'admin.no.pending': 'No pending accounts',
    'admin.submit.application': 'Submit LINE OA Registration',
    
    // 404
    '404.title': 'Sorry! Page not found',
    '404.back': 'Back to Home'
  },
  jp: {
    // Header
    'site.title': 'OA検索',
    'nav.home': 'ホーム',
    'nav.management': '管理',
    'nav.login': 'ログイン',
    'nav.logout': 'ログアウト',
    
    // Search
    'search.placeholder': 'LINE公式アカウントを検索...',
    'search.button': '検索',
    'search.location.success': '位置情報を取得しました',
    'search.location.searching': '近くのLINE公式アカウントを検索中...',
    'search.location.error': '位置情報を取得できません',
    'search.location.browser.error': 'ブラウザがサポートされていません',
    
    // Categories
    'category.all': 'すべて',
    
    // Account Card
    'account.addFriend': '友だち追加',
    'account.promotion': 'プロモーション',
    
    // Home Page
    'home.hero.title': '検索ツール',
    'home.hero.subtitle': 'LINE公式アカウント',
    'home.hero.description': 'あなたに合ったLINE公式アカウントを見つけよう',
    'home.promoted.title': 'プロモーション',
    'home.promoted.badge': 'おすすめ',
    'home.popular.title': '人気アカウント',
    'home.popular.badge': '人気',
    'home.categories.title': 'カテゴリ',
    'home.search.results': '検索結果',
    'home.category.results': 'カテゴリ内のアカウント',
    'home.results.found': '見つかりました',
    'home.results.accounts': 'アカウント',
    'home.no.results.title': '検索結果が見つかりません',
    'home.no.results.description': '他のキーワードで検索してみてください',
    
    // Admin
    'admin.title': 'グローバル管理者ダッシュボード',
    'admin.description': 'システム全体の管理と監視',
    'admin.approved': '承認済みアカウント',
    'admin.pending': '保留中アカウント',
    'admin.revenue': '総売上',
    'admin.followers': '総フォロワー数',
    'admin.approve': '承認',
    'admin.reject': '却下',
    'admin.approved.message': 'アカウントを承認しました',
    'admin.rejected.message': 'アカウントを却下しました',
    'admin.review.completed': 'アカウントの審査が完了しました',
    'admin.no.pending': '承認待ちのアカウントはありません',
    'admin.submit.application': 'LINE OA登録申請を提出',
    
    // 404
    '404.title': '申し訳ございません！ページが見つかりません',
    '404.back': 'ホームに戻る'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('th');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
