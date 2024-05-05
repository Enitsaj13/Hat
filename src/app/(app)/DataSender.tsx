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
        for (const datus of toSendData) {
          // ensure that the data has not been sent in fact
          const actualDatus = await database
            .get<ToSendDatus>("to_send_data")
            .query(Q.where("id", datus.id))
            .fetch();
          if (actualDatus[0].status === SendStatus.SENT) {
            continue;
          }

          // TODO when sent set the datus status to SENDING
          try {
            await sendDataToServer(datus);
            // TODO when sent set the datus status to SENT
          } catch (e) {
            // TODO when sent set the datus status to ERROR
            console.log("error while trying to send data to server", e);
          }
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
        Q.where(
          "status",
          Q.notIn([
            SendStatus.SENT,
            SendStatus.DO_NOT_SEND,
            SendStatus.SENDING,
          ]),
        ),
      ),
  }),
)(Component as any); // as any here is workaround on typescript complaining between Observable<AppSetting> and AppSetting

export default DataSender;
