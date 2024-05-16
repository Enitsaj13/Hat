import { RawDatus } from "@services/getObservations";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { styles } from "@app/(app)/(tabs)/(two)/ObservationRecords/styles";
import { Entypo as Icon } from "@expo/vector-icons";
import { colors } from "@theme/index";
import React from "react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { AppSetting } from "@stores/appSetting";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { Worker } from "@stores/worker";
import dayjs from "dayjs";
import { i18n } from "@i18n/index";
import isEmpty from "lodash.isempty";

export interface ObservationItemProps {
  data: RawDatus;
  worker?: Worker;
}

function hasMoment(data: string) {
  return !isEmpty(data);
}
function Component({ data, worker }: ObservationItemProps) {
  const moments = [];
  if (hasMoment(data.moment1)) {
    moments.push(1);
  }

  if (hasMoment(data.moment2)) {
    moments.push(2);
  }

  if (hasMoment(data.moment3)) {
    moments.push(3);
  }

  if (hasMoment(data.moment4)) {
    moments.push(4);
  }

  if (hasMoment(data.moment5)) {
    moments.push(5);
  }

  return (
    <TouchableOpacity
      onPress={() => router.navigate("Reports")}
      style={styles.hcwTypeFiltered}
    >
      <View style={styles.hcwFilteredContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{worker?.name}</Text>
          <View style={styles.dateRowContainer}>
            <Text style={styles.grayText}>
              {dayjs(
                data.created_timestamp,
                "YYYY-MM-DD hh:mm AA",
                i18n.locale,
              ).format("LTS")}
            </Text>
            <Text style={styles.grayText}>| Moments {moments.join(" ")} </Text>
            <Text style={styles.grayText}>
              |{" "}
              {data.hh_compliance !== "missed"
                ? i18n.t("S10", { defaultValue: "PASSED" })
                : i18n.t("S11", { defaultValue: "FAILED" })}
            </Text>
          </View>
        </View>
      </View>
      <Icon name="chevron-thin-right" size={14} color={colors.steelGrey} />
    </TouchableOpacity>
  );
}

type WithObservableProps = ObservableifyProps<ObservationItemProps, "worker">;
const ObservationItem = withObservables(
  ["data"],
  (props: WithObservableProps) => ({
    worker: database
      .get<AppSetting>("workers")
      .query(Q.where("serverId", props.data.hcw_title), Q.take(1))
      .observe()
      .pipe(
        switchMap((workers) =>
          workers.length > 0 ? workers[0].observe() : of(null),
        ),
      ),
  }),
)(Component as any);

export default ObservationItem;
