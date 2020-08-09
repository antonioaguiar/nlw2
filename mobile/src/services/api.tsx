import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.4:3001",
  //exp://192.168.0.4:19000
});

export default api;
