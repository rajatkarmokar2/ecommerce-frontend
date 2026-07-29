import axios from "axios";
import env from "../constants/env";

const axiosInstance = axios.create({
  baseURL: env.apiUrl,
});

export default axiosInstance;
