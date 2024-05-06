import { SendStatus, ToSendDatus } from "@stores/toSendDatus";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";
import { Mutex } from "async-mutex";
import NetInfo from "@react-native-community/netinfo";
import { sendDataToServer } from "@services/sendDataToServer";

interface DataSenderProps {
  oldToSendData: ToSendDatus[];
}

const mutex = new Mutex();
function Component({ oldToSendData }: DataSenderProps) {
  useEffect(() => {
    (async () => {
      const release = await mutex.acquire();
      await database.write(async () => {
        const operations: any[] = [];

        for (const oldToSendDatus of oldToSendData || []) {
          // ensure that the data has not been deleted in fact
          const freshDatusFromDB = await database
            .get<ToSendDatus>("to_send_data")
            .query(Q.where("id", oldToSendDatus.id))
            .fetch();
          if (freshDatusFromDB?.length > 0) {
            operations.push(oldToSendDatus.prepareMarkAsDeleted());
          }
        }

        await database.batch(operations);
      });
      release();
    })();
  }, [oldToSendData]);
  return null;
}

type WithObservableProps = ObservableifyProps<DataSenderProps, "oldToSendData">;
const DataSender = withObservables(
  ["oldToSendData"],
  (props: WithObservableProps) => ({
    toSendData: database
      .get<ToSendDatus>("to_send_data")
      .query(
        Q.and(
          Q.where("status", Q.oneOf([SendStatus.SENT, SendStatus.DO_NOT_SEND])),
          Q.where("updated_at", new Date().getDate() - 1000 * 60 * 60 * 24),
        ),
      ),
  }),
)(Component as any); // as any here is workaround on typescript complaining between Observable<AppSetting> and AppSetting

export default DataSender;
