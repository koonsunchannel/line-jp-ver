
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LineOAAccount } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, X } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: LineOAAccount;
}

export function ReportModal({ isOpen, onClose, account }: ReportModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [reportData, setReportData] = useState({
    type: '',
    subject: '',
    description: '',
    reporterEmail: '',
    reporterName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    { id: 'spam', label: 'สแปมหรือเนื้อหาไม่เหมาะสม' },
    { id: 'fake', label: 'บัญชีปลอมหรือหลอกลวง' },
    { id: 'copyright', label: 'ละเมิดลิขสิทธิ์' },
    { id: 'harassment', label: 'การคุกคามหรือการกลั่นแกล้ง' },
    { id: 'violence', label: 'เนื้อหาที่มีความรุนแรง' },
    { id: 'other', label: 'อื่นๆ' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock report submission - ในระบบจริงจะส่งข้อมูลไปยัง API
    try {
      // จำลองการส่งข้อมูล
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "รายงานถูกส่งเรียบร้อยแล้ว",
        description: "เราจะตรวจสอบรายงานของคุณภายใน 24 ชั่วโมง",
      });

      // Reset form
      setReportData({
        type: '',
        subject: '',
        description: '',
        reporterEmail: '',
        reporterName: ''
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งรายงานได้ กรุณาลองใหม่อีกครั้ง",
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
            <AlertTriangle className="w-5 h-5 text-red-500" />
            รายงาน LINE OA
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            รายงานปัญหาเกี่ยวกับ "{account.name}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="reportType" className="text-sm sm:text-base">ประเภทของปัญหา</Label>
            <Select value={reportData.type} onValueChange={(value) => setReportData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder="เลือกประเภทของปัญหา" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {reportTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reporterName" className="text-sm sm:text-base">ชื่อของคุณ</Label>
            <Input
              id="reporterName"
              value={reportData.reporterName}
              onChange={(e) => setReportData(prev => ({ ...prev, reporterName: e.target.value }))}
              placeholder="กรอกชื่อของคุณ"
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label htmlFor="reporterEmail" className="text-sm sm:text-base">อีเมลของคุณ</Label>
            <Input
              id="reporterEmail"
              type="email"
              value={reportData.reporterEmail}
              onChange={(e) => setReportData(prev => ({ ...prev, reporterEmail: e.target.value }))}
              placeholder="your@email.com"
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label htmlFor="subject" className="text-sm sm:text-base">หัวข้อ</Label>
            <Input
              id="subject"
              value={reportData.subject}
              onChange={(e) => setReportData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="สรุปปัญหาในหัวข้อสั้นๆ"
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm sm:text-base">รายละเอียด</Label>
            <Textarea
              id="description"
              value={reportData.description}
              onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="อธิบายปัญหาที่พบให้ละเอียด..."
              rows={4}
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              className="bg-red-500 hover:bg-red-600 text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'กำลังส่ง...' : 'ส่งรายงาน'}
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
