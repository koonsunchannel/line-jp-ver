
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';
import { ChatMessage } from '../types';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { user } = useAuth();
  const { addMessage, conversations } = useChat();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !user) return null;

  // Find the conversation for the current user
  const userConversation = conversations.find(
    conv => conv.participantId === user.id
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userConversation?.messages]);

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

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-lg border-2 h-96 flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {user.type === 'organizer' ? t('chat.title.organizer') : t('chat.title.general')}
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
        
        <CardContent className="flex-1 flex flex-col space-y-4 p-4">
          <div className="text-sm text-gray-600">
            {user.type === 'organizer' 
              ? t('chat.description.organizer')
              : t('chat.description.general')
            }
          </div>
          
          {/* Chat History */}
          <ScrollArea className="flex-1 border rounded-lg p-2 bg-gray-50">
            {userConversation?.messages.length ? (
              <div className="space-y-2">
                {userConversation.messages.map((msg: ChatMessage) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderType === 'admin' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-2 text-sm ${
                        msg.senderType === 'admin'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-green-100 text-green-900'
                      }`}
                    >
                      <div className="font-medium text-xs mb-1">
                        {msg.senderName} 
                        <span className="ml-2 text-gray-500">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <div>{msg.message}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageCircle className="w-8 h-8 mb-2" />
                <p className="text-sm">{t('chat.empty')}</p>
              </div>
            )}
          </ScrollArea>
          
          {/* Message Input */}
          <div className="space-y-3 flex-shrink-0">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.placeholder')}
              className="min-h-[60px] resize-none"
            />
            
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4 mr-2" />
              {t('chat.send')}
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            {t('chat.response.time')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
