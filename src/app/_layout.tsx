import { Slot, SplashScreen } from "expo-router";

import { SessionProvider } from "../auth";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect } from "react";
import { breakpoints, CombinedDefaultTheme } from "@theme/index";
import { ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PaperProvider } from "react-native-paper";
import { UnistylesRegistry } from "react-native-unistyles";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

UnistylesRegistry.addBreakpoints(breakpoints);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function Root() {
  const [, error] = useFonts({
    ...FontAwesome.font,
  });

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
