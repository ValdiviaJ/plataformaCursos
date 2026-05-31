import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-dark-950 text-dark-200">
      {/* Left Decorative Column (Visible on Desktop) */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-tr from-primary-950 via-dark-950 to-accent-950/40 items-center justify-center p-12 overflow-hidden border-r border-dark-900">
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float" />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

        <div className="relative z-10 max-w-lg flex flex-col gap-6 text-left">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-3xl tracking-wide text-white">CodeMaster</span>
          </Link>
          <div>
            <h1 className="font-display text-4xl xl:text-5xl font-black leading-tight text-white">
              Aprende a programar como un <span className="gradient-text">Profesional</span>
            </h1>
            <p className="text-lg text-dark-400 mt-4">
              Cursos creados por expertos de la industria con proyectos reales de producción. Accede a tu cuenta o crea una nueva para comenzar.
            </p>
          </div>
          <div className="flex gap-8 border-t border-dark-800 pt-8 mt-4">
            <div>
              <p className="text-2xl font-bold text-white">+10k</p>
              <p className="text-sm text-dark-500">Estudiantes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">+200</p>
              <p className="text-sm text-dark-500">Cursos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.9/5</p>
              <p className="text-sm text-dark-500">Valoración</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Auth Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-20 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center">
              <BookOpen className="text-white w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg text-white">CodeMaster</span>
          </Link>
        </div>
        <div className="w-full max-w-md animate-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
