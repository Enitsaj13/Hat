import { axiosInstance } from "@services/axios";

export interface SaveBatchObservationGuidResponse {
  uuid: string;
}

export async function createBatchObservationGuid() {
  const result = await axiosInstance.post<SaveBatchObservationGuidResponse>(
    "/mobile/batch-observation-guid",
  );
  return result.data.uuid;
}
