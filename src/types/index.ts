export interface LineOAAccount {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  qrCode: string;
  followers: number;
  rating: number;
  isPromoted: boolean;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  tags: string[];
  verificationStatus: 'approved' | 'pending' | 'rejected';
  ownerId: string;
  createdAt: string;
  views: number;
  friendAdds: number;
  lineId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'general' | 'organizer' | 'admin';
  avatar?: string;
}

export interface PromotionPackage {
  id: string;
  name: string;
  price: number;
  duration: number; // days
  features: string[];
  isPopular?: boolean;
}

export interface Transaction {
  id: string;
  organizerId: string;
  packageId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export type UserType = 'general' | 'organizer' | 'admin';
