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
import Introduction from "@components/Introduction";
import { colors } from "@theme/index";

interface IntroductionScreenProps {
  appSetting: AppSetting;
}

function Component({ appSetting }: IntroductionScreenProps) {
  const router = useRouter();

  const handleContinue = async () => {
    if (isEmpty(appSetting)) {
      await database.write(async () => {
        await database.get<AppSetting>("app_settings").create((newAppSetting) => {
          newAppSetting.isIntroductionViewed = true;
        });
      });
    } else {
      await appSetting.updateIntroductionViewed(true);
    }
    router.replace("/SignIn");
  };

  return (
    <SafeAreaView style={stylesheet.container}>
      <Introduction />
      <View style={stylesheet.centeredView}>
        <Button
          mode="contained"
          onPress={handleContinue}
          style={stylesheet.continueButton}
          labelStyle={stylesheet.continueButtonText}
        >
          {i18n.t("R4", {
            defaultValue: "Continue",
          })}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    backgroundColor: colors.bgColor,
    borderRadius: 4,
  },
  continueButtonText: {
    color: "white",
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



