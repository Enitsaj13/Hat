import { axiosInstance } from "@services/axios";

import { BaseResponse } from "../types";

// TODO decide if this needs validation schema or simple validation if notes is not empty will suffice
export async function updateFeedbackGiven(uuid: string, notes: string) {
  try {
    const result = await axiosInstance.post<BaseResponse>(
      "/mobile/update-feedback-given",
      { uuid, notes },
    );
    return result.data.message; // TODO not sure the right response here
  } catch (e) {
    console.log("error occurred while calling the logout", e);
  }
}
