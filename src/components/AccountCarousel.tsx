
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
}

export function AccountCarousel({ 
  accounts, 
  onAccountClick, 
  onFavorite, 
  favorites = [], 
  title 
}: AccountCarouselProps) {
  if (accounts.length === 0) return null;

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {accounts.map((account) => (
            <CarouselItem key={account.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <AccountCard
                account={account}
                onClick={() => onAccountClick(account)}
                onFavorite={onFavorite ? () => onFavorite(account.id) : undefined}
                isFavorited={favorites.includes(account.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </div>
  );
}
