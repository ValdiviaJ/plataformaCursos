import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  BookOpen, 
  FolderPlus, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Layers, 
  Tag, 
  FileText,
  ChevronRight,
  Sparkles,
  ArrowUpDown,
  BookOpenCheck
} from 'lucide-react';

const initialCategories = [
  { id: 1, name: 'Desarrollo Web', icon: '💻', count: 12 },
  { id: 2, name: 'Desarrollo Móvil', icon: '📱', count: 8 },
  { id: 3, name: 'Data Science', icon: '🧠', count: 15 },
  { id: 4, name: 'Cloud & DevOps', icon: '☁️', count: 6 },
  { id: 5, name: 'Ciberseguridad', icon: '🔒', count: 9 },
  { id: 6, name: 'Diseño UI/UX', icon: '🎨', count: 11 }
];

const initialCourses = [
  { id: 1, titulo: 'React Avanzado: Hooks, Context y Patrones', categoria: 'Desarrollo Web', nivel: 'Avanzado', duracion: '18 horas', precio: '$49.99', status: 'published' },
  { id: 2, titulo: 'Python para Data Science y Machine Learning', categoria: 'Data Science', nivel: 'Principiante', duracion: '32 horas', precio: 'Gratuito', status: 'published' },
  { id: 3, titulo: 'Node.js & Express: Arquitectura limpia', categoria: 'Desarrollo Web', nivel: 'Intermedio', duracion: '22 horas', precio: '$39.99', status: 'draft' },
  { id: 4, titulo: 'Flutter Multiplataforma desde Cero', categoria: 'Desarrollo Móvil', nivel: 'Intermedio', duracion: '25 horas', precio: '$29.99', status: 'published' }
];

const initialUnits = [
  { id: 1, curso: 'React Avanzado', modulo: 'Módulo 1: Repaso y Fundamentos', titulo: '1.1 Bienvenido al curso', duracion: '10 min', orden: 1 },
  { id: 2, curso: 'React Avanzado', modulo: 'Módulo 1: Repaso y Fundamentos', titulo: '1.2 Advanced useState y useReducer', duracion: '25 min', orden: 2 },
  { id: 3, curso: 'React Avanzado', modulo: 'Módulo 2: Gestión de Estado', titulo: '2.1 Context API a profundidad', duracion: '30 min', orden: 3 },
  { id: 4, curso: 'Python Data Science', modulo: 'Módulo 1: Introducción a Python', titulo: '1.1 Setup del entorno con Anaconda', duracion: '15 min', orden: 1 }
];

