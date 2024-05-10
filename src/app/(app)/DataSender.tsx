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
  toSendData: ToSendDatus[];
}

const mutex = new Mutex();
function Component({ toSendData }: DataSenderProps) {
  const [hasNetworkConnection, setHasNetworkConnection] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setHasNetworkConnection(state.isInternetReachable === true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      const release = await mutex.acquire();
      console.log("hasNetworkConnection", hasNetworkConnection);
      if (hasNetworkConnection) {
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
            await sendDataToServer(freshDatusFromDB);
            operations.push(
              freshDatusFromDB.prepareUpdate(
                (d) => (d.status = SendStatus.SENT),
              ),
            );
          } catch (e) {
            console.log("error while trying to send data to server", e);
            operations.push(
              freshDatusFromDB.prepareUpdate(
                (d) => (d.status = SendStatus.ERROR),
              ),
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
      }
      release();
    })();
  }, [toSendData, hasNetworkConnection]);
  return null;
}

type WithObservableProps = ObservableifyProps<DataSenderProps, "toSendData">;
const DataSender = withObservables(
  ["toSendData"],
  (props: WithObservableProps) => ({
    toSendData: database
      .get<ToSendDatus>("to_send_data")
      .query(
        Q.where("status", Q.notIn([SendStatus.SENT, SendStatus.DO_NOT_SEND])),
      ),
  }),
)(Component as any); // as any here is workaround on typescript complaining between Observable<AppSetting> and AppSetting

export default DataSender;
