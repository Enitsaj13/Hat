import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="Settings" options={{ title: "Settings TODO" }} />
      <Stack.Screen
        name="SubscribeNow"
        options={{ title: "Subscribe Now TODO" }}
      />
      <Stack.Screen
        name="TermsOfUse"
        options={{ title: "Terms of use TODO" }}
      />
    </Stack>
  );
}
