import { Text, View } from "react-native";
import { styles } from "@app/(app)/(tabs)/(two)/ObservationRecords/styles";
import { formatDate } from "@utils/index";
import dayjs from "dayjs";
import { i18n } from "@i18n/index";
import React from "react";

export function ObservationTitle({ dateStr }: { dateStr: string }) {
  return (
    <View style={styles.filteredDataContainer}>
      <Text style={styles.text}>
        {formatDate(dayjs(dateStr, "YYYY-MM-DD", i18n.locale).toDate())}
      </Text>
    </View>
  );
}
