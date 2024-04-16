import DropdownList from "@components/DropdownList";
import { AntDesign as Icon } from "@expo/vector-icons";
import { getDefaultLanguage, i18n } from "@i18n/index";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { AppSetting } from "@stores/appSetting";
import { database } from "@stores/index";
import { colors } from "@theme/index";
import { Link } from "expo-router";
import isEmpty from "lodash.isempty";
import { useCallback, useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { of, switchMap } from "rxjs";
interface RecordProps {
  appSetting: AppSetting;
}

export const typeAudit = [
  { key: "select", value: "*Select Audit Type" },
  { key: "endemic", value: "Endemic" },
  { key: "pandemic", value: "Pandemic" },
  { key: "covid19", value: "Covid 19" },
  { key: "normal", value: "Normal" },
];

function Component({ appSetting }: RecordProps) {
  const saveSelectedLanguage = useCallback(
    async (languageCode: string) => {
      if (isEmpty(appSetting)) {
        await database.write(async () => {
          await database
            .get<AppSetting>("app_settings")
            .create((appSetting) => {
              appSetting.language = languageCode;
              appSetting.dataPrivacyUrl = "";
              appSetting.termsOfUseUrl = "";
            });
        });
      } else {
        await appSetting.saveLanguage(languageCode);
      }
    },
    [appSetting],
  );
  const { styles } = useStyles(stylesheet);

  const [numberOpportunities, setNumberOpportunities] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.recordContainer}>
          <View style={styles.rowContainer}>
            <Text variant="bodyLarge" style={styles.recordText}>
              Target Opportunies
            </Text>
            <Text variant="bodyLarge" style={styles.recordText}>
              50
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text variant="bodyLarge" style={styles.recordText}>
              Balance Remaining
            </Text>
            <Text variant="bodyLarge" style={styles.recordText}>
              50
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text variant="bodyLarge" style={styles.recordText}>
              Complete Target By
            </Text>
            <Text variant="bodyLarge" style={styles.recordText}>
              March 31, 2023
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text variant="bodyLarge" style={styles.recordText}>
              Last Submission On
            </Text>
            <Text variant="bodyLarge" style={styles.recordText}>
              50
            </Text>
          </View>
        </View>
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
          <DropdownList
            options={typeAudit}
            selectedOptionKey={getDefaultLanguage(appSetting)}
            onOptionSelected={(key) => saveSelectedLanguage(key as string)}
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
        <View style={styles.practiceButtonContainer}>
          <Link href="/PracticeMode" asChild>
            <Button
              mode="text"
              onPress={() => {
                console.log("Clicked!");
              }}
            >
              <Text style={styles.practiceButton}>Try on Practice Mode</Text>
            </Button>
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

type WithObservableProps = ObservableifyProps<RecordProps, "appSetting">;
const Record = withObservables(
  ["appSetting"],
  (props: WithObservableProps) => ({
    appSetting: database
      .get<AppSetting>("app_settings")
      .query(Q.take(1))
      .observe()
      .pipe(
        switchMap((appSettings) =>
          appSettings.length > 0 ? appSettings[0].observe() : of(null),
        ),
      ),
  }),
)(Component as any);

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  textInputContainer: {
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
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 4,
    padding: 4,
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

export default Record;
