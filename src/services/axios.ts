import axios from "axios";
import * as SecureStore from "expo-secure-store";
import isEmpty from "lodash.isempty";

import { BaseResponse, SecureStorageKeys } from "../types";

export const axiosIntance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 7000,
});

axiosIntance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync(SecureStorageKeys.AuthToken);
      if (!isEmpty(token)) {
        config.params["token"] = token;
      }
    } catch (e) {
      console.log(
        "error while trying to retrieve token from secure storage",
        e,
      );
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export function useAxiosResponseInterceptor(signOut: () => void) {
  axiosIntance.interceptors.response.use(
    (response) => {
      const data = response.data as BaseResponse;
      if (data.errno === 1080) {
        signOut();
        return Promise.reject(new Error("Received errno 1080, logging out..."));
      }
      return response;
    },
    (error) => {
      Promise.reject(error);
    },
  );
}
