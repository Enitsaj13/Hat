import EditScreenInfo from "@components/EditScreenInfo";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Tab Two</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
