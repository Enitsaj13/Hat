import { AntDesign as ArrowIcon } from "@expo/vector-icons";
import DropdownList, { DropDownOption } from "@components/DropdownList";
import React, { useMemo } from "react";
import { styles } from "@app/(app)/(tabs)/(one)/MainScreen/styles";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Worker } from "@stores/worker";
import { Q } from "@nozbe/watermelondb";
import { i18n } from "@i18n/index";

interface WorkerDropdownProps {
  workers?: Worker[];
  selectedWorkerServerId?: number;
  onWorkerSelected?: (serverId: number, value: string) => void;
}

function Component({
  workers,
  selectedWorkerServerId,
  onWorkerSelected,
}: WorkerDropdownProps) {
  const options: DropDownOption[] = useMemo(() => {
    return workers!.map((w) => ({ key: w.serverId, value: w.name }));
  }, [workers]);

  return (
    <DropdownList
      options={options}
      dropdownlistStyle={styles.dropdownlistContainer}
      selectedValueStyle={{ color: "white" }}
      right={<ArrowIcon name="caretdown" size={10} color="white" />}
      selectedOptionKey={selectedWorkerServerId}
      onOptionSelected={(key, value) =>
        onWorkerSelected && onWorkerSelected(key as number, value)
      }
      noOptionSelectedText={i18n.t("SELECT_HCW")}
    />
  );
}

type WithObservableProps = ObservableifyProps<WorkerDropdownProps, "workers">;
const WorkerDropdown = withObservables(
  ["workers"],
  (props: WithObservableProps) => ({
    workers: database.get<Worker>("workers").query(Q.sortBy("list_order")),
  }),
)(Component as any);

export default WorkerDropdown;
