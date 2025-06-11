
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';

interface AccountRegistrationFormProps {
  onSubmit: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function AccountRegistrationForm({ onSubmit, isOpen, onClose }: AccountRegistrationFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    qrCode: '',
    tags: [] as string[],
    location: {
      address: '',
      lat: 0,
      lng: 0
    }
  });
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      followers: 0,
      rating: 0,
      isPromoted: false,
      verificationStatus: 'pending',
      ownerId: 'current-user',
      createdAt: new Date().toISOString(),
      views: 0,
      friendAdds: 0
    });
    
    toast({
      title: "申請を送信しました",
      description: "LINE OA登録申請が正常に送信されました。",
    });
    
    setFormData({
      name: '',
      description: '',
      category: '',
      image: '',
      qrCode: '',
      tags: [],
      location: { address: '', lat: 0, lng: 0 }
    });
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('admin.submit.application')}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">アカウント名</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">カテゴリ</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">画像URL</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qrCode">QRコードURL</Label>
              <Input
                id="qrCode"
                type="url"
                value={formData.qrCode}
                onChange={(e) => setFormData(prev => ({ ...prev, qrCode: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">住所</Label>
              <Input
                id="address"
                value={formData.location.address}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, address: e.target.value }
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label>タグ</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="タグを入力"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
                申請を送信
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                キャンセル
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
