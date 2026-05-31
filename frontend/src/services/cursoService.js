// Mock course service for frontend development

const mockCourses = [
  {
    id: 1,
    titulo: 'React Avanzado: Hooks, Context y Patrones de Diseño',
    descripcion: 'Lleva tus habilidades de React al siguiente nivel. Domina custom hooks, Context API, rendimiento, pruebas unitarias y patrones avanzados de arquitectura frontend.',
    instructor: {
      nombre: 'Carlos Mendoza',
      especialidad: 'Tech Lead & React Specialist',
      bio: 'Ex-ingeniero de software en Stripe, apasionado de la enseñanza y creador de librerías open-source.',
      avatar: 'CM',
      cursosCount: 4,
      estudiantesCount: 15420,
      rating: 4.9
    },
    categoria: 'Desarrollo Web',
    nivel: 'Avanzado',
    duracion: '18 horas',
    totalLecciones: 24,
    rating: 4.9,
    precio: 49.99,
    descuento: 20, // en %
    estudiantes: 4520,
    tags: ['React', 'JavaScript', 'Frontend', 'Arquitectura'],
    imagenGradient: 'from-blue-600 to-indigo-900',
    temario: [
      {
        id: 'm1',
        titulo: 'Módulo 1: Repaso y Fundamentos de Hooks Avanzados',
        lecciones: [
          { id: 'l1', titulo: '1.1 Bienvenido al curso', duracion: '10 min', completada: true },
          { id: 'l2', titulo: '1.2 Advanced useState y useReducer', duracion: '25 min', completada: true },
          { id: 'l3', titulo: '1.3 useRef para dom y persistencia', duracion: '18 min', completada: false }
        ]
      },
      {
        id: 'm2',
        titulo: 'Módulo 2: Gestión de Estado Avanzado',
        lecciones: [
          { id: 'l4', titulo: '2.1 Context API a profundidad', duracion: '30 min', completada: false },
          { id: 'l5', titulo: '2.2 Patrones de optimización para Context', duracion: '22 min', completada: false }
        ]
      }
    ]
  },
  {
    id: 2,
    titulo: 'Python para Data Science y Machine Learning',
    descripcion: 'Aprende Python desde las bases hasta el análisis de datos completo con Pandas, NumPy, visualización con Matplotlib/Seaborn y modelado predictivo con Scikit-Learn.',
    instructor: {
      nombre: 'Ana García',
      especialidad: 'Data Scientist & PhD in AI',
      bio: 'Investigadora de IA en Google, mentora en bootcamps internacionales y divulgadora científica.',
      avatar: 'AG',
      cursosCount: 3,
      estudiantesCount: 22100,
      rating: 4.8
    },
    categoria: 'Data Science',
    nivel: 'Principiante',
    duracion: '32 horas',
    totalLecciones: 45,
    rating: 4.8,
    precio: 59.99,
    descuento: 0,
    estudiantes: 8120,
    tags: ['Python', 'Pandas', 'Machine Learning', 'Data Science'],
    imagenGradient: 'from-emerald-600 to-teal-900',
    temario: [
      {
        id: 'm1',
        titulo: 'Módulo 1: Introducción a Python para Ciencia de Datos',
        lecciones: [
          { id: 'l1', titulo: '1.1 Setup del entorno con Anaconda', duracion: '15 min', completada: false },
          { id: 'l2', titulo: '1.2 Sintaxis básica y estructuras de datos', duracion: '35 min', completada: false }
        ]
      }
    ]
  },
  {
    id: 3,
    titulo: 'Node.js & Express: Arquitectura limpia y API REST',
    descripcion: 'Construye backends robustos, escalables y seguros con Node.js, Express y TypeScript. Integra bases de datos relacionales, autenticación y despliegue continuo.',
    instructor: {
      nombre: 'Miguel Torres',
      especialidad: 'Backend Tech Lead',
      bio: 'Arquitecto de software especializado en sistemas distribuidos y seguridad en la nube.',
      avatar: 'MT',
      cursosCount: 5,
      estudiantesCount: 18300,
      rating: 4.7
    },
    categoria: 'Desarrollo Web',
    nivel: 'Intermedio',
    duracion: '22 horas',
    totalLecciones: 30,
    rating: 4.7,
    precio: 39.99,
    descuento: 15,
    estudiantes: 3200,
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    imagenGradient: 'from-green-600 to-emerald-950',
    temario: [
      {
        id: 'm1',
        titulo: 'Módulo 1: Fundamentos de Express y Routing',
        lecciones: [
          { id: 'l1', titulo: '1.1 Estructura inicial del proyecto', duracion: '20 min', completada: false },
          { id: 'l2', titulo: '1.2 Creación de middlewares robustos', duracion: '28 min', completada: false }
        ]
      }
    ]
  },
  {
    id: 4,
    titulo: 'Flutter: Creación de Apps Móviles Multiplataforma',
    descripcion: 'Crea hermosas aplicaciones nativas para Android e iOS con una sola base de código en Dart. Gestión de estado avanzada, consumo de APIs y animaciones fluidas.',
    instructor: {
      nombre: 'Laura Sánchez',
      especialidad: 'Mobile App Developer',
      bio: 'Consultora independiente de desarrollo móvil, creadora de contenido y entusiasta de UI/UX.',
      avatar: 'LS',
      cursosCount: 2,
      estudiantesCount: 9800,
      rating: 4.8
    },
    categoria: 'Desarrollo Móvil',
    nivel: 'Principiante',
    duracion: '25 horas',
    totalLecciones: 35,
    rating: 4.8,
    precio: 29.99,
    descuento: 0,
    estudiantes: 2450,
    tags: ['Flutter', 'Dart', 'Android', 'iOS'],
    imagenGradient: 'from-cyan-600 to-blue-900',
    temario: [
      {
        id: 'm1',
        titulo: 'Módulo 1: Hola Mundo y Widgets Básicos',
        lecciones: [
          { id: 'l1', titulo: '1.1 Introducción a Flutter y Dart SDK', duracion: '12 min', completada: false },
          { id: 'l2', titulo: '1.2 Stateless vs Stateful Widgets', duracion: '30 min', completada: false }
        ]
      }
    ]
  },
  {
    id: 5,
    titulo: 'Docker & Kubernetes: Devops para Desarrolladores',
    descripcion: 'Domina los contenedores y su orquestación. Aprende a dockerizar tus aplicaciones, gestionar volúmenes, redes y a desplegarlas en clusters con Kubernetes.',
    instructor: {
      nombre: 'Diego Ramírez',
      especialidad: 'Cloud Architecture & DevOps Lead',
      bio: 'Especialista certificado en Kubernetes y AWS, encargado de migraciones en la nube a gran escala.',
      avatar: 'DR',
      cursosCount: 3,
      estudiantesCount: 11200,
      rating: 4.9
    },
    categoria: 'Cloud & DevOps',
    nivel: 'Intermedio',
    duracion: '20 horas',
    totalLecciones: 26,
    rating: 4.9,
    precio: 44.99,
    descuento: 25,
    estudiantes: 4210,
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Cloud'],
    imagenGradient: 'from-sky-600 to-indigo-950',
    temario: []
  },
  {
    id: 6,
    titulo: 'Diseño de Interfaces UI/UX Premium',
    descripcion: 'Aprende los principios del diseño de interfaces web y móviles. Domina Figma, wireframing, prototipos interactivos, testing con usuarios y diseño de sistemas.',
    instructor: {
      nombre: 'Sofía Hernández',
      especialidad: 'Lead UI/UX Designer',
      bio: 'Diseñadora de producto con 8+ años de experiencia colaborando con startups de Sillicon Valley.',
      avatar: 'SH',
      cursosCount: 2,
      estudiantesCount: 6800,
      rating: 4.8
    },
    categoria: 'Diseño UI/UX',
    nivel: 'Principiante',
    duracion: '15 horas',
    totalLecciones: 20,
    rating: 4.8,
    precio: 19.99,
    descuento: 0,
    estudiantes: 1890,
    tags: ['Figma', 'UI', 'UX', 'Diseño'],
    imagenGradient: 'from-pink-600 to-purple-950',
    temario: []
  }
];

