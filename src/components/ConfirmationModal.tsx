
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText,
  cancelText,
  variant = 'default'
}: ConfirmationModalProps) {
  const { t } = useLanguage();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-6 h-6 ${variant === 'destructive' ? 'text-red-500' : 'text-yellow-500'}`} />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {cancelText || t('common.cancel') || 'ยกเลิก'}
          </Button>
          <Button 
            type="button" 
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            className={variant === 'destructive' ? '' : 'bg-orange-500 hover:bg-orange-600'}
          >
            {confirmText || t('common.confirm') || 'ยืนยัน'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
