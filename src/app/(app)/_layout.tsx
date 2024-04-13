import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import "@i18n/index";
import { useSession } from "../../auth";

import { useAxiosResponseInterceptor } from "@services/axios";
import { AppSetting } from "@stores/appSetting";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

interface RootLayoutProps {
  appSetting: AppSetting;
}

function Component({ appSetting }: RootLayoutProps) {
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
        ? "../SignIn"
        : "../IntroductionOnceOnly";
      router.replace(toRedirect);
    }
  }, [isLoading, session, appSetting?.isIntroductionViewed]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}

type WithObservableProps = ObservableifyProps<RootLayoutProps, "appSetting">;
const RootLayout = withObservables(
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

export default RootLayout;
