
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AccountRegistrationLimitProps {
  currentAccountCount: number;
  maxAccounts?: number;
}

export function AccountRegistrationLimit({ 
  currentAccountCount, 
  maxAccounts = 5 
}: AccountRegistrationLimitProps) {
  const { t } = useLanguage();
  
  const isAtLimit = currentAccountCount >= maxAccounts;
  const isNearLimit = currentAccountCount >= maxAccounts - 1;

  if (currentAccountCount === 0) return null;

  return (
    <Alert className={`mb-4 ${isAtLimit ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-orange-200 bg-orange-50' : 'border-blue-200 bg-blue-50'}`}>
      {isAtLimit && <AlertTriangle className="h-4 w-4 text-red-600" />}
      <AlertDescription className={`text-sm ${isAtLimit ? 'text-red-700' : isNearLimit ? 'text-orange-700' : 'text-blue-700'}`}>
        {isAtLimit 
          ? `${t('manager.limit.reached')} (${currentAccountCount}/${maxAccounts})`
          : `${t('manager.limit.info')} (${currentAccountCount}/${maxAccounts})`
        }
      </AlertDescription>
    </Alert>
  );
}
