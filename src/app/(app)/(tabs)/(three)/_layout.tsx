import { Stack } from "expo-router";
import { i18n } from "@i18n/index";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="Settings" options={{ title: "Settings TODO" }} />
      <Stack.Screen
        name="SubscribeNow"
        options={{
          title: i18n.t("D4", {
            defaultValue: "Subscribe Now",
          }),
        }}
      />
      <Stack.Screen
        name="TermsOfUse"
        options={{
          title: i18n.t("TERMS6", {
            defaultValue: "Terms of use",
          }),
        }}
      />
    </Stack>
  );
}
