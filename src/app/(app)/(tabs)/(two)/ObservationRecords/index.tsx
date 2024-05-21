import React, { useMemo } from "react";
import { SectionList, Text, View } from "react-native";
import { i18n } from "@i18n/index";
import {
  getObservations,
  getObservationSchema,
  IGetObservationsSchema,
} from "@services/getObservations";
import dayjs from "dayjs";
import { formatDate } from "@utils/index";
import { useQuery } from "react-query";
import {
  useGetObservationsFormRef,
  useSharedLocation,
} from "@app/(app)/(tabs)/(two)/ObservationRecords/report-commons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { styles } from "@app/(app)/(tabs)/(two)/ObservationRecords/styles";
import { ObservationTitle } from "@app/(app)/(tabs)/(two)/ObservationRecords/ObservationTitle";
import ObservationItem from "@app/(app)/(tabs)/(two)/ObservationRecords/ObservationItem";
import { ActivityIndicator } from "react-native-paper";

export function ObservationRecords() {
  const formRef = useGetObservationsFormRef();
  const form = useForm<IGetObservationsSchema>({
    resolver: yupResolver(getObservationSchema as any),
    defaultValues: getObservationSchema.getDefault(),
  });
  formRef.current = form;

  const { watch } = form;
  const dateFrom = watch("dateFrom");
  const dateTo = watch("dateTo");

  // TODO issue with RHF
  // const location = watch("location");
  const [location] = useSharedLocation();

  const hcwTitle = watch("hcwTitle");
  const auditor = watch("auditor");

  const { data, isLoading } = useQuery(
    ["userTargetSettings", dateFrom, dateTo, location, hcwTitle, auditor],
    () =>
      getObservations({
        dateFrom,
        dateTo,
        location,
        hcwTitle,
        auditor,
      }),
  );
  // console.log("observation error", JSON.stringify(error));

  const observationSections = useMemo(
    () =>
      Array.from(data?.observationsByDate?.entries() || []).map((e) => {
        const [key, value] = e;
        return {
          dateStr: key,
          data: value,
        };
      }),
    [data],
  );

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.dateFilteredContainer}>
        <Text style={styles.dateText}>
          {i18n.t("S6", { defaultValue: "Date Filtered" })}{" "}
        </Text>
        {dayjs(dateFrom).isSame(dateTo, "day") ? (
          <Text style={styles.dateText}>Today</Text>
        ) : (
          <Text style={styles.dateText}>
            {formatDate(dateFrom)} to {formatDate(dateTo)}
          </Text>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>
            {i18n.t("ADD20", { defaultValue: "Total Opportunities" })}
          </Text>
          <Text style={styles.text}>{data?.summary.total_opportunities}</Text>
        </View>
        {data?.summary.hcw_opportunities.map((o, index) => (
          <View style={styles.rowContainer} key={`observation-${index}`}>
            <View style={styles.hcwTypeContainer}>
              <Text style={styles.text}>{o.label}</Text>
              <Text style={styles.text}>{o.passed}</Text>
            </View>
            <Text style={styles.text}>{o.percentage}%</Text>
          </View>
        ))}
      </View>
      <SectionList
        style={{ flex: 1 }}
        sections={observationSections}
        keyExtractor={(item) => `observation-${item.id}`}
        renderSectionHeader={({ section: { dateStr } }) => (
          <ObservationTitle dateStr={dateStr} />
        )}
        renderItem={({ item }) => <ObservationItem data={item} />}
      />
    </View>
  );
}

export default ObservationRecords;
