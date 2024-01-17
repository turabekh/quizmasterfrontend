import axios from 'axios';

const API_URL = 'https://turaboydeveloper.pythonanywhere.com/api'; // Replace with your API URL

axios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access) {
      config.headers.Authorization = 'Bearer ' + user.access;
    }
    return config;
  });

const SchoolService = {

  fetchDashboardData: async () => {
    try {
      const response = await axios.get(`${API_URL}/school/active-course-instances/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchQuizzesList: async () => {
    try {
      const response = await axios.get(`${API_URL}/school/active-quizzes/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchQuestionsByQuizId: async (quizId) => {
    try {
      const response = await axios.get(`${API_URL}/school/questions-by-quiz/${quizId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, 
  handleQuizSubmit: async (quizId, answers) => {
    try {
      const response = await axios.post(`${API_URL}/school/take-quiz/${quizId}/`, { answers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getGrades: async () => {
    try {
      const response = await axios.get(`${API_URL}/school/quiz-attempts-by-student/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAttemptDetail: async (attemptId) => {
    try {
      const response = await axios.get(`${API_URL}/school/quiz-attempt/${attemptId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, 
  canSubmitQuiz: async (quizId) => {
    try {
      const response = await axios.get(`${API_URL}/school/can-submit-quiz/${quizId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getQuizLeaderboard: async () => {
    try {
      const response = await axios.get(`${API_URL}/school/leaderboard/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  postQuestionFeedback: async (questionId, feedbackText) => {
    try {
      const response = await axios.post(`${API_URL}/school/question-feedback/`, { question: questionId, text: feedbackText });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTextTopicTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/school/topic-text-tasks/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTextTopicTaskByID: async (taskId) => {
    try {
      const response = await axios.get(`${API_URL}/school/topic-text-tasks/${taskId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, 
};

export default SchoolService;
