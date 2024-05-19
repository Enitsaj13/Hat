import { i18n } from "@i18n/index";
import { object, string } from "yup";

import { BaseResponse } from "../types";
import { axiosInstance } from "@services/axios";

export interface IChangePasswordSchema {
  currentPassword: string;
  newPassword: string;
  retypePassword: string;
}

export const changePasswordSchema = object({
  currentPassword: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
  newPassword: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
  retypePassword: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
});

export async function changePassword(
  formData: IChangePasswordSchema,
): Promise<BaseResponse> {
  await changePasswordSchema.validate(formData); // defensive programming to ensure users of this function does not pass invalid credentials
  const url = `${process.env.EXPO_PUBLIC_API_URL}/mobile/change-password`;
  const toSend = {
    current_password: formData.currentPassword,
    new_password: formData.newPassword,
    retype_password: formData.retypePassword,
  };
  console.log("toSend", toSend);
  const result = await axiosInstance.post<BaseResponse>(url, toSend);
  return result.data;
}
