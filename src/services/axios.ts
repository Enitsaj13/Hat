import axios from "axios";

export const axiosIntance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 7000,
  // headers: {}
});
