import React, { useState, useMemo, useCallback } from 'react';
import AuthContext from './AuthContext.js';
import { getStoredUser, persistUser } from './authStorage.js';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (typeof window !== 'undefined' ? getStoredUser() : null));

  const login = useCallback((userData) => {
    setUser(userData);
    persistUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

