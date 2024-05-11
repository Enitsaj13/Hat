import { router, Stack } from "expo-router";
import { i18n } from "@i18n/index";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Pressable } from "react-native";

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
        name="Locations/[serverId]"
        options={{ headerBackTitleVisible: false }}
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
      <Stack.Screen
        name="AuditSummary"
        options={{
          title: i18n.t("AH1", {
            defaultValue: "Audit Summary",
          }),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="MainScreen"
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <Pressable
              onPress={() =>
                router.navigate("AuditSummary?hideFeedbackGiven=true")
              }
            >
              <Icon name="table" size={20} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Precaution"
        options={{
          headerBackTitleVisible: false,
          title: i18n.t("AF1", {
            defaultValue: "Precaution",
          }),
        }}
      />
    </Stack>
  );
}
