import axios from 'axios';

const API_URL = 'https://turaboydeveloper.pythonanywhere.com/api'; // Replace with your API URL

axios.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.access) {
    config.headers.Authorization = 'Bearer ' + user.access;
  }
  return config;
});

class AuthService {
  
  async login(email, password) {
    try {
      const response = await axios.post(API_URL + '/auth/login/', { email, password });
      if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      // Handle or throw the error as needed
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();

  }

  async register(email, first_name, last_name, password, group) {
    try {
      const response = await axios.post(API_URL + '/auth/register/', {
        email,
        first_name,
        last_name,
        password,
        group
      });
      return response.data;
    } catch (error) {
      // Handle or throw the error as needed
      throw error;
    }
  }

  async updateUserProfile(userData) {
    try {
      const user = this.getCurrentUser();
      if (!user) {
        throw new Error("No user logged in");
      }

      // Assuming your backend expects a PUT request to update the user profile
      const response = await axios.patch(API_URL + '/auth/update-profile/', {
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        // Add other fields as needed
      });

      let userUpdated = this.getCurrentUser();
      userUpdated.email = response.data.email;
      userUpdated.first_name = response.data.first_name;
      userUpdated.last_name = response.data.last_name;

      this.saveUserData(userUpdated);

      return response.data;
    } catch (error) {
      // Handle or throw the error as needed
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      // Assuming your backend expects a POST request to initiate password reset
      const response = await axios.post(API_URL + '/auth/password-reset/', { email });
      return response.data;
    } catch (error) {
      // Handle or throw the error as needed
      throw error;
    }
  }

  async resetPassword(token, uidb64, new_password) {
    try {
      // Assuming your backend expects a POST request to reset the password
      const response = await axios.post(API_URL + '/auth/password-reset-confirm/', { 
        token: token, 
        uidb64: uidb64, 
        new_password: new_password
       });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  saveUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async getCurrentUserProfile() {
    try {
      const response = await axios.get(API_URL + '/auth/profile/'); // Replace with your API endpoint for fetching user profile
      return response.data; // Assuming the response contains user profile data
    } catch (error) {
      throw error;
    }
  }

   async getStudentGroups() {
    try {
      const response = await axios.get(`${API_URL}/auth/student-groups/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    return user && user.access ? true : false;
  }
}


const authService = new AuthService();
export default authService;
