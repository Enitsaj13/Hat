export type Gender = "Male" | "Female";

export interface UserJson {
  id: number;
  cid: number;
  first_name: string;
  last_name: string;
  gender: Gender;
  phone: string;
  company: string;
  address: string;
  ip_address: string;
  username: string;
  decrypted_email: string;
  country_code: string | null;
  activation_code: string | null;
  created_on: Date;
  last_login: string;
  active: string;
  token: string;
  data_updated: string;
  date_registered: string; //"2020-09-22 22:20:36"
  region: string;
  web_privacy_accepted_flag: string;
  app_privacy_accepted_flag: string;
  group_id: string;
  expiration_date: string; // "2025-12-31"
  company_name: string;
  email: string;
}

export interface WorkerJson {
  name: string;
  id: string;
}