const mockCategories = [
  { nombre: 'Desarrollo Web', cursosCount: 45, icon: '💻' },
  { nombre: 'Desarrollo Móvil', cursosCount: 28, icon: '📱' },
  { nombre: 'Data Science', cursosCount: 32, icon: '🧠' },
  { nombre: 'Cloud & DevOps', cursosCount: 21, icon: '☁️' },
  { nombre: 'Ciberseguridad', cursosCount: 18, icon: '🔒' },
  { nombre: 'Diseño UI/UX', cursosCount: 24, icon: '🎨' }
];

export const cursoService = {
  getCursos: () => {
    return Promise.resolve(mockCourses);
  },
  getCursoById: (id) => {
    const curso = mockCourses.find(c => c.id === parseInt(id));
    return Promise.resolve(curso || null);
  },
  getCategorias: () => {
    return Promise.resolve(mockCategories);
  },
  getInscritos: () => {
    // Retornar mock cursos en progreso para el dashboard
    const list = [
      {
        ...mockCourses[0],
        progreso: 62,
        leccionesCompletas: 15,
        totalLecciones: 24,
        ultimoAcceso: 'Hace 2 horas'
      },
      {
        ...mockCourses[2],
        progreso: 20,
        leccionesCompletas: 6,
        totalLecciones: 30,
        ultimoAcceso: 'Ayer'
      }
    ];
    return Promise.resolve(list);
  }
};
