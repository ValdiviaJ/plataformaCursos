import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('codemaster_user');
      const token = localStorage.getItem('codemaster_token');
      
      if (savedUser && token) {
        try {
          // Intentar validar sesión actual con el servidor
          const res = await api.get('/auth/me');
          const mappedUser = {
            ...res.data,
            nombre: res.data.name,
            rol: res.data.role
          };
          setUser(mappedUser);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Sesión inválida o expirada:', err);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user: apiUser, token } = res.data;
      
      const mappedUser = {
        ...apiUser,
        nombre: apiUser.name,
        rol: apiUser.role
      };
      
      localStorage.setItem('codemaster_user', JSON.stringify(mappedUser));
      localStorage.setItem('codemaster_token', token);
      
      setUser(mappedUser);
      setIsAuthenticated(true);
      return mappedUser;
    } catch (err) {
      throw new Error(err.message || 'Credenciales inválidas');
    }
  };

  const register = async (nombre, email, password) => {
    try {
      const res = await api.post('/auth/register', { 
        name: nombre, 
        email, 
        password 
      });
      const { user: apiUser, token } = res.data;
      
      const mappedUser = {
        ...apiUser,
        nombre: apiUser.name,
        rol: apiUser.role
      };
      
      localStorage.setItem('codemaster_user', JSON.stringify(mappedUser));
      localStorage.setItem('codemaster_token', token);
      
      setUser(mappedUser);
      setIsAuthenticated(true);
      return mappedUser;
    } catch (err) {
      throw new Error(err.message || 'Error al crear la cuenta');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Error al revocar token en servidor:', err);
    } finally {
      localStorage.removeItem('codemaster_user');
      localStorage.removeItem('codemaster_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      const res = await api.put('/auth/profile', { name: data.nombre });
      const updatedUser = {
        ...res.data,
        nombre: res.data.name,
        rol: res.data.role
      };
      
      localStorage.setItem('codemaster_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      throw new Error(err.message || 'Error al actualizar el perfil');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, updateProfile }}>
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
