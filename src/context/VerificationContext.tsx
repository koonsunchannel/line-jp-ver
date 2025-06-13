
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LineOAVerification } from '../types/verification';

interface VerificationContextType {
  verifications: LineOAVerification[];
  submitVerification: (organizerId: string, organizerName: string, lineOAId: string, accountName: string) => void;
  processVerification: (verificationId: string, status: 'approved' | 'declined', processedBy: string, notes?: string) => void;
  getUserVerifications: (organizerId: string) => LineOAVerification[];
  getPendingVerifications: () => LineOAVerification[];
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [verifications, setVerifications] = useState<LineOAVerification[]>([]);

  const submitVerification = (organizerId: string, organizerName: string, lineOAId: string, accountName: string) => {
    const newVerification: LineOAVerification = {
      id: Date.now().toString(),
      organizerId,
      organizerName,
      lineOAId,
      accountName,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    setVerifications(prev => [...prev, newVerification]);
  };

  const processVerification = (verificationId: string, status: 'approved' | 'declined', processedBy: string, notes?: string) => {
    setVerifications(prev =>
      prev.map(verification => {
        if (verification.id === verificationId) {
          return {
            ...verification,
            status,
            processedAt: new Date().toISOString(),
            processedBy,
            notes,
          };
        }
        return verification;
      })
    );
  };

  const getUserVerifications = (organizerId: string) => {
    return verifications.filter(v => v.organizerId === organizerId);
  };

  const getPendingVerifications = () => {
    return verifications.filter(v => v.status === 'pending');
  };

  return (
    <VerificationContext.Provider value={{
      verifications,
      submitVerification,
      processVerification,
      getUserVerifications,
      getPendingVerifications,
    }}>
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
}
