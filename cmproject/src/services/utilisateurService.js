import http from "../http-common";

import authHeader from './auth-header';

class UtilisateurService {
  getAll() {
    return http.get("/utilisateurs", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/utilisateur/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/utilisateur", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/utilisateur/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/utilisateur/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/utilisateur`, { headers: authHeader() });
  }

  findByMail(mail) {
    return http.get(`/utilisateur?mail=${mail}`, { headers: authHeader() });
  }
}

export default new UtilisateurService();