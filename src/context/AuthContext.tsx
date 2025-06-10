
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserType } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  { id: 'org1', name: '田中 太郎', email: 'tanaka@example.com', type: 'organizer' },
  { id: 'admin1', name: '管理者', email: 'admin@example.com', type: 'admin' },
  { id: 'user1', name: '山田 花子', email: 'yamada@example.com', type: 'general' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email && u.type === userType);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
