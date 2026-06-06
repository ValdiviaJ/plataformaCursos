import api from './api';

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
        return {
          ...res.data,
          imagenGradient: res.data.imagen_gradient || 'from-blue-600 to-indigo-900',
          categoria: res.data.category ? res.data.category.nombre : 'Desarrollo Web',
          instructor: { nombre: 'Instructor CodeMaster' }
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
        return res.data.map(enrollment => ({
          ...enrollment.course,
          progreso: enrollment.progreso,
          estado: enrollment.estado,
          enrollment_id: enrollment.id,
          imagenGradient: enrollment.course.imagen_gradient || 'from-blue-600 to-indigo-900',
          categoria: enrollment.course.category ? enrollment.course.category.nombre : 'Desarrollo Web',
          instructor: { nombre: 'Instructor CodeMaster' },
          totalLecciones: enrollment.course.lessons ? enrollment.course.lessons.length : 0,
          leccionesCompletas: enrollment.progress ? enrollment.progress.filter(p => p.completada).length : 0
        }));
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
