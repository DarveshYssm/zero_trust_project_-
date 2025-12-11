import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

interface UserDto {
  email: string;
  roles: string[];
}

interface AuthContextType {
  user: UserDto | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  let inactivityTimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:8080/account/me');
      setUser(res.data);
    } catch {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchUser();
    resetInactivityTimer();
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('neon-session-expired'));
      logout();
    }, 15 * 60 * 1000);
  };

  useEffect(() => {
    if (!user) return;

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
    const reset = () => resetInactivityTimer();

    events.forEach((e) => window.addEventListener(e, reset));
    resetInactivityTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      clearTimeout(inactivityTimer);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
