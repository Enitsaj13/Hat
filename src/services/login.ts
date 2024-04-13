import { i18n } from "@i18n/index";
import { Q } from "@nozbe/watermelondb";
import NetInfo from "@react-native-community/netinfo";
import { AppSetting } from "@stores/appSetting";
import { database } from "@stores/index";
import { User } from "@stores/user";
import { object, string } from "yup";

import { UserJson } from "../types";
import axios from "axios";

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

export interface LoginResponse {
  user: UserJson;
  data_privacy_url: string;
  terms_of_use_url: string;
  permissions: string[];
  access_token: string;
}

export interface LoginResult {
  token?: string;
  status: LoginStatus;
  messageFromServer?: string;
  message?: string;
}

function updateUser(user: User, userResponse: UserJson) {
  user.firstName = userResponse.first_name;
  user.lastName = userResponse.last_name;
  user.email = userResponse.decrypted_email;
  user.companyName = userResponse.company;
  user.hasAcceptedAppPrivacy = userResponse.app_privacy_accepted_flag === 1;
}

function updateAppSetting(appSetting: AppSetting, response: LoginResponse) {
  appSetting.dataPrivacyUrl = response.data_privacy_url;
  appSetting.termsOfUseUrl = response.terms_of_use_url;
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
    const tempAxiosInstance = axios.create();
    const url = `${process.env.EXPO_PUBLIC_API_URL}/mobile/login`;
    console.log("url", url);
    const result = await tempAxiosInstance.post<LoginResponse>(
      url,
      credentials,
    );
    // console.log("result", result);
    const response = result.data;
    console.log("response", JSON.stringify(response));

    await database.write(async () => {
      const operations = [];
      const users = await database.get<User>("users").query(Q.take(1)).fetch();

      const userResponse = response.user;
      if (users.length === 0) {
        operations.push(
          database
            .get<User>("users")
            .prepareCreate((user) => updateUser(user, userResponse)),
        );
      } else {
        const userInDB = users[0];
        operations.push(
          userInDB.prepareUpdate((user) => updateUser(user, userResponse)),
        );
      }

      const appSettings = await database
        .get<AppSetting>("app_settings")
        .query(Q.take(1))
        .fetch();
      if (appSettings.length === 0) {
        operations.push(
          database
            .get<AppSetting>("app_settings")
            .prepareCreate((appSetting) =>
              updateAppSetting(appSetting, response),
            ),
        );
      } else {
        const appSetting = appSettings[0];
        operations.push(
          appSetting.prepareUpdate((appSetting) =>
            updateAppSetting(appSetting, response),
          ),
        );
      }

      await database.batch(operations);
    });

    return {
      status: LoginStatus.SUCCESS,
      token: response.access_token,
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
