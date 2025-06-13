
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Upload } from 'lucide-react';
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);

  React.useEffect(() => {
    if (account) {
      setFormData(account);
    }
  }, [account]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (account && formData) {
      // Handle image uploads here (in a real app, you'd upload to a server)
      const updatedAccount = { ...account, ...formData } as LineOAAccount;
      onSave(updatedAccount);
      onClose();
    }
  };

  const handleInputChange = (field: keyof LineOAAccount, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'qrCode') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'image') {
        setImageFile(file);
        // Create a preview URL
        const previewUrl = URL.createObjectURL(file);
        handleInputChange('image', previewUrl);
      } else {
        setQrCodeFile(file);
        const previewUrl = URL.createObjectURL(file);
        handleInputChange('qrCode', previewUrl);
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const categoryNames: { [key: string]: string } = {
      'expert': 'ผู้เชี่ยวชาญ',
      'restaurant': 'ร้านอาหาร',
      'transportation': 'การขนส่ง',
      'realestate': 'อสังหาริมทรัพย์',
      'education': 'การศึกษา',
      'travel': 'การท่องเที่ยว',
      'entertainment': 'บันเทิง',
      'health': 'สุขภาพ',
      'beauty': 'ความงาม',
      'organization': 'องค์กร',
      'government': 'รัฐบาล',
      'service': 'บริการ',
      'retail': 'ค้าปลีก',
      'localbusiness': 'ธุรกิจท้องถิ่น',
      'corporate': 'บริษัท',
      'brand': 'แบรนด์',
      'media': 'สื่อ',
      'movie': 'ภาพยนตร์',
      'music': 'ดนตรี',
      'sports': 'กีฬา',
      'tv': 'โทรทัศน์',
      'website': 'เว็บไซต์'
    };
    return categoryNames[categoryId] || categoryId;
  };

  if (!account) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('account.edit.title') || 'แก้ไขข้อมูลบัญชี'}</DialogTitle>
        </DialogHeader>
        
        {/* Warning Alert */}
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            {t('account.verification.warning') || 'หากไม่ทำการยืนยันตัวตนของบัญชี LINE OA ภายใน 14 วัน ทางผู้ดูแลระบบสามารถลบบัญชี OA นี้ออกจากระบบได้'}
          </AlertDescription>
        </Alert>
        
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
                    <SelectItem 
                      key={category.id} 
                      value={category.id}
                      className="text-black"
                    >
                      {category.icon} {getCategoryName(category.id)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          {/* Image Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="image">{t('account.edit.image') || 'รูปภาพ'}</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'image')}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image')?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t('account.upload.image') || 'อัพโหลดรูปภาพ'}
                  </Button>
                </div>
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="qrCode">{t('account.edit.qrCode') || 'QR Code'}</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    id="qrCode"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'qrCode')}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('qrCode')?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t('account.upload.qrcode') || 'อัพโหลด QR Code'}
                  </Button>
                </div>
                {formData.qrCode && (
                  <img src={formData.qrCode} alt="QR Preview" className="w-20 h-20 object-cover rounded" />
                )}
              </div>
            </div>
          </div>

          {/* Google Maps Link */}
          <div>
            <Label htmlFor="googleMaps">{t('account.edit.googlemaps') || 'ลิ้ง Google Maps'}</Label>
            <Input
              id="googleMaps"
              value={formData.location?.address || ''}
              onChange={(e) => handleInputChange('location', { 
                ...formData.location, 
                address: e.target.value,
                lat: 0,
                lng: 0
              })}
              placeholder="https://maps.google.com/..."
            />
          </div>

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
