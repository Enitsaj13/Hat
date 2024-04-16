import DropdownList from "@components/DropdownList";
import { AntDesign as Icon } from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import {
  ExtractedObservables,
  withObservables,
} from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { useCallback, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AuditType } from "@stores/auditType";
import { Worker } from "@stores/worker";
import { Location } from "@stores/location";
import { getHealthCareWorkers } from "@services/getHealthCareWorkers";
import { getAuditTypes } from "@services/getAuditTypes";
import { useFocusEffect } from "expo-router";
import isEmpty from "lodash.isempty";
import { getLocations } from "@services/getLocations";
import { CompanyConfig } from "@stores/companyConfig";
import { InstitutionAction } from "@stores/institutionAction";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { getCompanyConfig } from "@services/getCompanyConfig";

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
  auditTypes,
  companyConfig,

  workersCount,
  locationsCount,
  institutionActionsCount,
}: RecordProps) {
  const { styles } = useStyles(stylesheet);

  const [numberOpportunities, setNumberOpportunities] = useState("");
  const [auditType, setAuditType] = useState<number | undefined>();

  const hasCachedData =
    !isEmpty(auditTypes) &&
    !isEmpty(companyConfig) &&
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

  return (
    <View style={{ flex: 1, position: "relative" }}>
      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { opacity: 0.75, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <ActivityIndicator animating size="large" />
        </View>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              keyboardType="numeric"
              label={i18n.t("Y2", {
                defaultValue: "Number of Opportunities for this Audit:",
              })}
              value={numberOpportunities}
              onChangeText={(text) => setNumberOpportunities(text)}
              contentStyle={styles.textInput}
              theme={{ colors: { primary: "#475569" } }}
              textColor="#020617"
            />
            {isEmpty(companyConfig) || companyConfig.enableAuditTypes ? (
              <DropdownList
                options={auditTypes.map((a) => ({
                  key: a.serverId,
                  value: a.name,
                }))}
                onOptionSelected={(key) => setAuditType(key as number)}
                selectedOptionKey={auditType}
                dropdownlistStyle={styles.dropdownlistContainer}
                right={<Icon name="caretdown" size={12} color="gray" />}
              />
            ) : null}
            <Button
              mode="outlined"
              style={styles.recordButton}
              onPress={() => {
                console.log("Clicked!");
              }}
            >
              <Text variant="bodyLarge">
                {i18n.t("Y3", { defaultValue: "Begin Audit" })}
              </Text>
              <Icon name="arrowright" size={14} color="white" />
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  textInputContainer: {
    width: "95%",
    marginTop: 40,
  },
  textInput: {
    height: 80,
    backgroundColor: "white",
    borderWidth: 0.2,
    borderRadius: 2,
    borderColor: "#94a3b8",
  },
  dropdownlistContainer: {
    borderWidth: 0.2,
    borderRadius: 0,
    borderColor: "gray",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 14,
  },
  recordButton: {
    backgroundColor: "#01b482",
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 4,
    padding: 4,
  },
});

interface ObservableProps {
  auditTypes: AuditType[];
  companyConfig?: CompanyConfig | undefined;

  workersCount: number;
  locationsCount: number;
  institutionActionsCount: number;
}

const getObservables = (props: ObservableProps) => ({
  auditTypes: database.get<AuditType>("audit_types").query(),
  companyConfig: database
    .get<CompanyConfig>("company_configs")
    .query(Q.take(1))
    .observe()
    .pipe(
      switchMap((companyConfig) =>
        companyConfig.length > 0 ? companyConfig[0].observe() : of(null),
      ),
    ),

  workersCount: database.get<Worker>("workers").query().observeCount(),
  locationsCount: database.get<Location>("locations").query().observeCount(),
  institutionActionsCount: database
    .get<InstitutionAction>("institution_actions")
    .query()
    .observeCount(),
});

interface RecordProps
  extends ExtractedObservables<ReturnType<typeof getObservables>> {}

const Record = withObservables(
  [
    "auditTypes",
    "companyConfig",
    "workersCount",
    "locationsCount",
    "institutionActionsCount",
  ],
  getObservables,
)(Component);

export default Record;
