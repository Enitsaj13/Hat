import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="Record"
        options={{
          title: "Record TODO",
        }}
      />
    </Stack>
  );
}
