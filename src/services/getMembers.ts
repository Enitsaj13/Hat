import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";
import { Location } from "@stores/location";
import { LocationResponse } from "@services/getLocations";

export interface MemberResponse {
  id: number;
  name: string;
}

export async function getMembers() {
  return await axiosInstance.get<MemberResponse[]>("/mobile/members");
}
