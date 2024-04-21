import { i18n } from "@i18n/index";
import { number, object, string } from "yup";

import { BaseResponse } from "../types";
import { axiosInstance } from "@services/axios";

export interface ISubscribeNowSchema {
  name: string;
  contactNumber: string;
  email: string;
  designation: string;
  department: string;
  hospital: string;
  numberOfBeds?: number;
  address: string;
  country: string;
}

export const subcribeNowSchema = object({
  name: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
  contactNumber: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
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
  designation: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
  department: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
  hospital: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
  numberOfBeds: number(),
  address: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
  country: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
});

export async function subscribeNow(
  formData: ISubscribeNowSchema,
): Promise<BaseResponse> {
  await subcribeNowSchema.validate(formData); // defensive programming to ensure users of this function does not pass invalid credentials
  const url = `${process.env.EXPO_PUBLIC_API_URL}/mobile/send-message`;
  const toSend = {
    name: formData.name,
    contact_no: formData.contactNumber,
    email: formData.email,
    designation: formData.designation,
    department: formData.department,
    hospital: formData.hospital,
    address: formData.address,
    country: formData.country,
  };
  console.log("toSend", toSend);
  const result = await axiosInstance.post<BaseResponse>(url, toSend);
  return result.data;
}
