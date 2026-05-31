import React from 'react';
import { 
  Trophy, 
  Award, 
  Flame, 
  Sparkles, 
  Zap, 
  ShieldAlert, 
  Star,
  StarHalf
} from 'lucide-react';

const achievements = [
  { id: 1, name: 'Primeros Pasos', desc: 'Inicia tu primera lección en CodeMaster.', unlocked: true, date: '2026-05-20', icon: Trophy, color: 'text-amber-450 bg-amber-500/10 border-amber-500/20' },
  { id: 2, name: 'Estudiante Constante', desc: 'Mantén una racha de estudio por 5 días.', unlocked: true, date: '2026-05-25', icon: Flame, color: 'text-orange-450 bg-orange-500/10 border-orange-500/20' },
  { id: 3, name: 'Código Limpio', desc: 'Completa un cuestionario con puntaje 100%.', unlocked: true, date: '2026-05-28', icon: Zap, color: 'text-primary-400 bg-primary-500/10 border-primary-500/20' },
  { id: 4, name: 'Políglota Web', desc: 'Inscríbete en cursos de 3 categorías distintas.', unlocked: false, date: 'Bloqueado', icon: Sparkles, color: 'text-dark-500 bg-dark-900/40 border-dark-850' }
];

const rankingUsers = [
  { rank: 1, name: 'Carlos Mendoza Jr.', xp: '3,450 XP', active: true },
  { rank: 2, name: 'Alejandra Gomez', xp: '2,900 XP', active: false },
  { rank: 3, name: 'Justo Valdivia (Tú)', xp: '2,400 XP', active: true },
  { rank: 4, name: 'Luis Torres', xp: '1,890 XP', active: false },
  { rank: 5, name: 'Milagros Gomez', xp: '1,200 XP', active: false }
];

const GamificacionPage = () => {
  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black">Sistema de Gamificación</h1>
          <p className="text-sm text-dark-400">Gana puntos de experiencia (XP), desbloquea medallas e incrementa tu posición en el ranking.</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left columns: Level progress and Achievements */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Level card */}
          <div className="glass-card p-6 bg-gradient-to-r from-primary-950/20 via-dark-900 to-accent-950/20 border-primary-500/25 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-24 h-24 rounded-full bg-dark-800 border-4 border-primary-500 flex items-center justify-center font-bold text-white text-3xl shadow-glow shrink-0">
              Nivel 4
            </div>
            
            <div className="flex-grow flex flex-col gap-3 w-full">
              <div>
                <h3 className="font-bold text-white text-base">Rango actual: Estudiante Destacado</h3>
                <p className="text-xs text-dark-400 mt-0.5">Estás a solo 600 XP de subir al Nivel 5 y desbloquear nuevos cursos premium.</p>
              </div>

              {/* Progress bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-dark-400 font-semibold">
                  <span>2,400 / 3,000 XP</span>
                  <span>80% Completado</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Medals Grid */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-dark-450 uppercase tracking-wider">Logros y Reconocimientos</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map(ach => {
                const Icon = ach.icon;
                return (
                  <div key={ach.id} className={`glass-card p-4 flex gap-4 items-center border ${ach.unlocked ? 'border-dark-750' : 'opacity-55'}`}>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${ach.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{ach.name}</h4>
                      <p className="text-[10px] text-dark-450 leading-normal mt-0.5">{ach.desc}</p>
                      <span className="text-[9px] text-primary-400 font-bold block mt-1.5 uppercase tracking-wider">{ach.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Ranking Leaderboard */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <span className="text-xs font-bold text-dark-450 uppercase tracking-wider">Tabla de Posiciones (Ranking Semanal)</span>
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-dark-800 bg-dark-900/25">
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-450" /> Top Estudiantes
              </h3>
            </div>
            
            <div className="divide-y divide-dark-850">
              {rankingUsers.map(u => (
                <div key={u.rank} className={`p-4 flex items-center justify-between hover:bg-dark-900/10 transition-all ${u.rank === 3 ? 'bg-primary-500/5' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${u.rank === 1 ? 'bg-amber-500/20 text-amber-400' : u.rank === 2 ? 'bg-slate-300/25 text-slate-300' : 'bg-dark-800 text-dark-400'}`}>
                      {u.rank}
                    </span>
                    <span className={`text-xs font-semibold ${u.rank === 3 ? 'text-primary-400 font-bold' : 'text-white'}`}>{u.name}</span>
                  </div>
                  <span className="text-xs font-black text-white">{u.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificacionPage;
