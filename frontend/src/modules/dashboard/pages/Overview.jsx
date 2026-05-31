import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { cursoService } from '../../../services/cursoService';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  Play, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const Overview = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    cursoService.getInscritos().then(data => setCourses(data));
  }, []);

  return (
    <div className="flex flex-col gap-8 animate-in">
      {/* Welcome Banner */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-r from-primary-950/40 via-dark-900 to-accent-950/20 border-primary-500/25 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl md:text-3xl font-black text-white">
            ¡Hola de nuevo, {user?.nombre || 'Estudiante'}! 👋
          </h1>
          <p className="text-sm text-dark-400">
            Tienes un gran progreso esta semana. ¡Sigue así y obtendrás tu siguiente certificado!
          </p>
        </div>
        <Link to="/cursos" className="btn-primary flex items-center gap-2 py-2.5 text-sm shrink-0">
          Explorar Cursos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-display font-black text-white">5</span>
            <p className="text-xs text-dark-500 font-semibold uppercase tracking-wider mt-0.5">Cursos inscritos</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-display font-black text-white">42</span>
            <p className="text-xs text-dark-500 font-semibold uppercase tracking-wider mt-0.5">Lecciones completadas</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-display font-black text-white">28 hrs</span>
            <p className="text-xs text-dark-500 font-semibold uppercase tracking-wider mt-0.5">Horas de estudio</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-450">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-display font-black text-white">2</span>
            <p className="text-xs text-dark-500 font-semibold uppercase tracking-wider mt-0.5">Certificados obtenidos</p>
          </div>
        </div>
      </div>

      {/* Main content columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Continue Learning */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Continuar Aprendiendo <TrendingUp className="w-5 h-5 text-primary-400" />
          </h2>

          <div className="flex flex-col gap-4">
            {courses.map((curso) => (
              <div key={curso.id} className="glass-card-hover p-5 flex flex-col sm:flex-row gap-6 items-center">
                {/* Micro banner representation */}
                <div className={`w-full sm:w-32 h-24 rounded-xl bg-gradient-to-tr ${curso.imagenGradient} flex items-center justify-center shrink-0`}>
                  <Play className="w-8 h-8 text-white/50" />
                </div>

                <div className="flex-grow flex flex-col gap-3 w-full">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-primary-400 font-bold uppercase">{curso.categoria}</span>
                    <h3 className="font-bold text-white text-base leading-snug">{curso.titulo}</h3>
                  </div>

                  {/* Progress info */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs text-dark-400 font-medium">
                      <span>Progreso: {curso.progreso}%</span>
                      <span>{curso.leccionesCompletas}/{curso.totalLecciones} lecciones</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${curso.progreso}%` }} />
                    </div>
                  </div>
                </div>

                <Link to={`/leccion/${curso.id}/l3`} className="btn-primary py-2 px-5 text-sm shrink-0 w-full sm:w-auto text-center">
                  Continuar
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Mini stats or info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
          <div className="glass-card p-6 flex flex-col gap-6">
            <div className="flex gap-4 border-l-2 border-primary-500 pl-4 py-1">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Completaste Hook Advanced</span>
                <span className="text-xs text-dark-500 mt-1">Hace 2 horas en React Avanzado</span>
              </div>
            </div>
            <div className="flex gap-4 border-l-2 border-accent-500 pl-4 py-1">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Iniciaste Módulo 2</span>
                <span className="text-xs text-dark-500 mt-1">Ayer en API REST con Node.js</span>
              </div>
            </div>
            <div className="flex gap-4 border-l-2 border-emerald-500 pl-4 py-1">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Obtuviste Certificado HTML5</span>
                <span className="text-xs text-dark-500 mt-1">Hace 4 días en Frontend Fundamental</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
