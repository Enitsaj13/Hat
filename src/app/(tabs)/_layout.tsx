import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { useTheme } from "react-native-paper";
import { useClientOnlyValue } from "@hooks/useClientOnlyValue";
import { MaterialBottomTabs } from "@components/MaterialBottomTabs";

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
    <MaterialBottomTabs
      screenOptions={
        {
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        } as any
      }
    >
      <MaterialBottomTabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="code" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="code" color={color} />
          ),
        }}
      />
    </MaterialBottomTabs>
  );
}
