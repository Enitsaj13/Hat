import { i18n } from "@i18n/index";
import {
  ExtractedObservables,
  withObservables,
} from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { AuditType } from "@stores/auditType";
import { Worker } from "@stores/worker";
import { Location } from "@stores/location";
import { getHealthCareWorkers } from "@services/getHealthCareWorkers";
import { getAuditTypes } from "@services/getAuditTypes";
import { useFocusEffect } from "expo-router";
import { getLocations } from "@services/getLocations";
import { CompanyConfig } from "@stores/companyConfig";
import { InstitutionAction } from "@stores/institutionAction";
import { getCompanyConfig } from "@services/getCompanyConfig";
import { ActivityIndicator } from "react-native-paper";

async function serverCall(shouldRetry: boolean, onSuccess: () => void) {
  const result = await Promise.allSettled([
    getHealthCareWorkers(),
    getAuditTypes(),
    getLocations(),
    getCompanyConfig(), // company config + institution actions
  ]);
  console.log("server call result", result);
  if (result.findIndex((r) => r.status === "rejected") >= 0 && shouldRetry) {
    Alert.alert(
      i18n.t("S11", {
        defaultValue: "Failed",
      }),
      i18n.t("ADD25", {
        defaultValue:
          "Your device is offline. Check connectivity settings or move to a new location with stable Internet connection.",
      }),
      [
        {
          text: "OK",
          onPress: () => serverCall(shouldRetry, onSuccess), // recursively call to try again
        },
      ],
    );
  }
}

function Component({
  auditTypesCount,
  companyConfigCount,
  workersCount,
  locationsCount,
  institutionActionsCount,
}: DataUpdaterProps) {
  const hasCachedData =
    auditTypesCount > 0 &&
    companyConfigCount > 0 &&
    workersCount > 0 &&
    locationsCount > 0 &&
    institutionActionsCount > 0;
  const [loading, setLoading] = useState(!hasCachedData);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await serverCall(!hasCachedData, () => setLoading(false));
      })();
    }, [hasCachedData]),
  );

  return loading ? (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          opacity: 0.75,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        },
      ]}
    >
      <ActivityIndicator animating size="large" />
    </View>
  ) : null;
}

interface ObservableProps {
  auditTypesCount?: number;
  companyConfigCount?: number;
  workersCount?: number;
  locationsCount?: number;
  institutionActionsCount?: number;
}

const getObservables = (props: ObservableProps) => ({
  auditTypesCount: database
    .get<AuditType>("audit_types")
    .query()
    .observeCount(),
  companyConfigCount: database
    .get<CompanyConfig>("company_configs")
    .query()
    .observeCount(),
  workersCount: database.get<Worker>("workers").query().observeCount(),
  locationsCount: database.get<Location>("locations").query().observeCount(),
  institutionActionsCount: database
    .get<InstitutionAction>("institution_actions")
    .query()
    .observeCount(),
});

interface DataUpdaterProps
  extends ExtractedObservables<ReturnType<typeof getObservables>> {}

const DataUpdater = withObservables(
  [
    "auditTypesCount",
    "companyConfigCount",
    "workersCount",
    "locationsCount",
    "institutionActionsCount",
  ],
  getObservables,
)(Component);

export default DataUpdater;
