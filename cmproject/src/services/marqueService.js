import http from "../http-common";

import authHeader from './auth-header';

class MarqueService {
  getAll() {
    return http.get("/marques", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/marque/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/marque", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/marque/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/marque/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/tutorials`, { headers: authHeader() });
  }

  findByNom(nom) {
    return http.get(`/marque?nom=${nom}`, { headers: authHeader() });
  }
}

export default new MarqueService();