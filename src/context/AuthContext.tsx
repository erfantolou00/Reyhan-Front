'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type UserProfile = {
    name: string;
    emailOrPhone: string;
    avatar?: string; // base64 یا URL
    email?: string;
    phone?: string;
    companyName?: string;
    companyRole?: string;
    companySize?: string;
    industry?: string;
    companyAddress?: string;
  };

type AuthContextType = {
  user: UserProfile | null;
  login: (user: UserProfile) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('reyhan_user');
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = (data: UserProfile | null) => {
    if (data) {
      localStorage.setItem('reyhan_user', JSON.stringify(data));
    } else {
      localStorage.removeItem('reyhan_user');
    }
  };

  const login = (userData: UserProfile) => {
    setUser(userData);
    persist(userData);
  };

  const logout = () => {
    setUser(null);
    persist(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      persist(updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateProfile, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}