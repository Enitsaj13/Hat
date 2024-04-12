import Introduction from "@components/Introduction";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { AppSetting } from "@stores/appSetting";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import isEmpty from "lodash.isempty";
import { i18n } from "@i18n/index";

interface IntroductionScreenProps {
  appSetting: AppSetting;
}

function Component({ appSetting }: IntroductionScreenProps) {
  const router = useRouter();
  return (
    <SafeAreaView style={stylesheet.container}>
      <Introduction />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          mode="contained"
          onPress={async () => {
            if (isEmpty(appSetting)) {
              await database.write(async () => {
                await database
                  .get<AppSetting>("app_settings")
                  .create((appSetting) => {
                    appSetting.isIntroductionViewed = true;
                  });
              });
              router.replace("/SignIn");
            } else {
              await appSetting.updateIntroductionViewed(true);
              router.replace("/SignIn");
            }
          }}
          style={{ backgroundColor: "#047857", borderRadius: 4 }}
          labelStyle={{ color: "white" }}
        >
          {i18n.t("R4", {
            defaultValue: "Continue",
          })}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});

type WithObservableProps = ObservableifyProps<
  IntroductionScreenProps,
  "appSetting"
>;
const IntroductionScreen = withObservables(
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
)(Component as any); // as any here is workaround on typescript complaining between Observable<AppSetting> and AppSetting

export default IntroductionScreen;
