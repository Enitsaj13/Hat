import axios, { HttpStatusCode } from "axios";
import * as SecureStore from "expo-secure-store";
import isEmpty from "lodash.isempty";

import { SecureStorageKeys, SignInFunction, SignOutFunction } from "../types";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 7000,
});

const authKey = "Authorization";

export const contentTypeKey = "Content-Type";
export const defaultContentType = "application/json";

function constructAuthHeader(token: string) {
  return `Bearer ${token}`;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync(SecureStorageKeys.AuthToken);
      if (!isEmpty(token)) {
        config.headers[authKey] = constructAuthHeader(token!);
        config.headers[contentTypeKey] = defaultContentType;
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
  (error) => Promise.reject(error),
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
    const token = await SecureStore.getItemAsync(SecureStorageKeys.AuthToken);
    const originalRequest = error.config;
    if (
      !isEmpty(token) &&
      [HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(
        error.response?.status,
      ) &&
      !originalRequest._retry
    ) {
      try {
        originalRequest._retry = true;
        const tempAxiosInstance = axios.create({
          headers: {
            [authKey]: constructAuthHeader(token!),
            [contentTypeKey]: defaultContentType,
          },
        });
        const result = await tempAxiosInstance.post<RefreshTokenResponse>(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
        );
        signIn(result.data.access_token);
        axios.defaults.headers.common[authKey] = constructAuthHeader(
          result.data.access_token,
        );
        return axiosInstance(originalRequest);
      } catch (e) {
        // Auto logout kicking in
        console.log("Error occurred while refreshing the token: ", e);
        signOut();

        // delete all user-dependent data
        /*
        await database.get("users").query().destroyAllPermanently();
        await database.get("audit_types").query().destroyAllPermanently();
        await database.get("company_configs").query().destroyAllPermanently();
        await database
          .get("institution_actions")
          .query()
          .destroyAllPermanently();
        await database.get("locations").query().destroyAllPermanently();
        await database
          .get("obligatory_field_options")
          .query()
          .destroyAllPermanently();
        await database.get("obligatory_fields").query().destroyAllPermanently();
        await database
          .get("optional_field_options")
          .query()
          .destroyAllPermanently();
        await database
          .get("optional_field_options")
          .query()
          .destroyAllPermanently();
        await database.get("workers").query().destroyAllPermanently();
         */
      }
    }
    return Promise.reject(error);
  });
}
