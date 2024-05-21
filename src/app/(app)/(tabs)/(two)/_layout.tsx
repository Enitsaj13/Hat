import { Stack, router } from "expo-router";
import { i18n } from "@i18n/index";
import { Pressable } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

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
      <Stack.Screen
        name="Reports"
        options={{
          title: i18n.t("AI5", {
            defaultValue: "Reports",
          }),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ObservationRecords"
        options={{
          title: i18n.t("S1", {
            defaultValue: "Observation Records",
          }),
          headerBackTitleVisible: false,
          headerRight: () => (
            <Pressable onPress={() => router.navigate("FilterReport")}>
              <Icon name="calendar-o" size={20} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="FilterReport"
        options={{
          title: i18n.t("T1", {
            defaultValue: "Filter Options",
          }),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Locations/[serverId]"
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="FAQ"
        options={{
          headerBackTitleVisible: false,
          title: i18n.t("AI9", {
            defaultValue: "FAQ",
          }),
        }}
      />
      <Stack.Screen
        name="WHOMy5MomentsForHandHygiene"
        options={{
          title: i18n.t("K4", {
            defaultValue: 'WHO - "My 5 Moments for Hand Hygiene"',
          }),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Charts"
        options={{
          title: i18n.t("H3", {
            defaultValue: "Charts",
          }),
          headerBackTitleVisible: false,
          headerRight: () => (
            <Pressable onPress={() => router.navigate("FilterChart")}>
              <Icon name="calendar-o" size={20} color="white" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
