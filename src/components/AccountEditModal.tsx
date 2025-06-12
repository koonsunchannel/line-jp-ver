
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LineOAAccount } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Edit, Upload } from 'lucide-react';

interface AccountEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: LineOAAccount;
  onSave: (updatedAccount: LineOAAccount) => void;
}

export function AccountEditModal({ isOpen, onClose, account, onSave }: AccountEditModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [editData, setEditData] = useState({
    name: account.name,
    description: account.description,
    category: account.category,
    lineId: account.lineId,
    tags: account.tags?.join(', ') || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'ธุรกิจ',
    'การศึกษา', 
    'บันเทิง',
    'อาหาร',
    'สุขภาพ',
    'เทคโนโลยี',
    'ท่องเที่ยว',
    'แฟชั่น',
    'กีฬา',
    'ข่าว'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // จำลองการอัปเดตข้อมูล
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedAccount: LineOAAccount = {
        ...account,
        name: editData.name,
        description: editData.description,
        category: editData.category,
        lineId: editData.lineId,
        tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      };

      onSave(updatedAccount);
      
      toast({
        title: "อัปเดตข้อมูลสำเร็จ",
        description: "ข้อมูล LINE OA ของคุณได้รับการอัปเดตเรียบร้อยแล้ว",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัปเดตข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Edit className="w-5 h-5 text-blue-500" />
            แก้ไขข้อมูล LINE OA
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            แก้ไขข้อมูลสำหรับ "{account.name}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="accountName" className="text-sm sm:text-base">ชื่อบัญชี</Label>
            <Input
              id="accountName"
              value={editData.name}
              onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="ชื่อ LINE OA"
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label htmlFor="lineId" className="text-sm sm:text-base">LINE ID</Label>
            <Input
              id="lineId"
              value={editData.lineId}
              onChange={(e) => setEditData(prev => ({ ...prev, lineId: e.target.value }))}
              placeholder="@example"
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-sm sm:text-base">หมวดหมู่</Label>
            <Select value={editData.category} onValueChange={(value) => setEditData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm sm:text-base">คำอธิบาย</Label>
            <Textarea
              id="description"
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="อธิบายเกี่ยวกับ LINE OA ของคุณ..."
              rows={4}
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label htmlFor="tags" className="text-sm sm:text-base">แท็ก (คั่นด้วยเครื่องหมายจุลภาค)</Label>
            <Input
              id="tags"
              value={editData.tags}
              onChange={(e) => setEditData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="แท็ก1, แท็ก2, แท็ก3"
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label className="text-sm sm:text-base">รูปภาพโปรไฟล์</Label>
            <div className="flex items-center gap-4 mt-2">
              <img 
                src={account.image} 
                alt={account.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <Button type="button" variant="outline" className="text-sm">
                <Upload className="w-4 h-4 mr-2" />
                เปลี่ยนรูปภาพ
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={onClose}
              className="text-sm sm:text-base"
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
