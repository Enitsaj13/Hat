import { Stack } from "expo-router";
import { i18n } from "@i18n/index";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="Record"
        options={{
          title: i18n.t("H2", {
            defaultValue: "Record",
          }),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Locations/[selectedLocationServerId]"
        options={{
          title: i18n.t("LC2", {
            defaultValue: "Location",
          }),
        }}
      />
      <Stack.Screen
        name="PracticeMode"
        options={{
          title: i18n.t("H6", {
            defaultValue: "Practice Mode",
          }),
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
