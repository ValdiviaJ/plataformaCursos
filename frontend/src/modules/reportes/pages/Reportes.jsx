import React from 'react';
import { BarChart3, Clock, CheckCircle2, Award, Zap } from 'lucide-react';

const Reportes = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="section-title">Estadísticas de Aprendizaje</h1>
        <p className="section-subtitle">Mide tu dedicación, progreso y logros acumulados.</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - metrics & hours placeholder */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 flex flex-col gap-2">
              <Clock className="w-5 h-5 text-primary-400" />
              <span className="text-sm text-dark-500 font-semibold uppercase">Tiempo Total</span>
              <span className="text-2xl font-display font-black text-white">28 horas</span>
            </div>
            <div className="glass-card p-5 flex flex-col gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-450" />
              <span className="text-sm text-dark-500 font-semibold uppercase">Lecciones</span>
              <span className="text-2xl font-display font-black text-white">42 / 78</span>
            </div>
            <div className="glass-card p-5 flex flex-col gap-2">
              <Zap className="w-5 h-5 text-amber-450" />
              <span className="text-sm text-dark-500 font-semibold uppercase">Racha Actual</span>
              <span className="text-2xl font-display font-black text-white">5 días</span>
            </div>
          </div>

          {/* Activity charts simulator */}
          <div className="glass-card p-6 flex flex-col gap-6">
            <h3 className="font-bold text-white text-base">Dedicación Semanal (Horas)</h3>
            
            {/* Visual simulation of bar chart */}
            <div className="h-60 flex items-end justify-between gap-2 pt-6 border-b border-dark-900 px-4">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-primary-600/40 rounded-t-lg h-24 hover:bg-primary-500 transition-all" />
                <span className="text-xs text-dark-500">Lun</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-primary-600/40 rounded-t-lg h-16 hover:bg-primary-500 transition-all" />
                <span className="text-xs text-dark-500">Mar</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-primary-600/40 rounded-t-lg h-40 hover:bg-primary-500 transition-all" />
                <span className="text-xs text-dark-500">Mié</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-primary-600/40 rounded-t-lg h-32 hover:bg-primary-500 transition-all" />
                <span className="text-xs text-dark-500">Jue</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-gradient-to-t from-primary-600 to-accent-500 rounded-t-lg h-48 hover:shadow-glow transition-all" />
                <span className="text-xs text-dark-500">Vie</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-primary-600/40 rounded-t-lg h-12 hover:bg-primary-500 transition-all" />
                <span className="text-xs text-dark-500">Sáb</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-primary-600/40 rounded-t-lg h-8 hover:bg-primary-500 transition-all" />
                <span className="text-xs text-dark-500">Dom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - achievements */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white">Logros Desbloqueados</h2>
          <div className="glass-card p-6 flex flex-col gap-6">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-450 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Pionero del código</h4>
                <p className="text-xs text-dark-500 mt-0.5">Completaste tu primera lección.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Racha de 5 días</h4>
                <p className="text-xs text-dark-500 mt-0.5">Estudiaste 5 días consecutivos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
