
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';
import { format } from 'date-fns';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { user } = useAuth();
  const { addMessage, conversations } = useChat();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');

  if (!isOpen || !user) return null;

  // Get conversation for current user
  const userConversation = conversations.find(conv => conv.participantId === user.id);
  const messages = userConversation?.messages || [];

  const handleSendMessage = () => {
    if (message.trim()) {
      addMessage(
        user.id,
        user.name,
        user.type as 'general' | 'organizer',
        message,
        user.type as 'general' | 'organizer',
        user.id,
        user.name
      );
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getChatTitle = () => {
    switch (user.type) {
      case 'organizer':
        return t('chat.title.organizer') || 'ติดต่อผู้ดูแลระบบ (ผู้จัดการ)';
      case 'admin':
        return t('chat.title.admin') || 'ติดต่อผู้ดูแลระบบ (แอดมิน)';
      default:
        return t('chat.title.general') || 'ติดต่อผู้ดูแลระบบ';
    }
  };

  const getChatDescription = () => {
    switch (user.type) {
      case 'organizer':
        return t('chat.description.organizer') || 'ส่งข้อความถึงผู้ดูแลระบบเกี่ยวกับการจัดการบัญชี LINE OA';
      case 'admin':
        return t('chat.description.admin') || 'ระบบแชทสำหรับผู้ดูแลระบบ';
      default:
        return t('chat.description.general') || 'ส่งข้อความถึงผู้ดูแลระบบเพื่อขอความช่วยเหลือ';
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-lg border-2 h-96">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {getChatTitle()}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            {getChatDescription()}
          </p>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col h-72">
          {/* Chat History */}
          <ScrollArea className="flex-1 w-full">
            <div className="space-y-3 pr-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-4">
                  {t('chat.no.messages') || 'ยังไม่มีข้อความ'}
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.senderId === user.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="text-xs opacity-70 mb-1">
                        {msg.senderName} • {format(new Date(msg.timestamp), 'HH:mm')}
                      </div>
                      <div className="text-sm">{msg.message}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="space-y-3 border-t pt-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.message.placeholder') || 'พิมพ์ข้อความของคุณที่นี่...'}
              className="min-h-[60px] resize-none"
            />
            
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4 mr-2" />
              {t('chat.send.button') || 'ส่งข้อความ'}
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            {t('chat.response.time') || 'ผู้ดูแลระบบจะตอบกลับภายใน 24 ชั่วโมง'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
