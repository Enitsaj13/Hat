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

export interface FieldJson {
  id: number;
  option_id?: number;
  value?: boolean;
}

export type HhCompliance = "rub" | "missed" | "wash";
export type HhComplianceType = "Contact" | "Airborne" | "Droplet" | "";
export type Answer = "YES" | "NO" | "";
export type MaskType = "High Filtration" | "Surgical" | "Other" | "";

export function getAnswer(v?: boolean | null): Answer {
  if (v == null) {
    return "";
  }

  return v ? "YES" : "NO";
}
export interface SendObservationDataRequest {
  batch_uuid: string; // UUID
  resend_id: string; // UUID
  hcw_title: number;
  moment: number[]; //[1, 3],
  note?: string;
  location_id: number;
  hh_compliance: HhCompliance;
  hh_compliance_type: HhComplianceType;
  glove_compliance: Answer;
  gown_compliance: Answer;
  mask_compliance: Answer;
  mask_type?: MaskType;
  date_registered: number; // unix timestamp
  without_indication: boolean;
  feedback_given: boolean;
  audit_type_id: number;
  obligatory_fields: FieldJson[];
  optional_fields: FieldJson[];
}

export interface SendFeedbackRequest {
  batch_uuid: string;
  notes?: string;
}
