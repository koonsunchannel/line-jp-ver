
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useVerification } from '../context/VerificationContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, X, Shield, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function AdminVerificationPage() {
  const { user } = useAuth();
  const { getPendingVerifications, processVerification } = useVerification();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [processingNotes, setProcessingNotes] = useState<{ [key: string]: string }>({});

  if (!user || user.type !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <p className="text-gray-600 text-sm md:text-base">กรุณาเข้าสู่ระบบในฐานะผู้ดูแลระบบ</p>
        </div>
      </div>
    );
  }

  const pendingVerifications = getPendingVerifications();

  const handleProcessVerification = (verificationId: string, status: 'approved' | 'declined') => {
    const notes = processingNotes[verificationId] || '';
    processVerification(verificationId, status, user.name, notes);
    
    toast({
      title: status === 'approved' ? 
        (t('verification.approved.title') || 'อนุมัติแล้ว') : 
        (t('verification.declined.title') || 'ปฏิเสธแล้ว'),
      description: status === 'approved' ? 
        (t('verification.approved.description') || 'การยืนยันตัวตนได้รับการอนุมัติเรียบร้อยแล้ว') : 
        (t('verification.declined.description') || 'การยืนยันตัวตนถูกปฏิเสธ'),
    });

    // Clear notes
    setProcessingNotes(prev => {
      const updated = { ...prev };
      delete updated[verificationId];
      return updated;
    });
  };

  const updateNotes = (verificationId: string, notes: string) => {
    setProcessingNotes(prev => ({ ...prev, [verificationId]: notes }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            {t('verification.admin.title') || 'จัดการการยืนยันตัวตน LINE OA'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {t('verification.admin.description') || 'ตรวจสอบและอนุมัติคำขอยืนยันตัวตนของบัญชี LINE OA'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('verification.pending') || 'รอการตรวจสอบ'}</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingVerifications.length}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Verifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              {t('verification.pending.list') || 'คำขอยืนยันตัวตนที่รอการตรวจสอบ'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingVerifications.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">{t('verification.no.pending') || 'ไม่มีคำขอยืนยันตัวตนที่รอการตรวจสอบ'}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingVerifications.map((verification) => (
                  <div key={verification.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {verification.accountName}
                          </h3>
                          <Badge variant="secondary">
                            {t('verification.pending') || 'รอการตรวจสอบ'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">{t('verification.organizer') || 'ผู้จัดการ'}</p>
                            <p className="font-medium">{verification.organizerName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{t('verification.line.oa.id') || 'LINE OA ID'}</p>
                            <p className="font-medium font-mono">{verification.lineOAId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{t('verification.submitted.at') || 'วันที่ส่งคำขอ'}</p>
                            <p className="font-medium">
                              {new Date(verification.submittedAt).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <Label htmlFor={`notes-${verification.id}`}>
                            {t('verification.notes') || 'หมายเหตุ (ไม่บังคับ)'}
                          </Label>
                          <Textarea
                            id={`notes-${verification.id}`}
                            value={processingNotes[verification.id] || ''}
                            onChange={(e) => updateNotes(verification.id, e.target.value)}
                            placeholder={t('verification.notes.placeholder') || 'เพิ่มหมายเหตุสำหรับการตรวจสอบ...'}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                        <Button 
                          onClick={() => handleProcessVerification(verification.id, 'approved')}
                          className="bg-green-500 hover:bg-green-600 w-full"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {t('verification.approve') || 'อนุมัติ'}
                        </Button>
                        <Button 
                          onClick={() => handleProcessVerification(verification.id, 'declined')}
                          variant="destructive"
                          className="w-full"
                        >
                          <X className="w-4 h-4 mr-2" />
                          {t('verification.decline') || 'ปฏิเสธ'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
