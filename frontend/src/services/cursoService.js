import api from './api';

const groupLessonsIntoTemario = (lessons, progressData = []) => {
  if (!lessons || !Array.isArray(lessons)) return [];
  
  const completedLessonIds = Array.isArray(progressData)
    ? progressData.filter(p => p.completada).map(p => String(p.lesson_id))
    : [];

  const modulesMap = {};
  lessons.forEach(lesson => {
    const moduleTitle = lesson.modulo_titulo || 'Módulo General';
    if (!modulesMap[moduleTitle]) {
      modulesMap[moduleTitle] = {
        id: `mod-${moduleTitle.replace(/\s+/g, '-').toLowerCase()}`,
        titulo: moduleTitle,
        lecciones: []
      };
    }
    modulesMap[moduleTitle].lecciones.push({
      id: String(lesson.id),
      titulo: lesson.titulo,
      duracion: lesson.duracion || '10 min',
      completada: completedLessonIds.includes(String(lesson.id))
    });
  });
  
  return Object.values(modulesMap);
};

export const cursoService = {
  getCursos: () => {
    return api.get('/courses')
      .then(res => {
        return res.data.map(curso => ({
          ...curso,
          imagenGradient: curso.imagen_gradient || 'from-blue-600 to-indigo-900',
          categoria: curso.category ? curso.category.nombre : 'Desarrollo Web',
          instructor: { nombre: 'Instructor CodeMaster' }
        }));
      })
      .catch(err => {
        console.error('Error fetching courses, using local fallback:', err);
        return [];
      });
  },

  getCursoById: (id) => {
    return api.get(`/courses/${id}`)
      .then(res => {
        if (!res.data) return null;
        // Group lessons into temario format
        const temario = groupLessonsIntoTemario(res.data.lessons);
        const firstLessonId = res.data.lessons && res.data.lessons.length > 0
          ? String(res.data.lessons[0].id)
          : '1';
          
        return {
          ...res.data,
          imagenGradient: res.data.imagen_gradient || 'from-blue-600 to-indigo-900',
          categoria: res.data.category ? res.data.category.nombre : 'Desarrollo Web',
          instructor: { 
            nombre: 'Instructor CodeMaster',
            avatar: 'IC',
            especialidad: 'Tech Lead & Senior Developer',
            bio: 'Más de 10 años desarrollando software empresarial e instruyendo a miles de programadores en tecnologías modernas.',
            cursosCount: 12,
            estudiantesCount: '45,000',
            rating: '4.9'
          },
          temario: temario,
          firstLessonId: firstLessonId,
          totalLecciones: res.data.lessons ? res.data.lessons.length : 0
        };
      })
      .catch(err => {
        console.error(`Error fetching course ${id}, using local fallback:`, err);
        return null;
      });
  },

  getCategorias: () => {
    return api.get('/categories')
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching categories, using local fallback:', err);
        return [];
      });
  },

  getInscritos: () => {
    return api.get('/my-learning')
      .then(res => {
        // Mapeamos las inscripciones (Enrollments) para que tengan el formato que espera el frontend
        return res.data.map(enrollment => {
          const firstId = enrollment.course.lessons && enrollment.course.lessons.length > 0
            ? String(enrollment.course.lessons[0].id)
            : '1';
            
          return {
            ...enrollment.course,
            progreso: enrollment.progreso,
            estado: enrollment.estado,
            enrollment_id: enrollment.id,
            imagenGradient: enrollment.course.imagen_gradient || 'from-blue-600 to-indigo-900',
            categoria: enrollment.course.category ? enrollment.course.category.nombre : 'Desarrollo Web',
            instructor: { nombre: 'Instructor CodeMaster' },
            firstLessonId: firstId,
            totalLecciones: enrollment.course.lessons ? enrollment.course.lessons.length : 0,
            leccionesCompletas: enrollment.progress ? enrollment.progress.filter(p => p.completada).length : 0
          };
        });
      })
      .catch(err => {
        console.error('Error fetching my-learning, using local fallback:', err);
        return [];
      });
  },

  enroll: (cursoId) => {
    return api.post(`/courses/${cursoId}/enroll`)
      .then(res => res.data);
  },

  completeLesson: (lessonId) => {
    return api.post(`/lessons/${lessonId}/complete`)
      .then(res => res.data);
  }
};
