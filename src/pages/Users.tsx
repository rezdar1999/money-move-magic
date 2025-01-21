import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function Users() {
  const { addUser, removeUser, users } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(username, password);
    setUsername('');
    setPassword('');
  };

  const handleDelete = (username: string) => {
    removeUser(username);
    toast.success('تم حذف المستخدم بنجاح');
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">إضافة مستخدم جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>اسم المستخدم</Label>
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label>كلمة المرور</Label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-right"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة مستخدم
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">قائمة المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users?.map((user) => (
              <div key={user.username} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-lg">{user.username}</span>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user.username)}
                  className="hover:bg-red-600"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}