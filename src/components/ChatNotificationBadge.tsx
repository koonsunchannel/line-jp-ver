
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

export function ChatNotificationBadge() {
  const { conversations } = useChat();
  const { user } = useAuth();
  
  if (!user) return null;

  // Calculate total unread messages
  const totalUnread = conversations.reduce((total, conv) => {
    // For admin users, count all unread messages
    if (user.type === 'admin') {
      return total + conv.unreadCount;
    }
    // For other users, only count messages in their own conversation
    if (conv.participantId === user.id) {
      return total + conv.unreadCount;
    }
    return total;
  }, 0);

  if (totalUnread === 0) return null;

  return (
    <Badge 
      variant="destructive" 
      className="absolute -top-2 -left-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-red-500 text-white"
    >
      {totalUnread > 99 ? '99+' : totalUnread}
    </Badge>
  );
}
