import { config } from '@/config/env';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  token: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Decodifica o payload do JWT e verifica se está expirado
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; // token malformado = trata como expirado
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Checagem na inicialização do app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed: User = JSON.parse(storedUser);
      if (isTokenExpired(parsed.token)) {
        localStorage.removeItem('user');
      } else {
        setUser(parsed);
      }
    }
    setIsLoading(false);
  }, []);

  // Checagem periódica enquanto o app está aberto (a cada 60 segundos)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      if (isTokenExpired(user.token)) {
        setUser(null);
        localStorage.removeItem('user');
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      setUser(result.data);
      localStorage.setItem('user', JSON.stringify(result.data));
      return result.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};