import api from './api';

export const cursoService = {
  getCursos: () => {
    return api.get('/courses')
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching courses, using local fallback:', err);
        return [];
      });
  },

  getCursoById: (id) => {
    return api.get(`/courses/${id}`)
      .then(res => res.data)
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
        // Mapeamos las inscripciones (Enrollments) para que tengan el formato plano que espera el frontend
        return res.data.map(enrollment => ({
          ...enrollment.course,
          progreso: enrollment.progreso,
          estado: enrollment.estado,
          enrollment_id: enrollment.id
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
