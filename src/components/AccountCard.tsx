
import React from 'react';
import { Star, Users, MapPin, Heart } from 'lucide-react';
import { LineOAAccount } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../context/LanguageContext';

interface AccountCardProps {
  account: LineOAAccount;
  onClick: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export function AccountCard({ account, onClick, onFavorite, isFavorited }: AccountCardProps) {
  const { t } = useLanguage();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.();
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group hover:scale-105"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={account.image} 
          alt={account.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {account.isPromoted && (
          <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
            {t('account.promotion')}
          </Badge>
        )}
        {onFavorite && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white/80 hover:bg-white/90 rounded-full p-2"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{account.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{account.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-medium">{account.rating}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span>{account.followers.toLocaleString()}</span>
          </div>
        </div>

        {account.location && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{account.location.address}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {account.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg">
          {t('account.addFriend')}
        </Button>
      </div>
    </div>
  );
}
