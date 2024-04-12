import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="Information"
        options={{ title: "Information TODO" }}
      />
      <Stack.Screen
        name="TrainingVideos"
        options={{ title: "Training Videos TODO" }}
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
        options={{ title: "Introduction TODO", headerShown: true }}
      />
    </Stack>
  );
}
