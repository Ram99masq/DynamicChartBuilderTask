import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7122/api/kpi",
});

export default api;
