import { SendStatus, ToSendDatus } from "@stores/toSendDatus";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { sendDataToServer } from "@services/sendDataToServer";

interface DataSenderProps {
  toSendData: ToSendDatus[];
}

function Component({ toSendData }: DataSenderProps) {
  const [hasNetworkConnection, setHasNetworkConnection] = useState(true);
  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      setHasNetworkConnection(state.isInternetReachable === true);
    });
  }, []);

  useEffect(() => {
    (async () => {
      console.log("hasNetworkConnection", hasNetworkConnection);
      if (hasNetworkConnection) {
        await sendDataToServer(toSendData);
      }
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
