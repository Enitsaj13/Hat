import { StyleSheet, View } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";

import { Text } from "react-native-paper";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Tab One</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
