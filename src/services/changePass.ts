import { i18n } from "@i18n/index";
import { Q } from "@nozbe/watermelondb";
import { database } from "@stores/index";
import { User } from "@stores/user";
import { object, string, ref } from "yup";
import axios from "axios";
import { contentTypeKey, defaultContentType } from "@services/axios";

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
        [ref("newPassword")],
        i18n.t("PASSWORD_MUST_MATCH"),
    ),
});

export enum ChangePasswordStatus {
    SUCCESS,
    FAILED,
    INCORRECT_CURRENT_PASSWORD,
}

export interface ChangePasswordResult {
    status: ChangePasswordStatus;
    message?: string;
}

export async function changePassword(credentials: IChangePasswordSchema): Promise<ChangePasswordResult> {
    await changePasswordSchema.validate(credentials);

    try {
        const tempAxiosInstance = axios.create({
            headers: {
                [contentTypeKey]: defaultContentType,
            },
        });
        const url = `${process.env.EXPO_PUBLIC_API_URL}/mobile/change-password`;
        console.log("url", url);
        const result = await tempAxiosInstance.post(url, credentials);
        console.log("result", result);

        const users = await database.get<User>("users").query(Q.take(1)).fetch();

        console.log("MEMA TAE USER", users)

        if (users.length === 0) {
            return {
                status: ChangePasswordStatus.FAILED,
                message: i18n.t("USER_NOT_FOUND", {
                    defaultValue: "User not found.",
                }),
            };
        }

        const userInDB = users[0];

        // Update the password in the local database
        await userInDB.updatePassword(credentials.newPassword);

        return {
            status: ChangePasswordStatus.SUCCESS,
            message: i18n.t("PASSWORD_CHANGED_SUCCESSFULLY", {
                defaultValue: "Password changed successfully",
            }),
        };
    } catch (e: any) {
        console.log("e", e);
        const message =
            e.response?.status === 400
                ? i18n.t("CURRENT_PASSWORD_INCORRECT", {
                    defaultValue: "Current password is incorrect.",
                })
                : i18n.t("ADD13", {
                    defaultValue: "Mema",
                });
        return {
            status: ChangePasswordStatus.FAILED,
            message,
        };
    }
}
