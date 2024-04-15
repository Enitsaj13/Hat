import DropdownList from "@components/DropdownList";
import { AntDesign as Icon } from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import {
  ExtractedObservables,
  withObservables,
} from "@nozbe/watermelondb/react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
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
import { getHealthCareWorkers } from "@services/getHealthCareWorkers";
import { getAuditTypes } from "@services/getAuditTypes";
import { useFocusEffect } from "expo-router";

async function serverCall(shouldRetry: boolean, onSuccess: () => void) {
  const result = await Promise.allSettled([
    getHealthCareWorkers(),
    getAuditTypes(),
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

function Component({ workers, auditTypes }: RecordProps) {
  const { styles } = useStyles(stylesheet);

  const [numberOpportunities, setNumberOpportunities] = useState("");
  const [auditType, setAuditType] = useState<number | undefined>();

  const hasCachedData = workers.length !== 0 || auditTypes.length !== 0;
  const [loading, setLoading] = useState(!hasCachedData);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await serverCall(!hasCachedData, () => setLoading(false));
      })();
    }, []),
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
  workers: Worker[];
  auditTypes: AuditType[];
}

const getObservables = ({ workers, auditTypes }: ObservableProps) => ({
  workers: database.get<Worker>("workers").query(),
  auditTypes: database.get<AuditType>("audit_types").query(),
});

interface RecordProps
  extends ExtractedObservables<ReturnType<typeof getObservables>> {}

const Record = withObservables(
  ["workers", "auditTypes"],
  getObservables,
)(Component);

export default Record;
