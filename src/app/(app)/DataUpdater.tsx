import {
  ExtractedObservables,
  withObservables,
} from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuditType } from "@stores/auditType";
import { Worker } from "@stores/worker";
import { Location } from "@stores/location";
import { getHealthCareWorkers } from "@services/getHealthCareWorkers";
import { getAuditTypes } from "@services/getAuditTypes";
import { getLocations } from "@services/getLocations";
import { CompanyConfig } from "@stores/companyConfig";
import { getCompanyConfig } from "@services/getCompanyConfig";
import { ActivityIndicator } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useFocusEffect } from "expo-router";
import { getObligatoryFields } from "@services/getObligatoryFields";
import { getOptionalFields } from "@services/getOptionalFields";
import { ObligatoryField } from "@stores/obligatoryField";
import { OptionalField } from "@stores/optionalField";
import { showRetryAlert } from "@utils/showRetryAlert";

async function serverCall(shouldRetry: boolean, onSuccess: () => void) {
  const result = await Promise.allSettled([
    getCompanyConfig(), // company config + institution actions
    getAuditTypes(),
    getObligatoryFields(),
    getOptionalFields(),
    getHealthCareWorkers(),
    getLocations(),
  ]);

  console.log("server call result", result);
  if (result[0].status === "fulfilled") {
    const companyConfig = result[0].value;

    const isAuditTypeSuccess =
      !companyConfig.enableAuditTypes || result[1].status === "fulfilled";
    const isObligatoryFieldsSuccess =
      !companyConfig.enableObligatoryFields || result[2].status === "fulfilled";
    const isOptionalFieldsSuccess =
      !companyConfig.enableOptionalFields || result[3].status === "fulfilled";

    const rest = result.slice(4).map((r) => r.status === "fulfilled");

    const hasOneApiCallFailed =
      !isAuditTypeSuccess ||
      !isObligatoryFieldsSuccess ||
      !isOptionalFieldsSuccess ||
      rest.findIndex((r) => !r) >= 0;

    console.log("hasOneApiCallFailed", hasOneApiCallFailed);
    if (!shouldRetry || !hasOneApiCallFailed) {
      onSuccess();
      return;
    }
  }

  // recursively call to try again
  showRetryAlert(() => serverCall(shouldRetry, onSuccess));
}

function Component({
  auditTypesCount,
  companyConfigCount,
  obligatoryFieldsCount,
  optionalFieldsCount,
  workersCount,
  locationsCount,
}: DataUpdaterProps) {
  const { styles } = useStyles(stylesheet);
  const hasCachedData =
    companyConfigCount > 0 &&
    auditTypesCount > 0 &&
    obligatoryFieldsCount > 0 &&
    optionalFieldsCount > 0 &&
    workersCount > 0 &&
    locationsCount > 0;
  const [loading, setLoading] = useState(!hasCachedData);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await serverCall(!hasCachedData, () => setLoading(false));
      })();
    }, [hasCachedData]),
  );

  return loading ? (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <ActivityIndicator animating size="large" />
    </View>
  ) : null;
}

const stylesheet = createStyleSheet({
  container: {
    opacity: 0.75,
    backgroundColor: "silver",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 999999,
    borderColor: "red",
    borderWidth: 1,
  },
});

interface ObservableProps {
  companyConfigCount?: number;
  auditTypesCount?: number;
  obligatoryFieldsCount?: number;
  optionalFieldsCount?: number;
  workersCount?: number;
  locationsCount?: number;
}

const getObservables = (props: ObservableProps) => ({
  companyConfigCount: database
    .get<CompanyConfig>("company_configs")
    .query()
    .observeCount(),
  auditTypesCount: database
    .get<AuditType>("audit_types")
    .query()
    .observeCount(),
  obligatoryFieldsCount: database
    .get<ObligatoryField>("obligatory_fields")
    .query()
    .observeCount(),
  optionalFieldsCount: database
    .get<OptionalField>("optional_fields")
    .query()
    .observeCount(),
  workersCount: database.get<Worker>("workers").query().observeCount(),
  locationsCount: database.get<Location>("locations").query().observeCount(),
});

interface DataUpdaterProps
  extends ExtractedObservables<ReturnType<typeof getObservables>> {}

const DataUpdater = withObservables(
  [
    "auditTypesCount",
    "companyConfigCount",
    "obligatoryFieldsCount",
    "optionalFieldsCount",
    "workersCount",
    "locationsCount",
  ],
  getObservables,
)(Component);

export default DataUpdater;
