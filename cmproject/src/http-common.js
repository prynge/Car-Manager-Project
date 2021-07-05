import axios from "axios";

export default axios.create({
  apiBaseURL: "http://localhost:3000/api",
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json"
  }
});