import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    // Check for stored token and validate
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate token with backend
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        role: 'paid',
        token,
      };
      setState({ user: mockUser, isAuthenticated: true, loading: false });
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual login API call
      const mockUser: User = {
        id: '1',
        email,
        role: 'paid',
        token: 'mock-token',
      };
      localStorage.setItem('token', mockUser.token);
      setState({ user: mockUser, isAuthenticated: true, loading: false });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // TODO: Implement actual registration API call
      const mockUser: User = {
        id: '1',
        email,
        role: 'free',
        token: 'mock-token',
      };
      localStorage.setItem('token', mockUser.token);
      setState({ user: mockUser, isAuthenticated: true, loading: false });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({ user: null, isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
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
