import api from './api';

export const claseService = {
  getActiveClass: () => {
    return api.get('/live-class/active')
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching active live class:', err);
        return null;
      });
  },

  startClass: (courseId, titulo) => {
    return api.post('/live-class/start', { course_id: courseId, titulo })
      .then(res => res.data);
  },

  endClass: () => {
    return api.post('/live-class/end')
      .then(res => res.data);
  },

  getChat: (classId) => {
    return api.get(`/live-class/${classId}/chat`)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching chat messages:', err);
        return [];
      });
  },

  postChatMessage: (classId, message) => {
    return api.post(`/live-class/${classId}/chat`, { message })
      .then(res => res.data);
  },

  getRecordings: () => {
    return api.get('/live-class/recordings')
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching recordings, returning local mock:', err);
        return [];
      });
  }
};
