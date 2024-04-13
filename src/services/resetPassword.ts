import axios from "axios";

import { BaseResponse } from "../types";

export async function resetPassword(email: string) {
  const result = await axios
    .create()
    .post<BaseResponse>("/mobile/reset-password", { email });
  return result.data.message;
}
