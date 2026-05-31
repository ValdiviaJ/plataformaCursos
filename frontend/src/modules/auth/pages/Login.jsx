import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2 text-center lg:text-left">
        <h2 className="text-3xl font-display font-black text-white">Bienvenido de vuelta</h2>
        <p className="text-sm text-dark-500">Ingresa tus credenciales para acceder a tu panel de estudio.</p>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm p-4 rounded-xl font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white">Correo Electrónico</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="email" 
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-white">Contraseña</label>
            <Link to="/forgot-password" className="text-xs text-primary-400 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pl-10 pr-10"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Iniciando Sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>

      <div className="text-center text-sm text-dark-500">
        ¿No tienes una cuenta?{' '}
        <Link to="/registro" className="text-primary-400 font-bold hover:underline">
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default Login;
