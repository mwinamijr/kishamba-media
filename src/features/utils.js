import axios from "axios";

const nodejsUrl = "http://127.0.0.1:5000";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: nodejsUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
