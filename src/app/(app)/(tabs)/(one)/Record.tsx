import DropdownList from "@components/DropdownList";
import { AntDesign as Icon } from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import {
  ExtractedObservables,
  withObservables,
} from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AuditType } from "@stores/auditType";
import isEmpty from "lodash.isempty";
import { CompanyConfig } from "@stores/companyConfig";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";

function Component({ auditTypes, companyConfig }: RecordProps) {
  const { styles } = useStyles(stylesheet);

  const [numberOpportunities, setNumberOpportunities] = useState("");
  const [auditType, setAuditType] = useState<number | undefined>();

  return (
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
});

interface RecordProps
  extends ExtractedObservables<ReturnType<typeof getObservables>> {}

const Record = withObservables(
  ["auditTypes", "companyConfig"],
  getObservables,
)(Component);

export default Record;
