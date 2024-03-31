import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { getDefaultLanguage, i18n } from "@i18n/index";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { ThemeProvider } from "@react-navigation/native";
import { AppSetting } from "@stores/appSetting";
import { database } from "@stores/index";
import { breakpoints, CombinedDefaultTheme } from "@theme/index";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { UnistylesRegistry } from "react-native-unistyles";

import { SessionProvider } from "../auth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

UnistylesRegistry.addBreakpoints(breakpoints);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

interface RootProps {
  appSettings: AppSetting[];
}

export function Component({ appSettings }: RootProps) {
  const [, error] = useFonts({
    ...FontAwesome.font,
  });

  console.log("appSettings in _layout", appSettings);
  i18n.locale = getDefaultLanguage(appSettings);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      console.log("font error", error);
    }
  }, [error]);

  // Set up the auth context and render our layout inside of it.
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <ThemeProvider value={CombinedDefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <SessionProvider>
              <Slot />
            </SessionProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </PaperProvider>
  );
}

type WithObservableProps = ObservableifyProps<RootProps, "appSettings">;
const Root = withObservables(["appSettings"], (props: WithObservableProps) => ({
  appSettings: database.collections
    .get<AppSetting>("app_settings")
    .query(Q.take(1))
    .observe(),
}))(Component);
export default Root;
