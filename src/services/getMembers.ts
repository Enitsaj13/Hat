import { axiosInstance } from "@services/axios";

export interface MemberResponse {
  id: number;
  name: string;
}

export async function getMembers() {
  const result = await axiosInstance.get<MemberResponse[]>("/mobile/members");
  return result.data;
}
