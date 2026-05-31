import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cursoService } from '../../../services/cursoService';
import { 
  ArrowRight, 
  Code, 
  Terminal, 
  Database, 
  Smartphone, 
  Layers, 
  Sparkles, 
  Star, 
  Play, 
  BookOpen, 
  Award,
  Users
} from 'lucide-react';

const Landing = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    cursoService.getCursos().then(data => setFeaturedCourses(data.slice(0, 3)));
    cursoService.getCategorias().then(data => setCategories(data));
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20 animate-in">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-10 w-[300px] h-[300px] bg-accent-500/10 rounded-full blur-3xl animate-float" />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-semibold animate-pulse-glow">
            <Sparkles className="w-3.5 h-3.5" /> ¡Aprende código moderno hoy!
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight text-white max-w-4xl">
            Domina la Programación <br />
            <span className="gradient-text">Aprende haciendo</span>
          </h1>

          <p className="text-dark-400 text-lg sm:text-xl max-w-2xl text-balance">
            Accede a cursos prácticos con proyectos reales de producción en React, Python, Node.js y la tecnología de vanguardia.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center">
            <Link to="/cursos" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center group py-3.5">
              Explorar Cursos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/registro" className="btn-secondary w-full sm:w-auto justify-center py-3.5">
              Crear Cuenta Gratis
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-16 border-t border-dark-900 pt-8 w-full">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-display font-black text-white">+10,000</span>
              <span className="text-xs text-dark-500 uppercase tracking-wider font-semibold mt-1">Estudiantes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-display font-black text-white">+200</span>
              <span className="text-xs text-dark-500 uppercase tracking-wider font-semibold mt-1">Cursos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-display font-black text-white">+50</span>
              <span className="text-xs text-dark-500 uppercase tracking-wider font-semibold mt-1">Instructores</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-display font-black text-white">4.9/5</span>
              <span className="text-xs text-dark-500 uppercase tracking-wider font-semibold mt-1">Valoración</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 w-full">
        <div className="text-center">
          <h2 className="section-title">Categorías Populares</h2>
          <p className="section-subtitle">Explora cursos agrupados por tus temas de interés preferidos.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="glass-card-hover p-6 flex flex-col items-center justify-center text-center gap-3">
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="font-bold text-sm text-white">{cat.nombre}</h3>
              <span className="text-xs text-dark-500">{cat.cursosCount} cursos</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 w-full">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="section-title">Cursos Destacados</h2>
            <p className="section-subtitle font-sans text-dark-400">Inicia hoy en los cursos más valorados y solicitados de la industria.</p>
          </div>
          <Link to="/cursos" className="hidden sm:flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors">
            Ver Todos los Cursos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((curso) => (
            <div key={curso.id} className="glass-card-hover overflow-hidden flex flex-col h-full">
              {/* Image Banner Container */}
              <div className={`h-48 bg-gradient-to-tr ${curso.imagenGradient} p-6 flex flex-col justify-between relative`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 flex justify-between items-start">
                  <span className="badge-primary">{curso.categoria}</span>
                  <span className="badge-accent">{curso.nivel}</span>
                </div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <Code className="w-12 h-12 text-white/40" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-lg text-white leading-snug hover:text-primary-400 transition-colors line-clamp-2">
                    <Link to={`/curso/${curso.id}`}>{curso.titulo}</Link>
                  </h3>
                  <p className="text-sm text-dark-400 line-clamp-2">{curso.descripcion}</p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Rating & Stats */}
                  <div className="flex items-center justify-between text-xs text-dark-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white">{curso.rating}</span>
                      <span>({curso.estudiantes} alumnos)</span>
                    </div>
                    <span>{curso.duracion}</span>
                  </div>

                  <hr className="border-dark-850" />

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-white">${curso.precio}</span>
                      {curso.descuento > 0 && (
                        <span className="text-xs text-danger line-through ml-2">
                          ${(curso.precio * (1 + curso.descuento/100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Link to={`/curso/${curso.id}`} className="btn-secondary py-1.5 px-4 text-xs font-semibold">
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 bg-dark-900/30 rounded-3xl border border-dark-900/60 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="text-primary-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Proyectos Prácticos</h3>
              <p className="text-sm text-dark-500 mt-2">No memorices teoría. Construye aplicaciones reales listas para producción en cada curso.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center shrink-0">
              <Users className="text-accent-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Instructores Expertos</h3>
              <p className="text-sm text-dark-500 mt-2">Aprende de desarrolladores profesionales y líderes técnicos que trabajan en la industria.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Award className="text-emerald-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Certificados Oficiales</h3>
              <p className="text-sm text-dark-500 mt-2">Completa el temario, aprueba los proyectos y recibe un certificado oficial para tu portafolio.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
