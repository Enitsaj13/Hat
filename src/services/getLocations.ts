import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";
import { Location } from "@stores/location";

export interface LocationResponse {
  id: number;
  cid: number;
  name: string;
  parent_location_company?: number;
  sort: number;
  location_with_id: string;
  children?: LocationResponse[];
}

function saveLocationResponseToMap(
  response: LocationResponse,
  map: Map<number, LocationResponse>,
) {
  map.set(response.id, response);
  response?.children?.forEach((c) => saveLocationResponseToMap(c, map));
}

export async function getLocations() {
  const result = await axiosInstance.get<LocationResponse[]>(
    "/mobile/recursive-locations",
  );

  const db = database.get<Location>("locations");
  const response = result.data;
  await database.write(async () => {
    const operations: any[] = [];
    const existing = await db.query().fetch();

    const existingMap = new Map<number, Location>();
    existing.forEach((i) => existingMap.set(i.serverId, i));

    const newMap = new Map<number, LocationResponse>();
    response.forEach((i) => saveLocationResponseToMap(i, newMap));

    for (const [serverId, existing] of existingMap.entries()) {
      if (!newMap.has(serverId)) {
        operations.push(existing.prepareDestroyPermanently());
      }
    }

    for (const [id, response] of newMap.entries()) {
      if (!existingMap.has(id)) {
        operations.push(
          db.prepareCreate((newData) => {
            newData.serverId = response.id;
            newData.name = response.name;
            newData.sort = response.sort;
            newData.parentServerId = response.parent_location_company;
          }),
        );
      } else {
        const existing = existingMap.get(id);
        operations.push(
          existing?.prepareUpdate((e) => {
            e.name = response.name;
            e.sort = response.sort;
            e.parentServerId = response.parent_location_company;
          }),
        );
      }
    }

    await database.batch(operations);
  });
}
