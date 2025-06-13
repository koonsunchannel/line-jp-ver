
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useVerification } from '../context/VerificationContext';
import { useToast } from '@/hooks/use-toast';

interface LineOAVerificationFormProps {
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
}

export function LineOAVerificationForm({ isOpen, onClose, accountName }: LineOAVerificationFormProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { submitVerification } = useVerification();
  const { toast } = useToast();
  const [lineOAId, setLineOAId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !lineOAId.trim()) return;

    submitVerification(user.id, user.name, lineOAId.trim(), accountName);
    
    toast({
      title: t('verification.submitted.title') || 'ส่งคำขอยืนยันแล้ว',
      description: t('verification.submitted.description') || 'คำขอยืนยันตัวตนของคุณได้ถูกส่งไปยังผู้ดูแลระบบเรียบร้อยแล้ว',
    });

    setLineOAId('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            {t('verification.title') || 'ยืนยันตัวตน LINE OA'}
          </DialogTitle>
        </DialogHeader>
        
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            {t('verification.warning') || 'หากไม่ทำการยืนยันตัวตนของบัญชี LINE OA ภายใน 14 วัน ทางผู้ดูแลระบบสามารถลบบัญชี OA นี้ออกจากระบบได้'}
          </AlertDescription>
        </Alert>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="accountName">{t('verification.account.name') || 'ชื่อบัญชี'}</Label>
            <Input
              id="accountName"
              value={accountName}
              disabled
              className="bg-gray-100"
            />
          </div>

          <div>
            <Label htmlFor="lineOAId">{t('verification.line.oa.id') || 'LINE OA ID'} *</Label>
            <Input
              id="lineOAId"
              value={lineOAId}
              onChange={(e) => setLineOAId(e.target.value)}
              placeholder="@example_oa"
              required
            />
          </div>

          <div className="text-sm text-gray-600">
            <p>{t('verification.instructions') || 'กรุณากรอก LINE OA ID ที่ต้องการยืนยันตัวตน ผู้ดูแลระบบจะทำการตรวจสอบและอนุมัติภายใน 24-48 ชั่วโมง'}</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.cancel') || 'ยกเลิก'}
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              {t('verification.submit') || 'ส่งคำขอ'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
