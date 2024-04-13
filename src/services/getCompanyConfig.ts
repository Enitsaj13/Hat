import { axiosInstance } from "@services/axios";

export interface CompanyActionResponse {
  action_code: string;
  sort: number;
  show_flag: number;
  checked: boolean;
}

export interface CompanyConfigResponse {
  cid: number;
  indication_field_flag: number;
  obligatory_fields_flag: number;
  optional_fields_flag: number;
  enable_audit_types_flag: number;
  actions: CompanyActionResponse[];
}

export async function getCompanyConfig() {
  try {
    const result = await axiosInstance.get<CompanyConfigResponse[]>(
      "/mobile/company-config",
    );
    return result.data;
  } catch (e) {
    console.log("error occurred while calling the logout", e);
  }
}
