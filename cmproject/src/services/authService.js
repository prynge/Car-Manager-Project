import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'connexion', {
        email: user.email,
        motdepasse: user.motdepasse
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'inscription', {
      email: user.email,
      motdepasse: user.motdepasse
    });
  }
}

export default new AuthService();