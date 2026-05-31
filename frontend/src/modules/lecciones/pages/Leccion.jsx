import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cursoService } from '../../../services/cursoService';
import { Play, CheckSquare, Award, ArrowLeft, ChevronRight, Video } from 'lucide-react';

const Leccion = () => {
  const { cursoId, leccionId } = useParams();
  const [curso, setCurso] = useState(null);
  const [currentLeccion, setCurrentLeccion] = useState(null);

  useEffect(() => {
    cursoService.getCursoById(cursoId).then(data => {
      setCurso(data);
      if (data && data.temario) {
        // Encontrar la lección actual por ID o elegir la primera
        let found = null;
        data.temario.forEach(module => {
          const l = module.lecciones.find(lec => lec.id === leccionId);
          if (l) found = l;
        });
        setCurrentLeccion(found || data.temario[0].lecciones[0]);
      }
    });
  }, [cursoId, leccionId]);

  if (!curso || !currentLeccion) {
    return <div className="p-8 text-center text-dark-400">Cargando reproductor de lecciones...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[80vh] animate-in">
      {/* Video area (Left / Center) */}
      <div className="flex-1 flex flex-col gap-6">
        <Link to="/mi-aprendizaje" className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm font-semibold self-start">
          <ArrowLeft className="w-4 h-4" /> Volver a mis cursos
        </Link>

        {/* Video simulator container */}
        <div className="aspect-video w-full rounded-2xl bg-black flex items-center justify-center relative overflow-hidden border border-dark-900 group shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-950/20 to-accent-950/20 opacity-40" />
          <Play className="w-20 h-20 text-white/70 group-hover:scale-110 transition-transform cursor-pointer filter drop-shadow-md z-10" />
          <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-xs text-dark-400">
            <span>Video simulador - HD (1080p)</span>
            <span>{currentLeccion.duracion}</span>
          </div>
        </div>

        {/* Lesson descriptions */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-display font-black text-white">{currentLeccion.titulo}</h2>
          <span className="text-sm text-primary-400 font-medium">Curso: {curso.titulo}</span>
          <p className="text-sm text-dark-400 mt-2 leading-relaxed">
            En esta lección cubriremos los detalles conceptuales, ejemplos prácticos de desarrollo paso a paso y mejores prácticas a seguir en producción.
          </p>
        </div>
      </div>

      {/* Accordion index (Right side) */}
      <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
        <div className="glass-card p-6 flex flex-col gap-4">
          <h3 className="font-bold text-white text-base">Contenido del Curso</h3>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: '62%' }} />
          </div>
          <span className="text-xs text-dark-500 font-medium">62% completado (15/24 lecciones)</span>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[50vh]">
          {curso.temario.map((module) => (
            <div key={module.id} className="glass-card overflow-hidden">
              <div className="p-4 font-bold text-sm text-white border-b border-dark-900 bg-dark-900/30">
                {module.titulo}
              </div>
              <div className="p-2 flex flex-col gap-2">
                {module.lecciones.map((leccion) => (
                  <Link 
                    key={leccion.id} 
                    to={`/leccion/${curso.id}/${leccion.id}`}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                      leccion.id === currentLeccion.id 
                        ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30' 
                        : 'hover:bg-dark-900/30 text-dark-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Video className="w-4 h-4 shrink-0" />
                      <span className="truncate">{leccion.titulo}</span>
                    </div>
                    <span className="text-[10px] text-dark-500 shrink-0">{leccion.duracion}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leccion;
