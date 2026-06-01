import api from './api';

export const sendChatMessage = async (message, history = []) => {
  try {
    const response = await api.post('/chatbot', { message, history });
    return response.data.reply;
  } catch (error) {
    console.error('Error in sendChatMessage:', error);
    throw error;
  }
};
