import { Stack } from "expo-router";
import { i18n } from "@i18n/index";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="Information"
        options={{ title: i18n.t("INFORMATION") }}
      />
      <Stack.Screen
        name="TrainingVideos"
        options={{
          title: i18n.t("H7", {
            defaultValue: "Training Videos",
          }),
        }}
      />
      <Stack.Screen
        name="VideoPlayer"
        options={{ title: "Video Player TODO" }}
      />
      <Stack.Screen
        name="VideosLanguage"
        options={{ title: "Videos Language TODO" }}
      />
      <Stack.Screen
        name="Introduction"
        options={{
          title: i18n.t("A1", {
            defaultValue: "Introduction",
          }),
        }}
      />
    </Stack>
  );
}
