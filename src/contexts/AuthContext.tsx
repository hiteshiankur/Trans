import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, setAuthToken, removeAuthToken, ApiError } from '@/lib/api';

export type UserRole = 'superAdmin' | 'admin' | 'employee' | 'hr';

export interface User {
  id: string;
  fullName: string | null;
  email: string;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  jobTitle: string | null;
  workLocation: string | null;
  dateOfJoining: string | null;
  role: UserRole;
  otp: string | null;
  isverified: boolean;
  isActive: boolean;
  nationalIdNumber: string | null;
  passportNumber: string | null;
  stcPayNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string, otp?: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<{ needsOtpVerification: boolean; email?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  requestOtp: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  refreshUser: () => Promise<void>;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
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
    // Check for existing session on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await authApi.getMe();
          setUser(response.userDetails);
        } catch (error) {
          console.error('Error checking auth:', error);
          removeAuthToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password?: string, otp?: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await authApi.login(email, password, otp);
      // If OTP is provided, we expect a full auth response with token and userInfo
      if (otp) {
        const authResponse = response as { userInfo: any; message: string; isFirstTime: boolean; token?: string };
        if (authResponse.token) {
          setAuthToken(authResponse.token);
          setUser(authResponse.userInfo);
        }
      }
      // If no OTP, this just sends the OTP email (response will be { message: string })
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<{ needsOtpVerification: boolean; email?: string }> => {
    setLoading(true);
    try {
      await authApi.register(userData);
      // After successful registration, send OTP for verification
      await authApi.requestOtp(userData.email);
      return { needsOtpVerification: true, email: userData.email };
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await authApi.verifyOtp(email, otp);
      console.log("--response--", response);
      
      if (response.token) {
        setAuthToken(response.token);
        setUser(response.user);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error('OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async (email: string): Promise<void> => {
    try {
      await authApi.requestOtp(email);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error('Failed to send OTP.');
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await authApi.getMe();
      setUser(response.userDetails);
    } catch (error) {
      console.error('Error refreshing user:', error);
      logout();
    }
  };

  const logout = (): void => {
    setUser(null);
    removeAuthToken();
    // Call logout API in background
    authApi.logout().catch(console.error);
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    verifyOtp,
    requestOtp,
    logout,
    refreshUser,
    isAuthenticated: !!user,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};