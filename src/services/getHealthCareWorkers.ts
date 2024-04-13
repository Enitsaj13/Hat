import { axiosInstance } from "@services/axios";

export interface HealthCareWorkerResponse {
  id: number;
  sort: number;
  cid: number;
  name: string;
  deleted: number;
  created_at: string; // "2024-04-01T13:34:12.000000Z"
  updated_at: string; // "2024-04-01T13:34:12.000000Z"
}

export async function getHealthCareWorkers() {
  try {
    const result =
      await axiosInstance.get<HealthCareWorkerResponse[]>("/mobile/hcw");
    return result.data;
  } catch (e) {
    console.log("error occurred while calling the logout", e);
  }
}
