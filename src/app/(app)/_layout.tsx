import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

import { useSession } from "../../auth";

import { useAxiosResponseInterceptor } from "@services/axios";

import { AppSetting } from "@stores/appSetting";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { User } from "@stores/user";
import { i18n } from "@i18n/index";
import { View } from "react-native";
import DataUpdater from "@app/(app)/DataUpdater";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

interface RootLayoutProps {
  user: User;
  appSetting: AppSetting;
}

function Component({ user, appSetting }: RootLayoutProps) {
  const { session, isLoading, signIn, signOut } = useSession();

  useAxiosResponseInterceptor(signIn, signOut);

  useEffect(() => {
    console.log("isLoading", isLoading);
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  console.log("session in (app)/_layout", session);
  const router = useRouter();
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!session) {
      const toRedirect = appSetting?.isIntroductionViewed
        ? "/SignIn"
        : "/IntroductionOnceOnly";
      router.replace(toRedirect);
    } else if (!user?.hasAcceptedAppPrivacy) {
      router.replace("/(app)/TermsOfUse");
    }
  }, [
    isLoading,
    session,
    user?.hasAcceptedAppPrivacy,
    appSetting?.isIntroductionViewed,
  ]);

  if (isLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <DataUpdater />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerTitle: "",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="TermsOfUse"
          options={{
            headerTitle: i18n.t("TERMS6", {
              defaultValue: "Terms of Use",
            }),
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
    </View>
  );
}

type WithObservableProps = ObservableifyProps<RootLayoutProps, "appSetting">;
const RootLayout = withObservables(
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
)(Component as any); // as any here is workaround on typescript complaining between Observable<AppSetting> and AppSetting

export default RootLayout;
