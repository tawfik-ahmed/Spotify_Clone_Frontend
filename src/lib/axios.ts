import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://spotify-clone-backend-n60u.onrender.com/api/",
  withCredentials: true,
});
