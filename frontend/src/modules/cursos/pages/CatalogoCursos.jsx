import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cursoService } from '../../../services/cursoService';
import { Search, Star, Code, SlidersHorizontal } from 'lucide-react';

const CatalogoCursos = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [levelFilter, setLevelFilter] = useState('Todos');
  const [categories, setCategories] = useState([]);

  const isDashboard = window.location.pathname.startsWith('/dashboard');

  useEffect(() => {
    cursoService.getCursos().then(data => {
      setCourses(data);
      setFilteredCourses(data);
    });
    cursoService.getCategorias().then(data => setCategories(data));
  }, []);

  useEffect(() => {
    let result = courses;

    if (search.trim() !== '') {
      result = result.filter(c => 
        c.titulo.toLowerCase().includes(search.toLowerCase()) ||
        c.descripcion.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== 'Todos') {
      result = result.filter(c => c.categoria === categoryFilter);
    }

    if (levelFilter !== 'Todos') {
      result = result.filter(c => c.nivel === levelFilter);
    }

    setFilteredCourses(result);
  }, [search, categoryFilter, levelFilter, courses]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 animate-in">
      {/* Title */}
      <div>
        <h1 className="section-title">Explorar Cursos</h1>
        <p className="section-subtitle">Mejora tus habilidades técnicas con nuestro catálogo interactivo.</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Buscar por título, tecnología, tags..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {/* Category Filter */}
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field py-2"
          >
            <option value="Todos">Todas las Categorías</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>

          {/* Level Filter */}
          <select 
            value={levelFilter} 
            onChange={(e) => setLevelFilter(e.target.value)}
            className="input-field py-2"
          >
            <option value="Todos">Todos los Niveles</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
      </div>

      {/* Grid count */}
      <div className="text-sm text-dark-500 font-medium">
        Mostrando {filteredCourses.length} cursos encontrados
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((curso) => (
            <div key={curso.id} className="glass-card-hover overflow-hidden flex flex-col h-full">
              {/* Image banner */}
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

              {/* Card body */}
              <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-lg text-white leading-snug hover:text-primary-400 transition-colors line-clamp-2">
                    <Link to={isDashboard ? `/dashboard/curso/${curso.id}` : `/curso/${curso.id}`}>{curso.titulo}</Link>
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
                    <Link to={isDashboard ? `/dashboard/curso/${curso.id}` : `/curso/${curso.id}`} className="btn-primary py-2 px-4 text-xs">
                      Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center flex flex-col items-center gap-4">
          <SlidersHorizontal className="w-12 h-12 text-dark-600" />
          <h3 className="text-lg font-bold text-white">No se encontraron cursos</h3>
          <p className="text-dark-500 max-w-md">Prueba cambiando los filtros de búsqueda o categoría seleccionados.</p>
          <button 
            onClick={() => { setSearch(''); setCategoryFilter('Todos'); setLevelFilter('Todos'); }}
            className="btn-secondary text-sm"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogoCursos;
