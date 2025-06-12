
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RatingSectionProps {
  accountId: string;
  currentRating: number;
  onRatingSubmit: (rating: number) => void;
}

export function RatingSection({ accountId, currentRating, onRatingSubmit }: RatingSectionProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRatingClick = (rating: number) => {
    if (!user) {
      toast({
        title: t('rating.login.required'),
        description: t('rating.login.required.description'),
        variant: "destructive",
      });
      return;
    }

    setUserRating(rating);
    setHasRated(true);
    onRatingSubmit(rating);
    
    toast({
      title: t('rating.success.title'),
      description: t('rating.success.description'),
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{t('rating.title')}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{currentRating.toFixed(1)}</span>
        </div>
      </div>
      
      {user ? (
        <div className="space-y-2">
          <p className="text-xs text-gray-600">{t('rating.your.rating')}</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={hasRated}
                className={`p-1 ${hasRated ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-110'} transition-transform`}
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= (hoveredRating || userRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {hasRated && (
            <p className="text-xs text-green-600">{t('rating.submitted')}</p>
          )}
        </div>
      ) : (
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            {t('rating.login.required.message')}
          </p>
        </div>
      )}
    </div>
  );
}
