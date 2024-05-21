import { i18n } from "@i18n/index";
import { object, string, ref } from "yup";

import { BaseResponse } from "../types";
import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";


export interface IChangePasswordSchema {
  currentPassword: string;
  newPassword: string;
  retypePassword: string;
}

const passwordValidation = string()
  .required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  )
  .min(8, i18n.t("PASSWORD_LENGTH"))
  .matches(/[a-z]/, i18n.t("PASSWORD_MUST_HAVE_LOWERCASE"))
  .matches(/[A-Z]/, i18n.t("PASSWORD_MUST_HAVE_UPPERCASE"))
  .matches(/\d/, i18n.t("PASSWORD_MUST_HAVE_NUMBER"))
  .matches(/[!@#$%^&*(),.?":{}|<>]/, i18n.t("PASSWORD_MUST_HAVE_SPECIAL_CHAR"));


export const changePasswordSchema = object({
  currentPassword: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
  newPassword: passwordValidation,
  retypePassword: passwordValidation.oneOf(
    [ref('newPassword')],
    i18n.t("AG36", { defaultValue: "Passwords must match" })
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
