import EditScreenInfo from "@components/EditScreenInfo";
import { i18n } from "@i18n/index";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";

export default function TabOneScreen() {
  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">
        Tab One {i18n.t("A1", { defaultValue: "Introduction" })}
      </Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <BottomSheetModal
        snapPoints={["25%", "50%"]}
        ref={bottomSheetModalRef}
        backgroundStyle={{ backgroundColor: theme.colors.inverseSurface }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
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
