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
    'category.select': 'เลือกหมวดหมู่',
    'category.restaurant': 'ร้านอาหาร',
    'category.shopping': 'ช้อปปิ้ง',
    'category.entertainment': 'บันเทิง',
    'category.health': 'สุขภาพ',
    'category.education': 'การศึกษา',
    'category.travel': 'ท่องเที่ยว',
    'category.finance': 'การเงิน',
    'category.technology': 'เทคโนโลยี',
    
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
    'home.all.accounts.title': 'บัญชี LINE Official ทั้งหมด',
    'home.all.accounts.badge': 'ทั้งหมด',
    'home.categories.title': 'หมวดหมู่',
    'home.search.results': 'ผลการค้นหา',
    'home.category.results': 'บัญชีในหมวด',
    'home.results.found': 'พบ',
    'home.results.accounts': 'บัญชี',
    'home.no.results.title': 'ไม่พบผลการค้นหา',
    'home.no.results.description': 'ลองค้นหาด้วยคำอื่น',
    
    // Authentication
    'auth.register.title': 'สมัครสมาชิก',
    'auth.register.button': 'สมัครสมาชิก',
    'auth.register.success': 'สมัครสมาชิกสำเร็จ',
    'auth.register.success.description': 'ยินดีต้อนรับเข้าสู่ระบบ',
    'auth.name': 'ชื่อ',
    'auth.email': 'อีเมล',
    'auth.password': 'รหัสผ่าน',
    'auth.confirm.password': 'ยืนยันรหัสผ่าน',
    'auth.user.type': 'ประเภทผู้ใช้',
    'auth.user.type.user': 'ผู้ใช้ทั่วไป',
    'auth.user.type.organizer': 'ผู้จัดการ',
    'auth.cancel': 'ยกเลิก',
    'auth.error.password.mismatch': 'รหัสผ่านไม่ตรงกัน',
    'auth.error.password.mismatch.description': 'กรุณาตรวจสอบรหัสผ่านให้ตรงกัน',
    
    // Reviews
    'review.title': 'เขียนรีวิว',
    'review.rating': 'คะแนน',
    'review.comment': 'ความคิดเห็น',
    'review.comment.placeholder': 'แบ่งปันประสบการณ์ของคุณ...',
    'review.submit': 'ส่งรีวิว',
    'review.submit.success': 'ส่งรีวิวสำเร็จ',
    'review.submit.success.description': 'ขอบคุณสำหรับรีวิวของคุณ',
    'review.error.login.required': 'ต้องเข้าสู่ระบบ',
    'review.error.login.required.description': 'กรุณาเข้าสู่ระบบเพื่อเขียนรีวิว',
    'review.error.rating.required': 'ต้องให้คะแนน',
    'review.error.rating.required.description': 'กรุณาให้คะแนนก่อนส่งรีวิว',

    // Manager
    'manager.title': 'แดชบอร์ดผู้จัดการ',
    'manager.description': 'การจัดการบัญชี LINE OA',
    'manager.export.excel': 'ส่งออกข้อมูล Excel',
    'manager.submit.application': 'ส่งใบสมัครลงทะเบียน LINE OA',
    'manager.total.views': 'การดูทั้งหมด',
    'manager.friend.adds': 'การเพิ่มเพื่อน',
    'manager.total.followers': 'ผู้ติดตามทั้งหมด',
    'manager.average.rating': 'คะแนนเฉลี่ย',
    'manager.analytics': 'การวิเคราะห์แนวโน้ม',
    'manager.account.performance': 'ประสิทธิภาพแต่ละบัญชี',
    'manager.my.accounts': 'บัญชีที่จัดการ',
    'manager.promotion.packages': 'แพ็คเกจโปรโมชั่น',
    'manager.transaction.history': 'ประวัติการทำธุรกรรม',
    'manager.views': 'การดู',
    'manager.rating': 'คะแนน',
    'manager.promoting': 'กำลังโปรโมท',
    'manager.purchase': 'ซื้อ',
    'manager.popular': 'ยอดนิยม',
    'manager.completed': 'เสร็จสิ้น',
    'manager.pending': 'รอดำเนินการ',
    'manager.failed': 'ล้มเหลว',
    'manager.export.success': 'ส่งออกข้อมูลสำเร็จ',
    
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
    'admin.approved.list': 'รายการบัญชีที่อนุมัติ',
    'admin.transaction.list': 'รายการธุรกรรม',
    'admin.pending.accounts': 'บัญชีรออนุมัติ',
    'admin.transaction.id': 'รหัสธุรกรรม',
    'admin.package': 'แพ็คเกจ',
    'admin.organizer.id': 'รหัสผู้จัดการ',
    'admin.date': 'วันที่',
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
    'category.select': 'Select Category',
    'category.restaurant': 'Restaurant',
    'category.shopping': 'Shopping',
    'category.entertainment': 'Entertainment',
    'category.health': 'Health',
    'category.education': 'Education',
    'category.travel': 'Travel',
    'category.finance': 'Finance',
    'category.technology': 'Technology',
    
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
    'home.all.accounts.title': 'All LINE Official Accounts',
    'home.all.accounts.badge': 'All',
    'home.categories.title': 'Categories',
    'home.search.results': 'Search Results',
    'home.category.results': 'Accounts in Category',
    'home.results.found': 'Found',
    'home.results.accounts': 'accounts',
    'home.no.results.title': 'No Results Found',
    'home.no.results.description': 'Try searching with different keywords',
    
    // Authentication
    'auth.register.title': 'Sign Up',
    'auth.register.button': 'Sign Up',
    'auth.register.success': 'Registration Successful',
    'auth.register.success.description': 'Welcome to the system',
    'auth.name': 'Name',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm.password': 'Confirm Password',
    'auth.user.type': 'User Type',
    'auth.user.type.user': 'General User',
    'auth.user.type.organizer': 'Organizer',
    'auth.cancel': 'Cancel',
    'auth.error.password.mismatch': 'Passwords do not match',
    'auth.error.password.mismatch.description': 'Please check that passwords match',
    
    // Reviews
    'review.title': 'Write Review',
    'review.rating': 'Rating',
    'review.comment': 'Comment',
    'review.comment.placeholder': 'Share your experience...',
    'review.submit': 'Submit Review',
    'review.submit.success': 'Review submitted successfully',
    'review.submit.success.description': 'Thank you for your review',
    'review.error.login.required': 'Login required',
    'review.error.login.required.description': 'Please login to write a review',
    'review.error.rating.required': 'Rating required',
    'review.error.rating.required.description': 'Please provide a rating before submitting',

    // Manager
    'manager.title': 'Manager Dashboard',
    'manager.description': 'LINE OA Account Management',
    'manager.export.excel': 'Export Excel Data',
    'manager.submit.application': 'Submit LINE OA Registration',
    'manager.total.views': 'Total Views',
    'manager.friend.adds': 'Friend Adds',
    'manager.total.followers': 'Total Followers',
    'manager.average.rating': 'Average Rating',
    'manager.analytics': 'Analytics Trends',
    'manager.account.performance': 'Account Performance',
    'manager.my.accounts': 'Managed Accounts',
    'manager.promotion.packages': 'Promotion Packages',
    'manager.transaction.history': 'Transaction History',
    'manager.views': 'Views',
    'manager.rating': 'Rating',
    'manager.promoting': 'Promoting',
    'manager.purchase': 'Purchase',
    'manager.popular': 'Popular',
    'manager.completed': 'Completed',
    'manager.pending': 'Pending',
    'manager.failed': 'Failed',
    'manager.export.success': 'Data exported successfully',
    
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
    'admin.approved.list': 'Approved Accounts List',
    'admin.transaction.list': 'Transaction History',
    'admin.pending.accounts': 'Pending Accounts',
    'admin.transaction.id': 'Transaction ID',
    'admin.package': 'Package',
    'admin.organizer.id': 'Organizer ID',
    'admin.date': 'Date',
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
    'category.select': 'カテゴリを選択',
    'category.restaurant': 'レストラン',
    'category.shopping': 'ショッピング',
    'category.entertainment': 'エンターテイメント',
    'category.health': 'ヘルス',
    'category.education': '教育',
    'category.travel': '旅行',
    'category.finance': '金融',
    'category.technology': 'テクノロジー',
    
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
    'home.all.accounts.title': 'すべてのLINE公式アカウント',
    'home.all.accounts.badge': 'すべて',
    'home.categories.title': 'カテゴリ',
    'home.search.results': '検索結果',
    'home.category.results': 'カテゴリ内のアカウント',
    'home.results.found': '見つかりました',
    'home.results.accounts': 'アカウント',
    'home.no.results.title': '検索結果が見つかりません',
    'home.no.results.description': '他のキーワードで検索してみてください',
    
    // Authentication
    'auth.register.title': 'ユーザー登録',
    'auth.register.button': '登録する',
    'auth.register.success': '登録が完了しました',
    'auth.register.success.description': 'システムへようこそ',
    'auth.name': '名前',
    'auth.email': 'メールアドレス',
    'auth.password': 'パスワード',
    'auth.confirm.password': 'パスワード確認',
    'auth.user.type': 'ユーザータイプ',
    'auth.user.type.user': '一般ユーザー',
    'auth.user.type.organizer': 'オーガナイザー',
    'auth.cancel': 'キャンセル',
    'auth.error.password.mismatch': 'パスワードが一致しません',
    'auth.error.password.mismatch.description': 'パスワードが一致していることを確認してください',
    
    // Reviews
    'review.title': 'レビューを書く',
    'review.rating': '評価',
    'review.comment': 'コメント',
    'review.comment.placeholder': 'あなたの体験をシェアしてください...',
    'review.submit': 'レビューを送信',
    'review.submit.success': 'レビューを送信しました',
    'review.submit.success.description': 'レビューありがとうございます',
    'review.error.login.required': 'ログインが必要です',
    'review.error.login.required.description': 'レビューを書くにはログインしてください',
    'review.error.rating.required': '評価が必要です',
    'review.error.rating.required.description': '送信前に評価を入力してください',

    // Manager
    'manager.title': 'オーガナイザーダッシュボード',
    'manager.description': 'LINE OAアカウント管理',
    'manager.export.excel': 'Excelデータエクスポート',
    'manager.submit.application': 'LINE OA登録申請を提出',
    'manager.total.views': '総閲覧数',
    'manager.friend.adds': '友だち追加数',
    'manager.total.followers': '総フォロワー数',
    'manager.average.rating': '平均評価',
    'manager.analytics': 'アクセス推移',
    'manager.account.performance': 'アカウント別パフォーマンス',
    'manager.my.accounts': '管理中のアカウント',
    'manager.promotion.packages': 'プロモーションパッケージ',
    'manager.transaction.history': '取引履歴',
    'manager.views': '閲覧数',
    'manager.rating': '評価',
    'manager.promoting': 'プロモーション中',
    'manager.purchase': '購入する',
    'manager.popular': '人気',
    'manager.completed': '完了',
    'manager.pending': '処理中',
    'manager.failed': '失敗',
    'manager.export.success': 'データのエクスポートが完了しました',
    
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
    'admin.approved.list': '承認済みアカウント一覧',
    'admin.transaction.list': '取引履歴・支払い確認',
    'admin.pending.accounts': '承認待ちアカウント',
    'admin.transaction.id': '取引ID',
    'admin.package': 'パッケージ',
    'admin.organizer.id': 'オーガナイザーID',
    'admin.date': '日付',
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
