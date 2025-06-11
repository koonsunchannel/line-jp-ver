
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

    return filtered;
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
          // Here you would filter by location
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

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.hero.title')}
            <br />
            <span className="text-yellow-300">{t('home.hero.subtitle')}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            {t('home.hero.description')}
          </p>
          <SearchBar onSearch={handleSearch} onLocationSearch={handleLocationSearch} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {!searchQuery && !selectedCategory && (
          <>
            {/* Promoted Accounts Carousel */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900">{t('home.promoted.title')}</h2>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
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
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-6 h-6 text-red-500" />
                <h2 className="text-3xl font-bold text-gray-900">{t('home.popular.title')}</h2>
                <Badge variant="secondary" className="bg-red-100 text-red-700">
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

            {/* Categories */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-blue-500" />
                <h2 className="text-3xl font-bold text-gray-900">{t('home.categories.title')}</h2>
              </div>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </section>
          </>
        )}

        {/* Search Results or Category Results */}
        {(searchQuery || selectedCategory) && (
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {searchQuery ? `${t('home.search.results')} "${searchQuery}"` : 
                 selectedCategory ? `${t('home.category.results')} ${getCategoryInfo(selectedCategory)?.name}` : 
                 'บัญชีทั้งหมด'}
              </h2>
              <p className="text-gray-600">{t('home.results.found')} {filteredAccounts.length} {t('home.results.accounts')}</p>
            </div>
            
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {filteredAccounts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('home.no.results.title')}</h3>
                <p className="text-gray-600">{t('home.no.results.description')}</p>
              </div>
            )}
          </section>
        )}

        {/* Default Category Display */}
        {!searchQuery && !selectedCategory && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedAccounts.slice(0, 9).map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onClick={() => handleAccountClick(account)}
                  onFavorite={() => handleFavorite(account.id)}
                  isFavorited={favorites.includes(account.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
