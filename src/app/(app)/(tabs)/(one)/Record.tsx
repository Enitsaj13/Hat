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
import { Link } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AuditType } from "@stores/auditType";
import isEmpty from "lodash.isempty";
import { CompanyConfig } from "@stores/companyConfig";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { colors } from "@theme/index";
import { getUserTargetSettings } from "@services/getUserTargetTarget";
import { useQuery } from "react-query";

function Component({ auditTypes, companyConfig }: RecordProps) {
  const { styles } = useStyles(stylesheet);

  const [numberOpportunities, setNumberOpportunities] = useState("");
  const [auditType, setAuditType] = useState<number | undefined>();

  const { data: userTargetSettings, isLoading: isUserTargetLoading } = useQuery(
    "userTargetSettings",
    getUserTargetSettings,
  );

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
            theme={{
              colors: {
                placeholder: colors.cadetGrey,
                primary: colors.cadetGrey,
              },
            }}
            underlineColor="white"
            underlineColorAndroid={colors.cadetGrey}
            textColor="black"
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
            onPress={() => {}}
          >
            <Text variant="bodyLarge">
              {i18n.t("Y3", { defaultValue: "Begin Audit" })}
            </Text>
            <Icon name="arrowright" size={14} color="white" />
          </Button>
        </View>
        {!isUserTargetLoading && (
          <View style={styles.recordContainer}>
            <View style={styles.rowContainer}>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.t("AH2", { defaultValue: "Target Opportunities" })}
              </Text>
              <Text variant="bodyLarge" style={styles.recordText}>
                {userTargetSettings?.targetOpportunities}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.t("DL7", { defaultValue: "Balance Remaining" })}
              </Text>
              <Text variant="bodyLarge" style={styles.recordText}>
                {userTargetSettings?.balance}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.t("DL8", { defaultValue: "Complete Target By" })}
              </Text>
              <Text variant="bodyLarge" style={styles.recordText}>
                {userTargetSettings?.endDate}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.t("DL9", { defaultValue: "Last Submission On" })}
              </Text>
              <Text variant="bodyLarge" style={styles.recordText}>
                {userTargetSettings?.lastOpportunity}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.practiceButtonContainer}>
          <Link href="/PracticeMode" asChild>
            <Button mode="text" onPress={() => {}}>
              <Text style={styles.practiceButton}>
                Try on {i18n.t("H6", { defaultValue: "Practice Mode" })}
              </Text>
            </Button>
          </Link>
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
    marginTop: 20,
    width: "95%",
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 0.4,
    borderColor: colors.cadetGrey,
    height: 80,
    borderRadius: 2,
  },
  dropdownlistContainer: {
    borderWidth: 0.4,
    borderRadius: 0,
    borderColor: colors.cadetGrey,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 14,
  },
  recordButton: {
    backgroundColor: colors.bgColor,
    borderWidth: 0,
    borderRadius: 4,
    padding: 4,
    marginTop: 20,
  },
  recordContainer: {
    gap: 10,
    width: "96%",
    marginVertical: 20,
    borderWidth: 2,
    padding: 10,
    borderColor: "purple",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recordText: {
    color: "black",
  },
  practiceButtonContainer: {
    position: "absolute",
    bottom: 0,
  },
  practiceButton: {
    color: "black",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationColor: "purple",
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
