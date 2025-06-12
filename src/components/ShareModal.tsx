
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { LineOAAccount } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: LineOAAccount;
}

export function ShareModal({ isOpen, onClose, account }: ShareModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const shareUrl = `${window.location.origin}/account/${account.id}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: t('share.copied.title'),
        description: t('share.copied.description'),
      });
    } catch (err) {
      console.error('Failed to copy URL:', err);
      toast({
        title: t('share.error.title'),
        description: t('share.error.description'),
        variant: "destructive",
      });
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: account.name,
          text: account.description,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyUrl();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">{t('share.title')}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img 
                src={account.image} 
                alt={account.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{account.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{account.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('share.url')}</label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1 text-sm"
                />
                <Button onClick={handleCopyUrl} size="sm" variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleWebShare}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t('share.button')}
              </Button>
              <Button onClick={onClose} variant="outline" className="flex-1">
                {t('auth.cancel')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
