
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { mockAccounts } from '../data/mockData';
import { AccountCard } from '../components/AccountCard';
import { LineOAAccount } from '../types';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FavoritesPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>(['1', '3', '5']); // Mock favorites

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

  const favoriteAccounts = mockAccounts.filter(account => 
    favorites.includes(account.id) && account.verificationStatus === 'approved'
  );

  const handleAccountClick = (account: LineOAAccount) => {
    navigate(`/account/${account.id}`);
  };

  const handleFavorite = (accountId: string) => {
    setFavorites(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('favorites.title')}</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            {t('favorites.description')} ({favoriteAccounts.length} {t('favorites.accounts')})
          </p>
        </div>

        {favoriteAccounts.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {t('favorites.empty.title')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {t('favorites.empty.description')}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
            >
              {t('favorites.browse')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {favoriteAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onClick={() => handleAccountClick(account)}
                onFavorite={() => handleFavorite(account.id)}
                isFavorited={favorites.includes(account.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
