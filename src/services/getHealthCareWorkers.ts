import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";
import { Worker } from "@stores/worker";

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
  const result =
    await axiosInstance.get<HealthCareWorkerResponse[]>("/mobile/hcw");

  const workersDb = database.get<Worker>("workers");
  const workersResponse = result.data;
  console.log("workersResponse", JSON.stringify(workersResponse));
  await database.write(async () => {
    const operations: any[] = [];
    const existingWorkers = await workersDb.query().fetch();

    const existingWorkersMap = new Map<number, Worker>();
    existingWorkers.forEach((w) => existingWorkersMap.set(w.serverId, w));
    console.log("existingWorkersMap", existingWorkersMap);

    const newWorkersMap = new Map<number, HealthCareWorkerResponse>();
    workersResponse.forEach((w) => newWorkersMap.set(w.id, w));
    console.log("newWorkersMap", newWorkersMap);

    for (const [serverId, worker] of existingWorkersMap.entries()) {
      if (!newWorkersMap.has(serverId)) {
        operations.push(worker.prepareDestroyPermanently());
      }
    }

    for (const [id, workerResponse] of newWorkersMap.entries()) {
      if (!existingWorkersMap.has(id)) {
        operations.push(
          workersDb.prepareCreate((worker) => {
            worker.serverId = workerResponse.id;
            worker.name = workerResponse.name;
            worker.listOrder = workerResponse.sort;
          }),
        );
      } else {
        const existingWorker = existingWorkersMap.get(id);
        operations.push(
          existingWorker?.prepareUpdate((worker) => {
            worker.name = workerResponse.name;
            worker.listOrder = workerResponse.sort;
          }),
        );
      }
    }
    await database.batch(operations);
  });
}
