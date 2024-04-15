import { axiosInstance } from "@services/axios";

import { BaseResponse } from "../types";

export async function approveDataPrivacy() {
  let result;
  try {
    result = await axiosInstance.post<BaseResponse>(
      "/mobile/data-privacy-data",
    );
    console.log("result.data", result?.data);
    return result?.data?.message;
  } catch (e) {
    console.log(
      "error occurred while calling the approve data privacy endpoint",
      e,
    );
    return (
      result?.data?.message || "Error occurred while accepting privacy policy"
    );
  }
}
