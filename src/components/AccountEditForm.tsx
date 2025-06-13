
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { LineOAAccount } from '../types';
import { categories } from '../data/updatedCategories';

interface AccountEditFormProps {
  account: LineOAAccount;
  onSave: (updatedAccount: LineOAAccount) => void;
  onDelete: (accountId: string) => void;
  onClose: () => void;
  isPromoted?: boolean;
}

export function AccountEditForm({ account, onSave, onDelete, onClose, isPromoted = false }: AccountEditFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: account.name,
    description: account.description,
    category: account.category,
    lineId: account.lineId,
    tags: account.tags.join(', '),
    location: account.location?.address || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.lineId.trim()) {
      toast({
        title: t('account.edit.error.required'),
        description: t('account.edit.error.required.description'),
        variant: "destructive",
      });
      return;
    }

    const updatedAccount: LineOAAccount = {
      ...account,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      lineId: formData.lineId,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      location: formData.location ? {
        ...account.location,
        address: formData.location
      } : account.location,
    };

    onSave(updatedAccount);
    toast({
      title: t('account.edit.success'),
      description: t('account.edit.success.description'),
    });
    onClose();
  };

  const handleDelete = () => {
    if (isPromoted) {
      toast({
        title: t('account.delete.error.promoted'),
        description: t('account.delete.error.promoted.description'),
        variant: "destructive",
      });
      return;
    }

    onDelete(account.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{t('account.edit.title')}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('account.form.name')} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t('account.form.name.placeholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lineId">{t('account.form.lineId')} *</Label>
              <Input
                id="lineId"
                value={formData.lineId}
                onChange={(e) => handleInputChange('lineId', e.target.value)}
                placeholder={t('account.form.lineId.placeholder')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('account.form.description')} *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t('account.form.description.placeholder')}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('account.form.category')}</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('account.form.category.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{t(`category.${category.id}`)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">{t('account.form.tags')}</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder={t('account.form.tags.placeholder')}
            />
            <p className="text-sm text-gray-500">{t('account.form.tags.help')}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t('account.form.location')}</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder={t('account.form.location.placeholder')}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600">
              <Save className="w-4 h-4 mr-2" />
              {t('account.edit.save')}
            </Button>
            
            <Button 
              onClick={handleDelete}
              variant="destructive"
              className={`flex-1 ${isPromoted ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isPromoted}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('account.edit.delete')}
            </Button>
            
            <Button onClick={onClose} variant="outline" className="flex-1">
              {t('auth.cancel')}
            </Button>
          </div>

          {isPromoted && (
            <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
              {t('account.delete.warning.promoted')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
