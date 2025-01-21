import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  addUser: (username: string, password: string) => void;
  removeUser: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const defaultUsers = [
  { username: 'rezdar', password: '1234' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState(defaultUsers);
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      setUser({ username: foundUser.username });
      navigate('/send');
      toast.success('تم تسجيل الدخول بنجاح');
    } else {
      toast.error('خطأ في اسم المستخدم أو كلمة المرور');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const addUser = (username: string, password: string) => {
    if (users.some(u => u.username === username)) {
      toast.error('اسم المستخدم موجود بالفعل');
      return;
    }
    setUsers([...users, { username, password }]);
    toast.success('تم إضافة المستخدم بنجاح');
  };

  const removeUser = (username: string) => {
    if (username === 'rezdar') {
      toast.error('لا يمكن حذف المستخدم الرئيسي');
      return;
    }
    setUsers(users.filter(u => u.username !== username));
    toast.success('تم حذف المستخدم بنجاح');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}