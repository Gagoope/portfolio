import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, role?: string) => Promise<string | true>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load user from localStorage if exists
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post<User>('http://localhost:4000/api/login', { username, password });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsLoading(false);
      return true;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string, role = 'staff'): Promise<string | true> => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:4000/api/register', { username, email, password, role });
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        return error.response.data.error;
      }
      return 'Registration failed. Please try again.';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
