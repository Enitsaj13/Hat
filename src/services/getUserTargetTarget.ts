import { axiosInstance } from "@services/axios";

interface GetUserTargetSettingResponse {
  name: string;
  target_opportunities: number;
  balance: number;
  last_opportunity?: string; // "April 13, 2024" | null
  start_date: string; // "April 13, 2024"
  end_date: string; // "April 13, 2024"
}

export interface UserTargetSettings {
  targetOpportunities: number;
  balance: number;
  lastOpportunity?: string;
  startDate: string;
  endDate: string;
}

export async function getUserTargetSettings(): Promise<UserTargetSettings> {
  const result = await axiosInstance.get<GetUserTargetSettingResponse>(
    "/mobile/user-target-settings",
  );
  const data = result.data;
  // console.log("data", data);
  return {
    targetOpportunities: data.target_opportunities,
    balance: data.balance,
    lastOpportunity: data.last_opportunity,
    startDate: data.start_date,
    endDate: data.end_date,
  };
}
