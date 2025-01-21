import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-primary p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Button
            variant={isActive('/send') ? 'secondary' : 'ghost'}
            asChild
          >
            <Link to="/send">إرسال</Link>
          </Button>
          <Button
            variant={isActive('/receive') ? 'secondary' : 'ghost'}
            asChild
          >
            <Link to="/receive">استلام</Link>
          </Button>
          <Button
            variant={isActive('/history') ? 'secondary' : 'ghost'}
            asChild
          >
            <Link to="/history">السجل</Link>
          </Button>
          <Button
            variant={isActive('/users') ? 'secondary' : 'ghost'}
            asChild
          >
            <Link to="/users">المستخدمين</Link>
          </Button>
        </div>
        <Button variant="destructive" onClick={logout}>
          تسجيل الخروج
        </Button>
      </div>
    </nav>
  );
}