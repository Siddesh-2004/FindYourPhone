import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.MODEL_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosConfig;