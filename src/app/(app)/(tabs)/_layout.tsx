import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";
import { i18n } from "@i18n/index"; // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Workaround code to make the initial tab work: https://github.com/expo/router/issues/763#issuecomment-1951429388  */}
      <Tabs.Screen redirect name="index" />
      <Tabs.Screen
        name="(one)"
        options={{
          title: i18n.t("H2", {
            defaultValue: "Record",
          }),
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(two)"
        options={{
          title: i18n.t("INFORMATION"),
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="info-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(three)"
        options={{
          title: i18n.t("SETTINGS"),
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
