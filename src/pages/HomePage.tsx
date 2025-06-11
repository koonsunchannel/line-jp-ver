
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { AccountCard } from '../components/AccountCard';
import { AccountCarousel } from '../components/AccountCarousel';
import { mockAccounts, categories } from '../data/mockData';
import { LineOAAccount } from '../types';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const approvedAccounts = mockAccounts.filter(account => account.verificationStatus === 'approved');
  
  const filteredAccounts = useMemo(() => {
    let filtered = approvedAccounts;

    if (searchQuery) {
      filtered = filtered.filter(account =>
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(account => account.category === selectedCategory);
    }

    // Sort promoted accounts first within any category/filter
    return filtered.sort((a, b) => {
      if (a.isPromoted && !b.isPromoted) return -1;
      if (!a.isPromoted && b.isPromoted) return 1;
      return 0;
    });
  }, [searchQuery, selectedCategory, approvedAccounts]);

  const promotedAccounts = approvedAccounts.filter(account => account.isPromoted);
  const popularAccounts = approvedAccounts
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 6);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: t('search.location.success'),
            description: t('search.location.searching'),
          });
        },
        (error) => {
          toast({
            title: t('search.location.error'),
            description: t('search.location.error'),
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: t('search.location.browser.error'),
        description: t('search.location.browser.error'),
        variant: "destructive",
      });
    }
  };

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

  const getCategoryName = (categoryId: string) => {
    return t(`category.${categoryId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced mobile responsiveness */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            {t('home.hero.title')}
            <br />
            <span className="text-yellow-300">{t('home.hero.subtitle')}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-green-100 px-4">
            {t('home.hero.description')}
          </p>
          <div className="w-full max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} onLocationSearch={handleLocationSearch} />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Category Filter - Enhanced mobile layout */}
        <div className="mb-6 sm:mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {!searchQuery && !selectedCategory && (
          <>
            {/* Promoted Accounts Carousel */}
            <section className="mb-8 sm:mb-12 md:mb-16">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t('home.promoted.title')}</h2>
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs sm:text-sm">
                  {t('home.promoted.badge')}
                </Badge>
              </div>
              <AccountCarousel
                accounts={promotedAccounts.slice(0, 6)}
                onAccountClick={handleAccountClick}
                onFavorite={handleFavorite}
                favorites={favorites}
              />
            </section>

            {/* Popular Accounts Carousel */}
            <section className="mb-8 sm:mb-12 md:mb-16">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t('home.popular.title')}</h2>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs sm:text-sm">
                  {t('home.popular.badge')}
                </Badge>
              </div>
              <AccountCarousel
                accounts={popularAccounts}
                onAccountClick={handleAccountClick}
                onFavorite={handleFavorite}
                favorites={favorites}
              />
            </section>

            {/* All LINE OA Accounts Carousel */}
            <section className="mb-8 sm:mb-12 md:mb-16">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t('home.all.accounts.title')}</h2>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
                  {t('home.all.accounts.badge')}
                </Badge>
              </div>
              <AccountCarousel
                accounts={approvedAccounts}
                onAccountClick={handleAccountClick}
                onFavorite={handleFavorite}
                favorites={favorites}
              />
            </section>
          </>
        )}

        {/* Search Results or Category Results */}
        {(searchQuery || selectedCategory) && (
          <section>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {searchQuery ? `${t('home.search.results')} "${searchQuery}"` : 
                 selectedCategory ? `${t('home.category.results')} ${getCategoryName(selectedCategory)}` : 
                 t('home.all.accounts.title')}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {t('home.results.found')} {filteredAccounts.length} {t('home.results.accounts')}
              </p>
            </div>
            
            {/* Use carousel for category results, grid for search */}
            {selectedCategory && !searchQuery ? (
              <AccountCarousel
                accounts={filteredAccounts}
                onAccountClick={handleAccountClick}
                onFavorite={handleFavorite}
                favorites={favorites}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredAccounts.map((account) => (
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

            {filteredAccounts.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {t('home.no.results.title')}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{t('home.no.results.description')}</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
