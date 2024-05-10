import { SendStatus, ToSendDatus } from "@stores/toSendDatus";
import { axiosInstance } from "@services/axios";
import { Mutex } from "async-mutex";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";

const mutex = new Mutex();
export async function sendDataToServer(toSendData: ToSendDatus[]) {
  const release = await mutex.acquire();
  try {
    const operations: any[] = [];
    for (const datus of toSendData || []) {
      // ensure that the data has not been sent in fact
      const freshDataFromDB = await database
        .get<ToSendDatus>("to_send_data")
        .query(Q.where("id", datus.id))
        .fetch();
      if (
        freshDataFromDB?.length > 0 &&
        freshDataFromDB[0].status === SendStatus.SENT
      ) {
        continue;
      }
      const freshDatusFromDB = freshDataFromDB[0];
      try {
        await axiosInstance.post(freshDatusFromDB.url, freshDatusFromDB.body);
        operations.push(
          freshDatusFromDB.prepareUpdate((d) => (d.status = SendStatus.SENT)),
        );
      } catch (e) {
        console.log("error while trying to send data to server", e);
        operations.push(
          freshDatusFromDB.prepareUpdate((d) => (d.status = SendStatus.ERROR)),
        );
      }
    }

    try {
      await database.write(async () => {
        await database.batch(operations);
      });
    } catch (e) {
      console.log("error while trying to sync the db", e);
    }
  } finally {
    release();
  }
}
