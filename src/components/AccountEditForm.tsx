
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../context/LanguageContext';
import { LineOAAccount } from '../types';
import { categories } from '../data/updatedCategories';

interface AccountEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  account: LineOAAccount | null;
  onSave: (account: LineOAAccount) => void;
}

export function AccountEditForm({ isOpen, onClose, account, onSave }: AccountEditFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Partial<LineOAAccount>>(account || {});

  React.useEffect(() => {
    if (account) {
      setFormData(account);
    }
  }, [account]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (account && formData) {
      onSave({ ...account, ...formData } as LineOAAccount);
      onClose();
    }
  };

  const handleInputChange = (field: keyof LineOAAccount, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!account) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('account.edit.title') || 'แก้ไขข้อมูลบัญชี'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">{t('account.edit.name') || 'ชื่อบัญชี'} *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="lineId">{t('account.edit.lineId') || 'LINE ID'} *</Label>
              <Input
                id="lineId"
                value={formData.lineId || ''}
                onChange={(e) => handleInputChange('lineId', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">{t('account.edit.description') || 'คำอธิบาย'}</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">{t('account.edit.category') || 'หมวดหมู่'} *</Label>
              <Select 
                value={formData.category || ''} 
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('category.select') || 'เลือกหมวดหมู่'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image">{t('account.edit.image') || 'รูปภาพ URL'}</Label>
              <Input
                id="image"
                value={formData.image || ''}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="qrCode">{t('account.edit.qrCode') || 'QR Code URL'}</Label>
              <Input
                id="qrCode"
                value={formData.qrCode || ''}
                onChange={(e) => handleInputChange('qrCode', e.target.value)}
                placeholder="https://example.com/qr.jpg"
              />
            </div>

            <div>
              <Label htmlFor="followers">{t('account.edit.followers') || 'จำนวนผู้ติดตาม'}</Label>
              <Input
                id="followers"
                type="number"
                value={formData.followers || 0}
                onChange={(e) => handleInputChange('followers', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>

          {/* Location */}
          {formData.location && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="address">{t('account.edit.address') || 'ที่อยู่'}</Label>
                <Input
                  id="address"
                  value={formData.location.address || ''}
                  onChange={(e) => handleInputChange('location', { 
                    ...formData.location, 
                    address: e.target.value 
                  })}
                />
              </div>
              <div>
                <Label htmlFor="lat">{t('account.edit.latitude') || 'ละติจูด'}</Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  value={formData.location.lat || 0}
                  onChange={(e) => handleInputChange('location', { 
                    ...formData.location, 
                    lat: parseFloat(e.target.value) || 0 
                  })}
                />
              </div>
              <div>
                <Label htmlFor="lng">{t('account.edit.longitude') || 'ลองติจูด'}</Label>
                <Input
                  id="lng"
                  type="number"
                  step="any"
                  value={formData.location.lng || 0}
                  onChange={(e) => handleInputChange('location', { 
                    ...formData.location, 
                    lng: parseFloat(e.target.value) || 0 
                  })}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <Label htmlFor="tags">{t('account.edit.tags') || 'แท็ก (คั่นด้วยเครื่องหมายจุลภาค)'}</Label>
            <Input
              id="tags"
              value={(formData.tags || []).join(', ')}
              onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
              placeholder="แท็ก1, แท็ก2, แท็ก3"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.cancel') || 'ยกเลิก'}
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              {t('common.save') || 'บันทึก'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
