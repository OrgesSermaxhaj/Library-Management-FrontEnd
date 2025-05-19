import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  tenantId: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  tenantId: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setTenantId: (tenantId: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);

  // Initialize state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Clear any potentially corrupted data first
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedTenantId = localStorage.getItem('tenantId');

        // Only set token if it exists and is not 'undefined'
        if (storedToken && storedToken !== 'undefined') {
          setToken(storedToken);
        } else {
          localStorage.removeItem('token');
        }

        // Only parse user if it exists and is not 'undefined'
        if (storedUser && storedUser !== 'undefined') {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && typeof parsedUser === 'object') {
              setUser(parsedUser);
            } else {
              localStorage.removeItem('user');
            }
          } catch (e) {
            console.error('Error parsing stored user:', e);
            localStorage.removeItem('user');
          }
        } else {
          localStorage.removeItem('user');
        }

        // Only set tenantId if it exists and is not 'undefined'
        if (storedTenantId && storedTenantId !== 'undefined') {
          setTenantId(storedTenantId);
        } else {
          localStorage.removeItem('tenantId');
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        // Clear all auth data on error
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tenantId');
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tenantId');
      setToken(null);
      setUser(null);
      setTenantId(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update localStorage when state changes
  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error updating token in localStorage:', error);
    }
  }, [token]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error updating user in localStorage:', error);
    }
  }, [user]);

  useEffect(() => {
    try {
      if (tenantId) {
        localStorage.setItem('tenantId', tenantId);
      } else {
        localStorage.removeItem('tenantId');
      }
    } catch (error) {
      console.error('Error updating tenantId in localStorage:', error);
    }
  }, [tenantId]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        tenantId,
        setToken,
        setUser,
        setTenantId,
        logout,
      }}
    >
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