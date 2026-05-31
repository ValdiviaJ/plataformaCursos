import React, { useEffect, useState } from 'react';
import { cursoService } from '../../../services/cursoService';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Play, MoreVertical } from 'lucide-react';

const MiAprendizaje = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('progreso');

  useEffect(() => {
    cursoService.getInscritos().then(data => setEnrolledCourses(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="section-title">Mi Aprendizaje</h1>
        <p className="section-subtitle">Continúa tus lecciones donde te quedaste.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-dark-900 gap-6">
        <button 
          onClick={() => setActiveTab('progreso')}
          className={`pb-4 font-semibold text-sm transition-all ${
            activeTab === 'progreso' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-dark-400 hover:text-white'
          }`}
        >
          En Progreso ({enrolledCourses.length})
        </button>
        <button 
          onClick={() => setActiveTab('completado')}
          className={`pb-4 font-semibold text-sm transition-all ${
            activeTab === 'completado' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-dark-400 hover:text-white'
          }`}
        >
          Completados (0)
        </button>
      </div>

      {/* Course Grid */}
      {activeTab === 'progreso' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((curso) => (
            <div key={curso.id} className="glass-card-hover overflow-hidden flex flex-col h-full">
              {/* Thumbnail banner */}
              <div className={`h-40 bg-gradient-to-tr ${curso.imagenGradient} p-4 flex flex-col justify-between relative`}>
                <div className="absolute inset-0 bg-black/10" />
                <span className="badge-primary self-start">{curso.categoria}</span>
                <Play className="w-10 h-10 text-white/50 self-center" />
              </div>

              {/* Progress details */}
              <div className="p-5 flex flex-col gap-4 flex-grow justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-white text-base leading-snug hover:text-primary-400 transition-colors line-clamp-2">
                    <Link to={`/curso/${curso.id}`}>{curso.titulo}</Link>
                  </h3>
                  <span className="text-xs text-dark-500">Instructor: {curso.instructor.nombre}</span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Progress bar */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-dark-400 font-semibold">
                      <span>Progreso</span>
                      <span>{curso.progreso}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${curso.progreso}%` }} />
                    </div>
                  </div>

                  <hr className="border-dark-850" />

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={`/leccion/${curso.id}/l3`} className="btn-primary w-full text-center py-2 text-xs font-semibold">
                      Continuar Curso
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center flex flex-col items-center gap-4">
          <BookOpen className="w-12 h-12 text-dark-600" />
          <h3 className="text-lg font-bold text-white">No tienes cursos completados</h3>
          <p className="text-dark-500 max-w-md">¡Completa todos los módulos de tus cursos activos para desbloquear tus certificados!</p>
        </div>
      )}
    </div>
  );
};

export default MiAprendizaje;
