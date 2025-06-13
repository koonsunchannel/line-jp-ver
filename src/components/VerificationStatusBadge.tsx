
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VerificationStatusBadgeProps {
  isVerified: boolean;
}

export function VerificationStatusBadge({ isVerified }: VerificationStatusBadgeProps) {
  const { t } = useLanguage();

  if (!isVerified) return null;

  return (
    <Badge className="bg-blue-500 hover:bg-blue-600 text-white ml-2">
      <CheckCircle className="w-3 h-3 mr-1" />
      {t('verification.verified') || 'ยืนยันแล้ว'}
    </Badge>
  );
}
