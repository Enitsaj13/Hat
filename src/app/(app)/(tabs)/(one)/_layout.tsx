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
        }}
      />
    </Stack>
  );
}
