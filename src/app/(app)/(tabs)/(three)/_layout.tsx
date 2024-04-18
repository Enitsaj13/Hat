import { Stack } from "expo-router";
import { i18n } from "@i18n/index";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="Settings"
        options={{
          title: i18n.t("SETTINGS"),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SubscribeNow"
        options={{
          title: i18n.t("D4", {
            defaultValue: "Subscribe Now",
          }),
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
