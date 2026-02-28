import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, tokenAPI } from '../services/api';
import { socketService } from '../services/socket';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (tokenAPI.hasToken()) {
        try {
          const userData = await authAPI.getMe();
          setUser(userData);
          // Connect socket after auth is confirmed
          socketService.connect();
        } catch (err) {
          console.error('Failed to fetch user:', err);
          tokenAPI.clearToken();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      tokenAPI.setToken(response.access_token);
      
      // Fetch user data
      const userData = await authAPI.getMe();
      setUser(userData);
      
      // Connect socket
      socketService.connect();
      
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, workspaceId) => {
    setLoading(true);
    setError(null);
    try {
      await authAPI.register(name, email, password, workspaceId);
      // Auto-login after registration
      const response = await authAPI.login(email, password);
      tokenAPI.setToken(response.access_token);
      
      const userData = await authAPI.getMe();
      setUser(userData);
      
      // Connect socket
      socketService.connect();
      
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    tokenAPI.clearToken();
    setUser(null);
    socketService.disconnect();
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
