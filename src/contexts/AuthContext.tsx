import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'employee' | 'hr';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  jobTitle?: string;
  workLocation?: string;
  dateOfJoining?: string;
  isActive?: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  jobTitle?: string;
  workLocation?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('trans_app_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('trans_app_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Mock authentication - in real app, this would be an API call
      if (email === 'admin@transapp.com' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@transapp.com',
          role: 'admin',
          isActive: true
        };
        setUser(adminUser);
        localStorage.setItem('trans_app_user', JSON.stringify(adminUser));
      } else if (email === 'employee@transapp.com' && password === 'employee123') {
        const employeeUser: User = {
          id: '2',
          name: 'John Employee',
          email: 'employee@transapp.com',
          role: 'employee',
          phone: '+1234567890',
          jobTitle: 'Software Developer',
          workLocation: 'New York Office',
          isActive: true
        };
        setUser(employeeUser);
        localStorage.setItem('trans_app_user', JSON.stringify(employeeUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      // Mock registration - in real app, this would be an API call
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
        role: 'employee',
        isActive: true
      };
      setUser(newUser);
      localStorage.setItem('trans_app_user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trans_app_user');
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};