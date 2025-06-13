
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatMessage, ChatConversation } from '../types';

interface ChatContextType {
  conversations: ChatConversation[];
  addMessage: (participantId: string, participantName: string, participantType: 'general' | 'organizer', message: string, senderType: 'general' | 'organizer' | 'admin', senderId: string, senderName: string) => void;
  markAsRead: (conversationId: string) => void;
  getConversationsByType: (type: 'general' | 'organizer') => ChatConversation[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);

  const addMessage = (
    participantId: string,
    participantName: string,
    participantType: 'general' | 'organizer',
    message: string,
    senderType: 'general' | 'organizer' | 'admin',
    senderId: string,
    senderName: string
  ) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId,
      senderName,
      senderType,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setConversations(prev => {
      const existingConversation = prev.find(conv => conv.participantId === participantId);
      
      if (existingConversation) {
        return prev.map(conv => {
          if (conv.participantId === participantId) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: message,
              lastMessageTime: newMessage.timestamp,
              unreadCount: senderType === 'admin' ? conv.unreadCount : conv.unreadCount + 1,
            };
          }
          return conv;
        });
      } else {
        const newConversation: ChatConversation = {
          id: Date.now().toString(),
          participantId,
          participantName,
          participantType,
          messages: [newMessage],
          lastMessage: message,
          lastMessageTime: newMessage.timestamp,
          unreadCount: senderType === 'admin' ? 0 : 1,
        };
        return [...prev, newConversation];
      }
    });
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map(msg => ({ ...msg, isRead: true })),
          };
        }
        return conv;
      })
    );
  };

  const getConversationsByType = (type: 'general' | 'organizer') => {
    return conversations.filter(conv => conv.participantType === type);
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      addMessage,
      markAsRead,
      getConversationsByType,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
