import { BaseResponse } from "../types";
import { object, string } from "yup";
import { i18n } from "@i18n/index";
import { axiosInstance } from "@services/axios";

export interface IForgotPasswordSchema {
  email: string;
}

export const forgotPasswordSchema = object({
  email: string()
    .required(
      i18n.t("AG32", {
        defaultValue: "Required",
      }),
    )
    .email(
      i18n.t("V13", {
        defaultValue: "Invalid",
      }),
    ),
});

export async function resetPassword(
  formData: IForgotPasswordSchema,
): Promise<BaseResponse> {
  console.log("formData", formData);
  const result = await axiosInstance.post<BaseResponse>(
    "/mobile/reset-password",
    formData,
  );
  return result.data;
}
