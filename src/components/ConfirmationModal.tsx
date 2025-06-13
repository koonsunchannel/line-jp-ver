
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'default' | 'destructive';
}

export function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  variant = 'default'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className={`w-12 h-12 ${variant === 'destructive' ? 'text-red-500' : 'text-orange-500'}`} />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-center">{description}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onConfirm}
              variant={variant === 'destructive' ? 'destructive' : 'default'}
              className="flex-1"
            >
              {confirmText}
            </Button>
            <Button onClick={onCancel} variant="outline" className="flex-1">
              {cancelText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
