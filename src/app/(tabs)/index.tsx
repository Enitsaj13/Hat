import EditScreenInfo from "@components/EditScreenInfo";
import { i18n } from "@i18n/index";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">
        Tab One {i18n.t("A1", { defaultValue: "Introduction" })}
      </Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <BottomSheet snapPoints={["25%"]}>
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
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
