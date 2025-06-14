
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
  isVerified?: boolean; // New field for LINE OA verification
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

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'general' | 'organizer' | 'admin';
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantType: 'general' | 'organizer';
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export type UserType = 'general' | 'organizer' | 'admin';
