
import React from 'react';
import { LineOAAccount } from '../types';
import { AccountCard } from './AccountCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface AccountCarouselProps {
  accounts: LineOAAccount[];
  onAccountClick: (account: LineOAAccount) => void;
  onFavorite?: (accountId: string) => void;
  favorites?: string[];
  title?: string;
  onReview?: (accountId: string) => void;
  showReviewButton?: boolean;
}

export function AccountCarousel({ 
  accounts, 
  onAccountClick, 
  onFavorite, 
  favorites = [], 
  title,
  onReview,
  showReviewButton = false
}: AccountCarouselProps) {
  if (accounts.length === 0) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {title && <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {accounts.map((account) => (
            <CarouselItem key={account.id} className="pl-2 sm:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3">
              <AccountCard
                account={account}
                onClick={() => onAccountClick(account)}
                onFavorite={onFavorite ? () => onFavorite(account.id) : undefined}
                isFavorited={favorites.includes(account.id)}
                onReview={onReview ? () => onReview(account.id) : undefined}
                showReviewButton={showReviewButton}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="-left-6 lg:-left-12" />
          <CarouselNext className="-right-6 lg:-right-12" />
        </div>
      </Carousel>
    </div>
  );
}
