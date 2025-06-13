
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, X as XIcon, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { LineOAAccount } from '../types';
import { AccountEditForm } from './AccountEditForm';
import { ConfirmationModal } from './ConfirmationModal';

interface PromotionManagerProps {
  accounts: LineOAAccount[];
  onUpdateAccount: (account: LineOAAccount) => void;
  onDeleteAccount: (accountId: string) => void;
  onCancelPromotion: (accountId: string) => void;
}

export function PromotionManager({ 
  accounts, 
  onUpdateAccount, 
  onDeleteAccount, 
  onCancelPromotion 
}: PromotionManagerProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [editingAccount, setEditingAccount] = useState<LineOAAccount | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'cancelPromotion' | 'deleteAccount';
    accountId: string;
    accountName: string;
  }>({
    isOpen: false,
    type: 'cancelPromotion',
    accountId: '',
    accountName: ''
  });

  const handleCancelPromotion = (account: LineOAAccount) => {
    setConfirmModal({
      isOpen: true,
      type: 'cancelPromotion',
      accountId: account.id,
      accountName: account.name
    });
  };

  const handleDeleteAccount = (account: LineOAAccount) => {
    if (account.isPromoted) {
      toast({
        title: t('account.delete.error.promoted'),
        description: t('account.delete.error.promoted.description'),
        variant: "destructive",
      });
      return;
    }

    setConfirmModal({
      isOpen: true,
      type: 'deleteAccount',
      accountId: account.id,
      accountName: account.name
    });
  };

  const confirmAction = () => {
    if (confirmModal.type === 'cancelPromotion') {
      onCancelPromotion(confirmModal.accountId);
      toast({
        title: t('promotion.cancel.success'),
        description: t('promotion.cancel.success.description'),
      });
    } else if (confirmModal.type === 'deleteAccount') {
      onDeleteAccount(confirmModal.accountId);
      toast({
        title: t('account.delete.success'),
        description: t('account.delete.success.description'),
      });
    }
    
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  const getConfirmationTexts = () => {
    if (confirmModal.type === 'cancelPromotion') {
      return {
        title: t('promotion.cancel.confirm.title'),
        description: t('promotion.cancel.confirm.description', { name: confirmModal.accountName }),
        confirmText: t('promotion.cancel.confirm.button'),
        cancelText: t('auth.cancel')
      };
    } else {
      return {
        title: t('account.delete.confirm.title'),
        description: t('account.delete.confirm.description', { name: confirmModal.accountName }),
        confirmText: t('account.delete.confirm.button'),
        cancelText: t('auth.cancel')
      };
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <Card key={account.id} className="relative">
            {account.isPromoted && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-orange-100 text-orange-800">
                  <Crown className="w-3 h-3 mr-1" />
                  {t('account.promoted')}
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg pr-20">{account.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={account.image} 
                  alt={account.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 line-clamp-2">{account.description}</p>
                  <p className="text-xs text-gray-500 mt-1">LINE ID: {account.lineId}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {account.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {account.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{account.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => setEditingAccount(account)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {t('account.edit.button')}
                </Button>
                
                {account.isPromoted ? (
                  <Button
                    onClick={() => handleCancelPromotion(account)}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-orange-600 border-orange-300 hover:bg-orange-50"
                  >
                    <XIcon className="w-4 h-4 mr-2" />
                    {t('promotion.cancel.button')}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleDeleteAccount(account)}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t('account.delete.button')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Account Modal */}
      {editingAccount && (
        <AccountEditForm
          account={editingAccount}
          onSave={onUpdateAccount}
          onDelete={onDeleteAccount}
          onClose={() => setEditingAccount(null)}
          isPromoted={editingAccount.isPromoted}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        {...getConfirmationTexts()}
        onConfirm={confirmAction}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        variant={confirmModal.type === 'deleteAccount' ? 'destructive' : 'default'}
      />
    </div>
  );
}
