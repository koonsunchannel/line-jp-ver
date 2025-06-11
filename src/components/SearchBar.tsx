
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationSearch: () => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, onLocationSearch, placeholder }: SearchBarProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex-1 flex items-center px-6 py-4">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || t('search.placeholder')}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onLocationSearch}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full p-2"
          >
            <MapPin className="w-5 h-5" />
          </Button>
          <Button 
            type="submit" 
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2"
          >
            {t('search.button')}
          </Button>
        </div>
      </form>
    </div>
  );
}