const CursosAcademicoPage = () => {
  const { sub } = useParams(); // 'categorias', 'cursos', 'unidades'
  const [categories, setCategories] = useState(initialCategories);
  const [courses, setCourses] = useState(initialCourses);
  const [units, setUnits] = useState(initialUnits);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Categorias Actions
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('💻');
  
  // Courses Form State
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCat, setNewCourseCat] = useState('Desarrollo Web');
  const [newCourseNivel, setNewCourseNivel] = useState('Principiante');
  const [newCoursePrecio, setNewCoursePrecio] = useState('$39.99');

  // Add Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat = {
      id: Date.now(),
      name: newCatName,
      icon: newCatIcon,
      count: 0
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
  };

  // Add Course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourseTitle) return;
    const newC = {
      id: Date.now(),
      titulo: newCourseTitle,
      categoria: newCourseCat,
      nivel: newCourseNivel,
      duracion: '10 horas',
      precio: newCoursePrecio,
      status: 'draft'
    };
    setCourses([newC, ...courses]);
    setNewCourseTitle('');
    setShowAddCourse(false);
  };

  // Toggle Publish Status
  const handleTogglePublish = (id) => {
    setCourses(courses.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'published' ? 'draft' : 'published' };
      }
      return c;
    }));
  };

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header based on view */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black capitalize">{sub === 'categorias' ? 'Categorías de Cursos' : sub === 'cursos' ? 'Cursos Académicos' : 'Unidades y Lecciones'}</h1>
          <p className="text-sm text-dark-400">Administración y estructuración del contenido educativo de CodeMaster.</p>
        </div>
      </div>

      {/* Render sub-view */}
      {sub === 'categorias' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Category Panel */}
          <div className="glass-card p-6 h-fit border-primary-500/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-primary-400" /> Crear Categoría
            </h2>
            <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Nombre de Categoría</label>
                <input 
                  type="text"
                  required
                  placeholder="Ej. Inteligencia Artificial"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="input-field text-sm py-2.5 px-3"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Icono o Emoji</label>
                <select
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  className="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-dark-200 focus:outline-none focus:border-primary-500 text-sm"
                >
                  <option value="💻">💻 Computadora / Tech</option>
                  <option value="📱">📱 Celular / Mobile</option>
                  <option value="🧠">🧠 Cerebro / AI</option>
                  <option value="☁️">☁️ Nube / Cloud</option>
                  <option value="🔒">🔒 Candado / Seguridad</option>
                  <option value="🎨">🎨 Paleta / UI/UX</option>
                  <option value="📊">📊 Gráfico / Finanzas</option>
                  <option value="🎮">🎮 Control / Gaming</option>
                </select>
              </div>

              <button type="submit" className="btn-primary py-2.5 text-sm font-bold mt-2">
                Agregar Categoría
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar categorías..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-dark-800 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase())).map(cat => (
                <div key={cat.id} className="glass-card-hover p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{cat.name}</h3>
                      <p className="text-xs text-dark-500">{cat.count} Cursos asociados</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 border border-dark-700 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 border border-dark-700 rounded-lg hover:border-red-500 hover:text-red-400 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {sub === 'cursos' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar cursos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-dark-800 rounded-xl text-sm"
              />
            </div>
            <button onClick={() => setShowAddCourse(true)} className="btn-primary py-2.5 text-sm flex items-center gap-2 shrink-0">
              <Plus className="w-4 h-4" /> Crear Nuevo Curso
            </button>
          </div>

          {/* Courses Table */}
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-dark-800 bg-dark-900/40">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Curso</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Categoría</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Nivel</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Precio</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Estado</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-dark-400">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-850">
                  {courses.filter(c => c.titulo.toLowerCase().includes(searchTerm.toLowerCase())).map(course => (
                    <tr key={course.id} className="hover:bg-dark-900/10">
                      <td className="p-4 font-semibold text-white">{course.titulo}</td>
                      <td className="p-4 text-dark-300">{course.categoria}</td>
                      <td className="p-4 text-dark-300">{course.nivel}</td>
                      <td className="p-4 text-primary-400 font-bold">{course.precio}</td>
                      <td className="p-4">
                        <span className={`badge ${course.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          {course.status === 'published' ? 'Publicado' : 'Borrador'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleTogglePublish(course.id)}
                            className="text-xs border border-dark-700 py-1 px-2.5 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-all font-semibold"
                          >
                            {course.status === 'published' ? 'Ocultar' : 'Publicar'}
                          </button>
                          <button className="p-1.5 border border-dark-700 hover:border-primary-500 text-dark-400 hover:text-white rounded-lg transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 border border-dark-700 hover:border-red-500 text-dark-400 hover:text-red-400 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {sub === 'unidades' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Unit / Module */}
          <div className="glass-card p-6 h-fit">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary-400" /> Agregar Tema / Lección
            </h2>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Curso Padre</label>
                <select className="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-dark-200 text-sm">
                  {courses.map(c => <option key={c.id} value={c.titulo}>{c.titulo}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Nombre del Módulo o Unidad</label>
                <input type="text" placeholder="Ej. Módulo 3: Avanzando con GraphQL" className="input-field text-sm py-2.5 px-3" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Título de la Lección</label>
                <input type="text" placeholder="Ej. 3.1 Introducción a queries" className="input-field text-sm py-2.5 px-3" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Duración Estimada</label>
                <input type="text" placeholder="Ej. 15 min" className="input-field text-sm py-2.5 px-3" />
              </div>

              <button type="button" className="btn-primary py-2.5 text-sm font-bold mt-2">
                Crear Lección
              </button>
            </form>
          </div>

          {/* Interactive Lesson List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-primary-400" /> Estructura de Lecciones y Orden
            </h2>
            <div className="flex flex-col gap-4">
              {units.map((unit) => (
                <div key={unit.id} className="glass-card-hover p-4 flex items-center justify-between border-l-4 border-l-primary-500">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center font-bold text-white text-xs">
                      {unit.orden}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{unit.titulo}</h4>
                      <p className="text-xs text-dark-400 mt-0.5">{unit.curso} • {unit.modulo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-dark-500 font-semibold">{unit.duracion}</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 border border-dark-700 rounded hover:border-primary-500 hover:text-primary-400">
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="glass-card w-full max-w-md p-6 flex flex-col gap-4 border-primary-500/30">
            <div className="flex justify-between items-center border-b border-dark-800 pb-3">
              <h2 className="text-lg font-bold text-white">Crear Nuevo Curso</h2>
              <button onClick={() => setShowAddCourse(false)} className="text-dark-400 hover:text-white">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleAddCourse} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Título del Curso</label>
                <input 
                  type="text"
                  required
                  placeholder="Ej. Flutter Avanzado"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="input-field py-2 px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Categoría</label>
                <select
                  value={newCourseCat}
                  onChange={(e) => setNewCourseCat(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-xl text-dark-200 text-sm"
                >
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Nivel</label>
                <select
                  value={newCourseNivel}
                  onChange={(e) => setNewCourseNivel(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-xl text-dark-200 text-sm"
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Precio</label>
                <input 
                  type="text"
                  required
                  placeholder="Gratuito, $29.99, $49.99"
                  value={newCoursePrecio}
                  onChange={(e) => setNewCoursePrecio(e.target.value)}
                  className="input-field py-2 px-3 text-sm"
                />
              </div>

              <div className="flex items-center gap-3 justify-end border-t border-dark-800 pt-4 mt-2">
                <button type="button" onClick={() => setShowAddCourse(false)} className="btn-secondary py-2 px-4 text-xs font-bold">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary py-2 px-4 text-xs font-bold">
                  Guardar Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CursosAcademicoPage;
