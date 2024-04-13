import { axiosInstance } from "@services/axios";

import { BaseResponse } from "../types";

export async function approveDataPrivacy() {
  try {
    const result = await axiosInstance.post<BaseResponse>(
      "/mobile/data-privacy-data",
    );
    return result.data.message;
  } catch (e) {
    console.log("error occurred while calling the logout", e);
  }
}
