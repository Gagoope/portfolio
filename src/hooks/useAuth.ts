import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('sms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would be an API call
    const mockUsers: User[] = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@school.edu',
        role: 'admin',
        firstName: 'System',
        lastName: 'Administrator',
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        username: 'teacher1',
        email: 'john.smith@school.edu',
        role: 'teacher',
        firstName: 'John',
        lastName: 'Smith',
        createdAt: '2024-01-01'
      },
      {
        id: '3',
        username: 'student1',
        email: 'jane.doe@school.edu',
        role: 'student',
        firstName: 'Jane',
        lastName: 'Doe',
        createdAt: '2024-01-01',
        parentId: '4'
      },
      {
        id: '4',
        username: 'parent1',
        email: 'mary.doe@email.com',
        role: 'parent',
        firstName: 'Mary',
        lastName: 'Doe',
        createdAt: '2024-01-01',
        studentIds: ['3']
      }
    ];

    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('sms_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sms_user');
  };

  return {
    user,
    login,
    logout,
    isAuthenticated
  };
};

export { AuthContext };