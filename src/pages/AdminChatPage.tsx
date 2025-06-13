
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Send, User, Users } from 'lucide-react';
import { ChatConversation } from '../types';

export function AdminChatPage() {
  const { user } = useAuth();
  const { getConversationsByType, addMessage, markAsRead } = useChat();
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

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

  const generalConversations = getConversationsByType('general');
  const organizerConversations = getConversationsByType('organizer');

  const handleSelectConversation = (conversation: ChatConversation) => {
    setSelectedConversation(conversation);
    markAsRead(conversation.id);
  };

  const handleSendReply = () => {
    if (replyMessage.trim() && selectedConversation) {
      addMessage(
        selectedConversation.participantId,
        selectedConversation.participantName,
        selectedConversation.participantType,
        replyMessage,
        'admin',
        user.id,
        user.name
      );
      setReplyMessage('');
    }
  };

  const ConversationsList = ({ conversations, title, icon }: {
    conversations: ChatConversation[];
    title: string;
    icon: React.ReactNode;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
          {conversations.length > 0 && (
            <Badge variant="secondary">{conversations.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            ไม่มีข้อความ
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedConversation?.id === conversation.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {conversation.participantName}
                  </h3>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate mb-1">
                  {conversation.lastMessage}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(conversation.lastMessageTime).toLocaleString('th-TH')}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            ระบบแชทผู้ดูแล
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            จัดการข้อความจากผู้ใช้และผู้จัดการ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general" className="text-xs md:text-sm">
                  ผู้ใช้ทั่วไป
                </TabsTrigger>
                <TabsTrigger value="organizer" className="text-xs md:text-sm">
                  ผู้จัดการ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <ConversationsList
                  conversations={generalConversations}
                  title="ข้อความจากผู้ใช้ทั่วไป"
                  icon={<User className="w-5 h-5" />}
                />
              </TabsContent>

              <TabsContent value="organizer">
                <ConversationsList
                  conversations={organizerConversations}
                  title="ข้อความจากผู้จัดการ"
                  icon={<Users className="w-5 h-5" />}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    แชทกับ {selectedConversation.participantName}
                    <Badge variant="outline">
                      {selectedConversation.participantType === 'general' ? 'ผู้ใช้ทั่วไป' : 'ผู้จัดการ'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-[400px]">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderType === 'admin' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.senderType === 'admin'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm mb-1">{message.message}</p>
                          <p className={`text-xs ${
                            message.senderType === 'admin' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.senderName} • {new Date(message.timestamp).toLocaleString('th-TH')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Area */}
                  <div className="space-y-3 border-t pt-4">
                    <Textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="พิมพ์การตอบกลับ..."
                      className="min-h-[80px] resize-none"
                    />
                    <Button
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      ส่งการตอบกลับ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>เลือกการสนทนาเพื่อเริ่มแชท</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
