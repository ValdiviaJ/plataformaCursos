import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { User, Shield, Bell, Key } from 'lucide-react';

const Configuracion = () => {
  const { user, updateProfile } = useAuth();
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [email, setEmail] = useState(user?.email || '');
  const [msg, setMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ nombre });
    setMsg('Perfil actualizado correctamente.');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="section-title">Configuración</h1>
        <p className="section-subtitle">Administra tus preferencias de cuenta e información del perfil.</p>
      </div>

      {msg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-sm font-semibold">
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side Navigation tabs layout */}
        <div className="md:col-span-1 flex flex-col gap-2">
          <button className="sidebar-link active bg-primary-500/10 text-primary-400">
            <User className="w-5 h-5" /> Perfil Público
          </button>
          <button className="sidebar-link hover:bg-dark-900/30">
            <Key className="w-5 h-5" /> Seguridad
          </button>
          <button className="sidebar-link hover:bg-dark-900/30">
            <Bell className="w-5 h-5" /> Notificaciones
          </button>
        </div>

        {/* Right side form */}
        <div className="md:col-span-2 glass-card p-6 flex flex-col gap-6">
          <h3 className="font-bold text-white text-base">Editar Perfil</h3>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Nombre Completo</label>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Correo Electrónico</label>
              <input 
                type="email" 
                value={email}
                disabled
                className="input-field opacity-60 cursor-not-allowed"
              />
            </div>

            <button type="submit" className="btn-primary py-2.5 px-6 self-start mt-2">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
