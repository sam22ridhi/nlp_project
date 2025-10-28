import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

// The shape of the user data from our backend's JWT
interface Teacher {
  sub: string;
  name: string;
  email: string;
}

interface AuthContextType {
  teacher: Teacher | null;
  loading: boolean;
  signIn: () => void; // No more email/password
  signOut: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  // On initial app load, check for an existing token in localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('app_token');
      if (token) {
        const decoded: Teacher & { exp: number } = jwtDecode(token);
        // Check if token is expired
        if (Date.now() >= decoded.exp * 1000) {
            localStorage.removeItem('app_token');
            throw new Error("Token expired");
        }
        setTeacher(decoded);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem('app_token');
    } finally {
      setLoading(false);
    }
  }, []);

  // This is the key change: signIn now redirects the user to our backend
  const signIn = () => {
    window.location.href = 'http://localhost:8000/auth/login';
  };

  const signOut = () => {
    localStorage.removeItem('app_token');
    setTeacher(null);
    window.location.href = '/'; 
  };

  const getToken = () => localStorage.getItem('app_token');

  const value = { teacher, loading, signIn, signOut, getToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}