export type Gender = "Male" | "Female";

export enum SecureStorageKeys {
  AuthToken = "AUTH_TOKEN",
}

export type SignInFunction = (token: string) => void;

export type SignOutFunction = () => void;

export interface UserJson {
  id: number;
  first_name: string;
  last_name: string;
  gender: Gender;
  phone: string;
  company: string;
  address: string;
  ip_address: string;
  country_code: string | null;
  active: number;
  created_on: number;
  last_login: number;
  data_update: number;
  date_registered: string; //"2020-09-22 22:20:36"
  region: string | null;
  web_privacy_accepted_flag: number;
  app_privacy_accepted_flag: number;
  decrypted_email: string;
}

export interface BaseResponse {
  message: string;
}

export type FieldType = "DROPDOWN" | "TOGGLE";
