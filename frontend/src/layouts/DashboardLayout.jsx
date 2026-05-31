import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/mi-aprendizaje', label: 'Mi Aprendizaje', icon: BookOpen },
    { to: '/instructores', label: 'Instructores', icon: Users },
    { to: '/pagos', label: 'Mis Pagos', icon: CreditCard },
    { to: '/reportes', label: 'Estadísticas', icon: BarChart3 },
    { to: '/configuracion', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-dark-200 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-dark-900 border-b border-dark-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center">
            <GraduationCap className="text-white w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg text-white">CodeMaster</span>
        </Link>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar (Desktop & Mobile drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-dark-800/80 p-6 flex flex-col justify-between
        transition-transform duration-300 transform md:translate-x-0 md:static md:h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-wide text-white">CodeMaster</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-dark-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active bg-primary-500/10 text-primary-400' : ''}`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="flex flex-col gap-4 border-t border-dark-850 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center font-bold text-white shadow-glow">
              {user?.nombre ? user.nombre.charAt(0) : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.nombre || 'Estudiante'}</p>
              <p className="text-xs text-dark-500 truncate capitalize">{user?.rol || 'Estudiante'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-danger/80 hover:bg-danger/10 hover:text-danger font-medium transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header (Breadcrumb, Search, Notifications) */}
        <header className="hidden md:flex bg-dark-950 border-b border-dark-900 py-4 px-8 items-center justify-between sticky top-0 z-30 backdrop-blur-md bg-dark-950/80">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar cursos, lecciones, archivos..." 
                className="w-full pl-10 pr-4 py-2 bg-dark-900 border border-dark-800 rounded-xl text-sm text-dark-200 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <button className="relative p-2 text-dark-400 hover:text-white rounded-xl hover:bg-dark-900 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary-500 rounded-full ring-2 ring-dark-950" />
            </button>

            {/* Quick Profile Link */}
            <Link to="/configuracion" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center font-bold text-sm text-white group-hover:border-primary-500/50 transition-all">
                {user?.nombre ? user.nombre.charAt(0) : 'U'}
              </div>
            </Link>
          </div>
        </header>

        {/* Dashboard Pages Outlet */}
        <main className="flex-grow p-6 md:p-8 bg-dark-950/40">
          <Outlet />
        </main>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
