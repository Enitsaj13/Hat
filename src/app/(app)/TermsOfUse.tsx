import React from "react";
import { Alert, View } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { AppSetting } from "@stores/appSetting";
import { database } from "@stores/index";
import { User } from "@stores/user";
import WebView from "react-native-webview";
import { of, switchMap } from "rxjs";
import { useSession } from "src/auth";
import { approveDataPrivacy } from "@services/approveDataPrivacy";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { i18n } from "@i18n/index";

interface TermsOfUseProps {
  user: User;
  appSetting: AppSetting;
}

function Component({ user, appSetting }: TermsOfUseProps) {
  const { signOut } = useSession();
  const router = useRouter();

  const { styles } = useStyles(stylesheet);

  const handleAgree = async () => {
    let message = "";
    try {
      message = await approveDataPrivacy();
      await user.updateUserHasAcceptedAppPrivacy(true);
      router.replace("/(app)/(tabs)");
    } catch (e) {
      console.log("Error occurred while accepting app privacy", e);
      Alert.alert(i18n.t("S11", { defaultValue: "Failed" }), message);
    }
  };

  return (
    <View style={styles.container}>
      <WebView style={styles.webView} source={{ uri: appSetting.termsOfUseUrl }} />
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={signOut} style={styles.button}>
          {i18n.t("G47", {
            defaultValue: "Disagree",
          })}
        </Button>
        <Button mode="contained" onPress={handleAgree} style={styles.button}>
          {i18n.t("G48", {
            defaultValue: "Agree",
          })}
        </Button>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    padding: 10,
  },
  webView: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

type WithObservableProps = ObservableifyProps<
  TermsOfUseProps,
  "user",
  "appSetting"
>;
const TermsOfUse = withObservables(
  ["user", "appSetting"],
  (props: WithObservableProps) => ({
    user: database
      .get<User>("users")
      .query(Q.take(1))
      .observe()
      .pipe(
        switchMap((user) => (user.length > 0 ? user[0].observe() : of(null))),
      ),
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
)(Component as any); // as any here is workaround on typescript complaining between Observable<> and User, AppSetting

export default TermsOfUse;


