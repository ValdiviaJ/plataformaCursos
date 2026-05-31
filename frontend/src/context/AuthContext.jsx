import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión guardada en localStorage
    const savedUser = localStorage.getItem('codemaster_user');
    const token = localStorage.getItem('codemaster_token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login para desarrollo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: 1,
            nombre: 'Justo Valdivia',
            email: email,
            avatar: null,
            rol: 'estudiante'
          };
          localStorage.setItem('codemaster_user', JSON.stringify(mockUser));
          localStorage.setItem('codemaster_token', 'mock_token_12345');
          setUser(mockUser);
          setIsAuthenticated(true);
          resolve(mockUser);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('codemaster_user');
    localStorage.removeItem('codemaster_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (data) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('codemaster_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
