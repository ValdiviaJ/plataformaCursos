import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cursoService } from '../../../services/cursoService';
import { useAuth } from '../../../context/AuthContext';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  Lock,
  ArrowLeft
} from 'lucide-react';

const DetalleCurso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [curso, setCurso] = useState(null);
  const [activeTab, setActiveTab] = useState('temario');
  const [expandedModule, setExpandedModule] = useState('m1');
  const [enrolling, setEnrolling] = useState(false);

  const isDashboard = window.location.pathname.startsWith('/dashboard');
  const catalogPath = isDashboard ? '/dashboard/cursos' : '/cursos';

  useEffect(() => {
    cursoService.getCursoById(id).then(data => {
      if (data) {
        setCurso(data);
      } else {
        navigate(catalogPath);
      }
    });
  }, [id, navigate, catalogPath]);

  if (!curso) {
    return <div className="p-8 text-center text-dark-400">Cargando curso...</div>;
  }

  const handleEnroll = () => {
    if (isAuthenticated) {
      setEnrolling(true);
      cursoService.enroll(curso.id)
        .then(() => {
          navigate('/mi-aprendizaje');
        })
        .catch(err => {
          console.error(err);
          // Si ya está inscrito, igual lo redirigimos
          navigate('/mi-aprendizaje');
        })
        .finally(() => {
          setEnrolling(false);
        });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 animate-in">
      <Link to={catalogPath} className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm font-semibold self-start">
        <ArrowLeft className="w-4 h-4" /> Volver al catálogo
      </Link>

      {/* Main Banner / Hero grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Banner Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex gap-3">
            <span className="badge-primary">{curso.categoria}</span>
            <span className="badge-accent">{curso.nivel}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
            {curso.titulo}
          </h1>

          <p className="text-lg text-dark-400 leading-relaxed">
            {curso.descripcion}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-dark-300">
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white">{curso.rating}</span>
              <span className="text-dark-500">(240 ratings)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-dark-400" />
              <span>{curso.duracion} de contenido</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-5 h-5 text-dark-400" />
              <span>{curso.totalLecciones} lecciones</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-dark-900 mt-8 gap-6">
            <button 
              onClick={() => setActiveTab('temario')}
              className={`pb-4 font-semibold text-sm transition-all ${
                activeTab === 'temario' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-dark-400 hover:text-white'
              }`}
            >
              Temario del Curso
            </button>
            <button 
              onClick={() => setActiveTab('instructor')}
              className={`pb-4 font-semibold text-sm transition-all ${
                activeTab === 'instructor' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-dark-400 hover:text-white'
              }`}
            >
              Instructor
            </button>
          </div>

          {/* Tab contents */}
          <div className="mt-4">
            {activeTab === 'temario' && (
              <div className="flex flex-col gap-4">
                {curso.temario && curso.temario.length > 0 ? (
                  curso.temario.map((modulo) => (
                    <div key={modulo.id} className="glass-card overflow-hidden">
                      <button 
                        onClick={() => setExpandedModule(expandedModule === modulo.id ? '' : modulo.id)}
                        className="w-full p-5 flex items-center justify-between font-bold text-left text-white bg-dark-900/30 hover:bg-dark-900/50 transition-all border-b border-dark-900"
                      >
                        <span>{modulo.titulo}</span>
                        <ChevronRight className={`w-5 h-5 text-dark-450 transition-transform ${
                          expandedModule === modulo.id ? 'rotate-90' : ''
                        }`} />
                      </button>
                      
                      {expandedModule === modulo.id && (
                        <div className="p-4 flex flex-col gap-3 bg-dark-950/20">
                          {modulo.lecciones.map((leccion) => (
                            <div key={leccion.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-900/30 transition-all text-sm">
                              <div className="flex items-center gap-3">
                                {leccion.completada ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                ) : (
                                  <Play className="w-5 h-5 text-dark-500 shrink-0" />
                                )}
                                <span className="text-dark-200">{leccion.titulo}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-dark-500">
                                <span>{leccion.duracion}</span>
                                {!leccion.completada && <Lock className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-dark-500 text-sm">El temario de este curso se actualizará próximamente.</p>
                )}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="glass-card p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center font-black text-xl text-white shadow-glow shrink-0">
                  {curso.instructor.avatar}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white">{curso.instructor.nombre}</h3>
                  <p className="text-sm text-primary-400 font-semibold">{curso.instructor.especialidad}</p>
                  <p className="text-sm text-dark-400 mt-2 leading-relaxed">{curso.instructor.bio}</p>
                  
                  {/* Instructor stats */}
                  <div className="flex gap-6 mt-4 text-xs text-dark-500 border-t border-dark-900 pt-4">
                    <div>
                      <span className="font-bold text-white block text-sm">{curso.instructor.cursosCount}</span>
                      Cursos
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm">+{curso.instructor.estudiantesCount}</span>
                      Alumnos
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm">{curso.instructor.rating} ★</span>
                      Valoración
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar course card */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-28 flex flex-col gap-6 border-primary-500/20 bg-dark-900/40">
            {/* Visual banner */}
            <div className={`h-40 rounded-xl bg-gradient-to-tr ${curso.imagenGradient} flex items-center justify-center shadow-lg relative`}>
              <Play className="w-12 h-12 text-white/80 filter drop-shadow-md" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-black text-white">${curso.precio}</span>
                {curso.descuento > 0 && (
                  <span className="text-sm text-danger line-through">
                    ${(curso.precio * (1 + curso.descuento/100)).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-400 font-semibold">¡Ahorra {curso.descuento}% con esta inscripción hoy!</p>
            </div>

            <button 
               onClick={handleEnroll} 
               disabled={enrolling}
               className="btn-primary w-full text-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {enrolling ? 'Inscribiendo...' : 'Inscribirse Ahora'}
             </button>

            <div className="flex flex-col gap-3 text-sm text-dark-300 border-t border-dark-850 pt-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Este curso incluye:</h4>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-dark-500" />
                <span>Acceso ilimitado de por vida</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-dark-500" />
                <span>Lecciones de video HD</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-dark-500" />
                <span>Certificado de finalización oficial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCurso;
