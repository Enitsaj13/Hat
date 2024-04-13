import axios from "axios";
import * as SecureStore from "expo-secure-store";
import isEmpty from "lodash.isempty";

import { SecureStorageKeys, SignInFunction, SignOutFunction } from "../types";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 7000,
});

const authKey = "Authorization";

function constructAuthHeader(token: string) {
  return `Bearer ${token}`;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync(SecureStorageKeys.AuthToken);
      if (!isEmpty(token)) {
        config.headers[authKey] = constructAuthHeader(token!);
      }
    } catch (e) {
      console.log(
        "error while trying to retrieve token from secure storage",
        e,
      );
      // Note: It should be impossible to get on this point
      // because the root of the app is already checking if the token is retrievable
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export function useAxiosResponseInterceptor(
  signIn: SignInFunction,
  signOut: SignOutFunction,
) {
  axiosInstance.interceptors.response.use(null, async (error) => {
    console.log("axios intercepted an error", JSON.stringify(error));
    try {
      const token = await SecureStore.getItemAsync(SecureStorageKeys.AuthToken);
      if (!isEmpty(token)) {
        const tempAxiosInstance = axios.create({
          headers: {
            [authKey]: constructAuthHeader(token!),
          },
        });
        const result = await tempAxiosInstance.post<RefreshTokenResponse>(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
        );
        signIn(result.data.access_token);
      } else {
        throw new Error(
          "Cannot call refresh token as the obtained token from secured storage is empty!",
        );
      }
    } catch (e) {
      console.log("Error occurred while refreshing the token: ", e);
      signOut();
      Promise.reject(error);
    }
  });
}
