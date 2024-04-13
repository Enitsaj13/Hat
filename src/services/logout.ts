import { axiosInstance } from "@services/axios";

import { BaseResponse } from "../types";

export async function logout() {
  try {
    const result = await axiosInstance.post<BaseResponse>("/auth/logout");
    return result.data.message;
  } catch (e) {
    console.log("error occurred while calling the logout", e);
  }
}
