
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { AccountCard } from '../components/AccountCard';
import { mockAccounts, categories } from '../data/mockData';
import { LineOAAccount } from '../types';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

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
            title: "ได้รับข้อมูลตำแหน่งแล้ว",
            description: "กำลังค้นหาบัญชี LINE Official ใกล้เคียง...",
          });
          // Here you would filter by location
        },
        (error) => {
          toast({
            title: "ไม่สามารถหาตำแหน่งได้",
            description: "ไม่สามารถหาข้อมูลตำแหน่งได้",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "เบราว์เซอร์ไม่รองรับ",
        description: "เบราว์เซอร์ของคุณไม่รองรับการหาตำแหน่ง",
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
            เครื่องมือค้นหา
            <br />
            <span className="text-yellow-300">บัญชี LINE Official</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            ค้นหาบัญชี LINE Official ที่เหมาะสมกับคุณ
          </p>
          <SearchBar onSearch={handleSearch} onLocationSearch={handleLocationSearch} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {!searchQuery && !selectedCategory && (
          <>
            {/* Promoted Accounts */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900">โปรโมชั่น</h2>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  แนะนำ
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotedAccounts.slice(0, 6).map((account) => (
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

            {/* Popular Accounts */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-6 h-6 text-red-500" />
                <h2 className="text-3xl font-bold text-gray-900">บัญชียอดนิยม</h2>
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  ยอดนิยม
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularAccounts.map((account) => (
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

            {/* Categories */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-blue-500" />
                <h2 className="text-3xl font-bold text-gray-900">หมวดหมู่</h2>
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
                {searchQuery ? `ผลการค้นหา "${searchQuery}"` : 
                 selectedCategory ? `บัญชีในหมวด ${getCategoryInfo(selectedCategory)?.name}` : 
                 'บัญชีทั้งหมด'}
              </h2>
              <p className="text-gray-600">พบ {filteredAccounts.length} บัญชี</p>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบผลการค้นหา</h3>
                <p className="text-gray-600">ลองค้นหาด้วยคำอื่น</p>
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
