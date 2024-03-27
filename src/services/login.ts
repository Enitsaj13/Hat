import { i18n } from "@i18n/index";
import NetInfo from "@react-native-community/netinfo";
import { axiosIntance } from "@services/axios";
import { object, string } from "yup";

import { UserJson, WorkerJson } from "../types";

export interface ILoginSchema {
  email: string;
  password: string;
}

export const loginSchema = object({
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
  password: string().required(
    i18n.t("AG32", {
      defaultValue: "Required",
    }),
  ),
});

export enum LoginStatus {
  SUCCESS,
  FAILED,
}

export interface Member {
  id: string;
  full_name: string;
}

export interface LoginResponse {
  status: number;
  errortype: string;
  errno: number;
  message: string;
  result: {
    user: UserJson;
    locations: Record<string, Record<string, WorkerJson>>;
    members: Member[];
  };
  data_privacy_url: string;
  terms_of_use_url: string;
}

export interface LoginResult {
  token?: string;
  status: LoginStatus;
  messageFromServer?: string;
  message?: string;
}

export async function login(credentials: ILoginSchema): Promise<LoginResult> {
  await loginSchema.validate(credentials); // defensive programming to ensure users of this function does not pass invalid credentials
  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    return {
      status: LoginStatus.FAILED,
      message: i18n.t("ADD31", {
        defaultValue:
          "Login: An error occurred while processing, Please try again.",
      }),
    };
  }

  try {
    const result = await axiosIntance.postForm<LoginResponse>(
      `/login`,
      credentials,
    );
    // console.log("result", result);
    const response = result.data;
    console.log("response", JSON.stringify(response));
    if (response.status === 0) {
      console.log("failed to login. should call logout here");
      // TODO clear watermelon cache and SecureStorage. caller of this function should redirect to login stack
      return {
        status: LoginStatus.FAILED,
        messageFromServer: response.message, // "Invalid email and password."
      };
    }

    // TODO save in watermelon db the stuff in the response

    return {
      status: LoginStatus.SUCCESS,
      token: response.result.user.token,
      messageFromServer: response.message,
    };
  } catch (e) {
    console.log("login error", JSON.stringify(e));
    return {
      status: LoginStatus.FAILED,
      message: i18n.t("ADD13", {
        defaultValue:
          "Login: An error occurred while processing, Please try again.",
      }),
    };
  }
}
