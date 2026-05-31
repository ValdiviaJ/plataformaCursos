import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Menu, X, LogOut, User as UserIcon } from 'lucide-react';

const LandingLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-dark-200">
      {/* Header / Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-950/90 backdrop-blur-md border-b border-dark-800/80 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wide bg-gradient-to-r from-white via-dark-100 to-primary-400 bg-clip-text text-transparent">
              CodeMaster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-dark-300 hover:text-white font-medium transition-colors">Inicio</Link>
            <Link to="/cursos" className="text-dark-300 hover:text-white font-medium transition-colors">Cursos</Link>
            <Link to="/instructores" className="text-dark-300 hover:text-white font-medium transition-colors">Instructores</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Panel Estudiante
                </Link>
                <button onClick={logout} className="p-2 text-dark-400 hover:text-danger hover:bg-dark-900/50 rounded-xl transition-all">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost py-2 px-4 text-sm">Iniciar Sesión</Link>
                <Link to="/registro" className="btn-primary py-2 px-4 text-sm">Regístrate</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-dark-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-dark-900 border-b border-dark-800/80 p-6 flex flex-col gap-4 animate-slide-down">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-dark-300 hover:text-white font-medium">Inicio</Link>
            <Link to="/cursos" onClick={() => setMobileMenuOpen(false)} className="text-dark-300 hover:text-white font-medium">Cursos</Link>
            <Link to="/instructores" onClick={() => setMobileMenuOpen(false)} className="text-dark-300 hover:text-white font-medium">Instructores</Link>
            <hr className="border-dark-800" />
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn-secondary w-full text-center py-2">Panel Estudiante</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn-ghost w-full text-center py-2 text-danger">Cerrar Sesión</button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-ghost w-full text-center py-2">Iniciar Sesión</Link>
                <Link to="/registro" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full text-center py-2">Regístrate</Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark-950 border-t border-dark-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center">
                <BookOpen className="text-white w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white">CodeMaster</span>
            </div>
            <p className="text-sm text-dark-500">
              Formando a la siguiente generación de desarrolladores profesionales en Latinoamérica.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Plataforma</h4>
            <ul className="flex flex-col gap-2 text-sm text-dark-400">
              <li><Link to="/cursos" className="hover:text-white">Cursos</Link></li>
              <li><a href="#" className="hover:text-white">Planes & Suscripciones</a></li>
              <li><a href="#" className="hover:text-white">Testimonios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Soporte</h4>
            <ul className="flex flex-col gap-2 text-sm text-dark-400">
              <li><a href="#" className="hover:text-white">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white">Ayuda</a></li>
              <li><a href="#" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm text-dark-400">
              <li><a href="#" className="hover:text-white">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-white">Privacidad</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-dark-900 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-dark-500">
          <p>© 2026 CodeMaster. Todos los derechos reservados.</p>
          <p>Creado para el VIII Ciclo de Ingeniería de Sistemas.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
