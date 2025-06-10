
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('general');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password, userType);
      if (success) {
        toast({
          title: "ログイン成功",
          description: "正常にログインしました。",
        });
        
        // Redirect based on user type
        if (userType === 'organizer') {
          navigate('/organizer');
        } else if (userType === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "ログインエラー",
          description: "メールアドレスまたはパスワードが間違っています。",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "ログイン中にエラーが発生しました。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">ログイン</CardTitle>
          <p className="text-gray-600">アカウントにログインしてください</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="userType">ユーザータイプ</Label>
              <Select value={userType} onValueChange={(value: UserType) => setUserType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">一般ユーザー</SelectItem>
                  <SelectItem value="organizer">オーガナイザー</SelectItem>
                  <SelectItem value="admin">グローバル管理者</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 mb-2">テスト用アカウント:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>オーガナイザー: tanaka@example.com</div>
              <div>管理者: admin@example.com</div>
              <div>一般ユーザー: yamada@example.com</div>
              <div className="font-medium">パスワード: 任意</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
