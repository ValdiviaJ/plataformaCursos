import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';

const Registro = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(nombre, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in">
      <div className="flex flex-col gap-2 text-center lg:text-left">
        <h2 className="text-3xl font-display font-black text-white">Crea tu cuenta</h2>
        <p className="text-sm text-dark-500">Regístrate para comenzar a estructurar tu carrera profesional.</p>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm p-4 rounded-xl font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white">Nombre Completo</label>
          <div className="relative">
            <User className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Justo Valdivia"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="input-field pl-10"
              required
            />
          </div>
        </div>

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
          <label className="text-sm font-semibold text-white">Contraseña</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Mínimo 6 caracteres"
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
              <Loader2 className="w-5 h-5 animate-spin" /> Registrando...
            </>
          ) : (
            'Registrarse'
          )}
        </button>
      </form>

      <div className="text-center text-sm text-dark-500">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="text-primary-400 font-bold hover:underline">
          Inicia Sesión
        </Link>
      </div>
    </div>
  );
};

export default Registro;
