
import React from 'react';
import { Star, Heart, MapPin, MessageCircle, Share } from 'lucide-react';
import { LineOAAccount } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../context/LanguageContext';

interface AccountCardProps {
  account: LineOAAccount;
  onClick: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
  onReview?: () => void;
  showReviewButton?: boolean;
  onShare?: () => void;
}

export function AccountCard({ 
  account, 
  onClick, 
  onFavorite, 
  isFavorited, 
  onReview,
  showReviewButton = false,
  onShare
}: AccountCardProps) {
  const { t } = useLanguage();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.();
  };

  const handleReviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReview?.();
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.();
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group hover:scale-105">
      <div className="relative" onClick={onClick}>
        <img 
          src={account.image} 
          alt={account.name}
          className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {account.isPromoted && (
          <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-orange-500 text-white text-xs">
            {t('account.promotion')}
          </Badge>
        )}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1">
          {onShare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareClick}
              className="bg-white/80 hover:bg-white/90 rounded-full p-1.5 sm:p-2"
            >
              <Share className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </Button>
          )}
          {onFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              className="bg-white/80 hover:bg-white/90 rounded-full p-1.5 sm:p-2"
            >
              <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-3 sm:p-4 md:p-6">
        <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900 mb-2 line-clamp-1">{account.name}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{account.description}</p>
        
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1" />
            <span className="font-medium">{account.rating}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-red-500" />
            <span>{account.followers.toLocaleString()}</span>
          </div>
        </div>

        {account.location && (
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{account.location.address}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {account.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <Button 
            onClick={onClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs sm:text-sm"
          >
            {t('account.addFriend')}
          </Button>
          
          {showReviewButton && onReview && (
            <Button 
              onClick={handleReviewClick}
              variant="outline"
              size="sm"
              className="w-full text-xs sm:text-sm"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              {t('review.title')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
