import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit2, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX,
  Mail,
  Calendar,
  Filter,
  Check,
  X
} from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'Administrador CodeMaster', email: 'admin@codemaster.com', role: 'admin', status: 'active', date: '2026-01-10' },
  { id: 2, name: 'Dr. Carlos Mendoza', email: 'carlos.mendoza@codemaster.com', role: 'instructor', status: 'active', date: '2026-02-15' },
  { id: 3, name: 'Dra. Ana Restrepo', email: 'ana.restrepo@codemaster.com', role: 'instructor', status: 'active', date: '2026-03-01' },
  { id: 4, name: 'Justo Valdivia', email: 'justo@codemaster.com', role: 'estudiante', status: 'active', date: '2026-05-20' },
  { id: 5, name: 'Milagros Gomez', email: 'milagros@gmail.com', role: 'estudiante', status: 'blocked', date: '2026-05-22' },
  { id: 6, name: 'Luis Torres', email: 'luis.torres@outlook.com', role: 'estudiante', status: 'active', date: '2026-05-25' }
];

const UsuariosPage = () => {
  const { tipo } = useParams(); // 'administradores', 'docentes', 'estudiantes'
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // New User Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('estudiante');

  // Filter users based on route param and search
  const mappedRole = tipo === 'administradores' ? 'admin' : tipo === 'docentes' ? 'instructor' : 'estudiante';
  
  const filteredUsers = users.filter(user => {
    const matchesRole = user.role === mappedRole;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    const newUser = {
      id: Date.now(),
      name: formName,
      email: formEmail,
      role: formRole,
      status: 'active',
      date: new Date().toISOString().split('T')[0]
    };

    setUsers([newUser, ...users]);
    setFormName('');
    setFormEmail('');
    setShowAddModal(false);
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'blocked' : 'active' };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handlePromoteUser = (id, newRole) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  const title = tipo === 'administradores' ? 'Administradores' : tipo === 'docentes' ? 'Docentes / Instructores' : 'Estudiantes';
  const roleLabel = tipo === 'administradores' ? 'Admin' : tipo === 'docentes' ? 'Docente' : 'Estudiante';

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="section-title text-2xl font-black">{title}</h1>
          <p className="text-sm text-dark-400">Gestión completa de {title.toLowerCase()} del sistema.</p>
        </div>
        <button 
          onClick={() => {
            setFormRole(mappedRole);
            setShowAddModal(true);
          }}
          className="btn-primary flex items-center gap-2 text-sm py-2.5"
        >
          <UserPlus className="w-4 h-4" /> Agregar {roleLabel}
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder={`Buscar por nombre o correo...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-dark-800 rounded-xl text-sm focus:outline-none focus:border-primary-500/50"
          />
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto text-xs text-dark-400 font-semibold bg-dark-900/40 p-1.5 rounded-lg border border-dark-800">
          <Filter className="w-3.5 h-3.5" />
          <span>Filtro activo: {roleLabel}</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-dark-800 bg-dark-900/40">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Usuario</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Correo Electrónico</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Fecha Registro</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Estado</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-850">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-dark-900/20 transition-all">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center font-bold text-white shadow-glow">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-semibold text-white text-sm block">{user.name}</span>
                          <span className="text-xs text-dark-500 capitalize flex items-center gap-1 mt-0.5">
                            <Shield className="w-3 h-3 text-primary-400" /> {user.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-dark-300">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-dark-500" /> {user.email}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-dark-300">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-dark-500" /> {user.date}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`badge ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {user.status === 'active' ? 'Activo' : 'Bloqueado'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleToggleStatus(user.id)}
                          title={user.status === 'active' ? 'Bloquear usuario' : 'Desbloquear usuario'}
                          className={`p-1.5 rounded-lg border transition-all ${user.status === 'active' ? 'border-amber-500/20 hover:bg-amber-500/10 text-amber-400' : 'border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-400'}`}
                        >
                          {user.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                        
                        {/* Change role dynamically for demonstration */}
                        <select 
                          value={user.role}
                          onChange={(e) => handlePromoteUser(user.id, e.target.value)}
                          className="bg-dark-900 border border-dark-800 text-xs rounded-lg px-2 py-1 text-dark-300 focus:outline-none focus:border-primary-500"
                        >
                          <option value="admin">Admin</option>
                          <option value="instructor">Docente</option>
                          <option value="estudiante">Estudiante</option>
                        </select>

                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          title="Eliminar usuario"
                          className="p-1.5 border border-red-500/20 hover:bg-red-500/10 text-red-400 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-dark-500">
                    No se encontraron {title.toLowerCase()} que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="glass-card w-full max-w-md p-6 flex flex-col gap-4 border-primary-500/30">
            <div className="flex justify-between items-center border-b border-dark-800 pb-3">
              <h2 className="text-lg font-bold text-white">Nuevo {roleLabel}</h2>
              <button onClick={() => setShowAddModal(false)} className="text-dark-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Nombre Completo</label>
                <input 
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="input-field py-2 px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Correo Electrónico</label>
                <input 
                  type="email"
                  required
                  placeholder="Ej. juan.perez@codemaster.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="input-field py-2 px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Rol asignado</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-xl text-dark-200 focus:outline-none focus:border-primary-500 text-sm"
                >
                  <option value="admin">Administrador</option>
                  <option value="instructor">Docente / Instructor</option>
                  <option value="estudiante">Estudiante</option>
                </select>
              </div>

              <div className="flex items-center gap-3 justify-end border-t border-dark-800 pt-4 mt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary py-2 px-4 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="btn-primary py-2 px-4 text-xs font-bold"
                >
                  Guardar {roleLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosPage;
