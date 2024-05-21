import { AntDesign as Icon } from "@expo/vector-icons";
import DropdownList, { DropDownOption } from "@components/DropdownList";
import React, { useMemo } from "react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Worker } from "@stores/worker";
import { Q } from "@nozbe/watermelondb";
import { i18n } from "@i18n/index";
import { styles } from "@app/(app)/(tabs)/(two)/FilterReport/styles";

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
      selectedValueStyle={styles.selectedValue}
      right={
        <Icon
          name="caretdown"
          size={10}
          style={styles.arrowIcon}
          color="gray"
        />
      }
      selectedOptionKey={selectedWorkerServerId}
      onOptionSelected={(key, value) =>
        onWorkerSelected && onWorkerSelected(key as number, value)
      }
      noOptionSelectedText={i18n.t("T12", { defaultValue: "All" })}
      allowNullKeySelection
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
