import { axiosInstance } from "@services/axios";

export interface SaveBatchObservationGuidResponse {
  uuid: string;
}

export async function saveBatchObservationGuid() {
  try {
    const result = await axiosInstance.post<SaveBatchObservationGuidResponse>(
      "/mobile/batch-observation-guid",
    );
    return result.data.uuid;
  } catch (e) {
    console.log("error occurred while calling the logout", e);
  }
}
