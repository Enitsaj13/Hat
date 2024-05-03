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
      <Stack.Screen
        name="Profile"
        options={{
          title: i18n.t("H5", {
            defaultValue: "Profile",
          }),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        options={{
          title: i18n.t("Q7", {
            defaultValue: "Change Password",
          }),
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
