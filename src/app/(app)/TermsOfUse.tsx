import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { database } from "@stores/index";
import { User } from "@stores/user";
import { of, switchMap } from "rxjs";
import { AppSetting } from "@stores/appSetting";
import WebView from "react-native-webview";
import { View } from "react-native";
import { i18n } from "@i18n/index";
import { Button } from "react-native-paper";
import React from "react";
import { useSession } from "../../auth";

export interface TermsOfUseProps {
  user: User;
  appSetting: AppSetting;
}

function Component({ user, appSetting }: TermsOfUseProps) {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <WebView style={{ flex: 1 }} source={{ uri: appSetting.termsOfUseUrl }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        <Button mode="contained" onPress={signOut}>
          {i18n.t("G48", {
            defaultValue: "Disagree",
          })}
        </Button>
        <Button mode="contained">
          {i18n.t("G47", {
            defaultValue: "Agree",
          })}
        </Button>
      </View>
    </View>
  );
}

type WithObservableProps = ObservableifyProps<TermsOfUseProps, "user">;
const TermsOfUse = withObservables(["user"], (props: WithObservableProps) => ({
  user: database
    .get<User>("user")
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
}))(Component as any); // as any here is workaround on typescript complaining between Observable<> and User, AppSetting

export default TermsOfUse;
