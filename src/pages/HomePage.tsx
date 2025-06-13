
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useEffect } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Redirect admin and organizer users to their respective dashboards
    if (user) {
      if (user.type === 'admin') {
        navigate('/admin');
      } else if (user.type === 'organizer') {
        navigate('/organizer');
      }
    }
  }, [user, navigate]);

  // If user is admin or organizer, show loading or redirect message
  if (user && (user.type === 'admin' || user.type === 'organizer')) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            {t('redirect.title') || 'กำลังนำทางไปยังหน้าจัดการ...'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {t('redirect.description') || 'กรุณารอสักครู่'}
          </p>
        </div>
      </div>
    );
  }

  // Original HomePage content for general users
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('home.title') || 'ค้นหา LINE OA ที่ใช่สำหรับคุณ'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.subtitle') || 'แพลตฟอร์มที่รวบรวมบัญชี LINE Official Account คุณภาพสูง เพื่อให้คุณเชื่อมต่อกับผู้ให้บริการที่เหมาะสม'}
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <input
                type="text"
                placeholder={t('search.placeholder') || 'ค้นหาชื่อ, หมวดหมู่, หรือคำอธิบาย...'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t('categories.title') || 'หมวดหมู่ยอดนิยม'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['ร้านอาหาร', 'แฟชั่น', 'ความงาม', 'เทคโนโลยี', 'การศึกษา', 'สุขภาพ'].map((category) => (
              <div key={category} className="bg-white rounded-lg p-4 text-center shadow hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-green-600 text-xl">🏪</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Accounts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t('featured.title') || 'บัญชียอดนิยม'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">ตัวอย่างบัญชี {i}</h3>
                  <p className="text-gray-600 mb-4">คำอธิบายสั้นๆ เกี่ยวกับบัญชีนี้</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">⭐ 4.8</span>
                    <span className="text-sm text-gray-500">👥 10K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
