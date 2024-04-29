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
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="VideoPlayer"
        options={{
          title: i18n.t("VIDEOPLAYER"),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="VideosLanguage"
        options={{
          title: i18n.t("VIDEOLANGUAGES"),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="VideoLanguagesPlayer"
        options={{
          title: i18n.t("VIDEOLANGUAGES"),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="GlobalHandHygieneExcellenceAward"
        options={{
          title: i18n.t("K5", {
            defaultValue: "Global Hand Hygiene Excellence Awards",
          }),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Introduction"
        options={{
          title: i18n.t("A1", {
            defaultValue: "Introduction",
          }),
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
