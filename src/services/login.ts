import { i18n } from "@i18n/index";
import { Q } from "@nozbe/watermelondb";
import NetInfo from "@react-native-community/netinfo";
import { axiosIntance } from "@services/axios";
import { AppSetting } from "@stores/appSetting";
import { database } from "@stores/index";
import { User } from "@stores/user";
import { Worker } from "@stores/worker";
import { object, string } from "yup";

import { BaseResponse, UserJson, WorkerJson } from "../types";

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

export interface LoginResponse extends BaseResponse {
  result: {
    user: UserJson;
    location: {
      healthcare: Record<string, WorkerJson>;
    };
    members: Member[];
    data_privacy_url: string;
    terms_of_use_url: string;
  };
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
  user.email = userResponse.email;
  user.companyName = userResponse.company_name;
  // eslint-disable-next-line eqeqeq
  user.hasAcceptedAppPrivacy = userResponse.app_privacy_accepted_flag == "1";
}

function updateAppSetting(appSetting: AppSetting, response: LoginResponse) {
  appSetting.dataPrivacyUrl = response.result.data_privacy_url;
  appSetting.termsOfUseUrl = response.result.terms_of_use_url;
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

    await database.write(async () => {
      const operations = [];
      const users = await database.get<User>("users").query(Q.take(1)).fetch();

      const userResponse = response.result.user;
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

      const existingWorkers = await database
        .get<Worker>("workers")
        .query()
        .fetch();
      existingWorkers.forEach((worker) =>
        operations.push(worker.prepareDestroyPermanently()),
      );

      const healthcare = response.result.location.healthcare;
      const objectKeys = Object.keys(healthcare);
      objectKeys.forEach((key) => {
        operations.push(
          database.get<Worker>("workers").prepareCreate((worker) => {
            worker.serverId = healthcare[key].id;
            worker.name = healthcare[key].name;
            worker.listOrder = parseInt(key, 10);
          }),
        );
      });

      await database.batch(operations);
    });

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
