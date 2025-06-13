
export interface LineOAVerification {
  id: string;
  organizerId: string;
  organizerName: string;
  lineOAId: string;
  accountName: string;
  status: 'pending' | 'approved' | 'declined';
  submittedAt: string;
  processedAt?: string;
  processedBy?: string;
  notes?: string;
}
