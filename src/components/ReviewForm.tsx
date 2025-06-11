
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface ReviewFormProps {
  accountId: string;
  accountName: string;
  onSubmit: (review: any) => void;
  onClose: () => void;
}

export function ReviewForm({ accountId, accountName, onSubmit, onClose }: ReviewFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: t('review.error.login.required'),
        description: t('review.error.login.required.description'),
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: t('review.error.rating.required'),
        description: t('review.error.rating.required.description'),
        variant: "destructive",
      });
      return;
    }

    const review = {
      id: Date.now().toString(),
      accountId,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    onSubmit(review);
    
    toast({
      title: t('review.submit.success'),
      description: t('review.submit.success.description'),
    });
    
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-lg">{t('review.title')} - {accountName}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('review.rating')}</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('review.comment')}</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('review.comment.placeholder')}
                rows={4}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                {t('review.submit')}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="w-full">
                {t('auth.cancel')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
