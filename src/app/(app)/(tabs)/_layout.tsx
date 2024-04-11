import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useClientOnlyValue } from "@hooks/useClientOnlyValue";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "react-native-paper";

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
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Record",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="book" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="home"
                    color={theme.colors.primary}
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="Information"
        options={{
          title: "Information",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="info-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="cog" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
