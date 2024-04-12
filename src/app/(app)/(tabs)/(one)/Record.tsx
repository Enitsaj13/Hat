import DropdownList from "@components/DropdownList";
import { AntDesign as Icon } from "@expo/vector-icons";
import { getDefaultLanguage, i18n } from "@i18n/index";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { AppSetting } from "@stores/appSetting";
import { database } from "@stores/index";
import isEmpty from "lodash.isempty";
import { useCallback, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
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

export default Record;
