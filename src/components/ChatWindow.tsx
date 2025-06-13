
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { user } = useAuth();
  const { addMessage } = useChat();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');

  if (!isOpen || !user) return null;

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

  return (
    <div className="fixed bottom-20 right-6 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {user.type === 'organizer' ? 'ติดต่อผู้ดูแลระบบ (ผู้จัดการ)' : 'ติดต่อผู้ดูแลระบบ'}
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
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            {user.type === 'organizer' 
              ? 'ส่งข้อความถึงผู้ดูแลระบบเกี่ยวกับการจัดการบัญชี LINE OA' 
              : 'ส่งข้อความถึงผู้ดูแลระบบเพื่อขอความช่วยเหลือ'
            }
          </div>
          
          <div className="space-y-3">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={user.type === 'organizer' 
                ? 'พิมพ์ข้อความของคุณที่นี่...' 
                : 'พิมพ์ข้อความของคุณที่นี่...'
              }
              className="min-h-[80px] resize-none"
            />
            
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4 mr-2" />
              ส่งข้อความ
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            ผู้ดูแลระบบจะตอบกลับภายใน 24 ชั่วโมง
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
