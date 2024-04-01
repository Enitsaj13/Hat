import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo } from "react";
import { View, FlatList, ViewStyle } from "react-native";
import { useTheme, List, TouchableRipple, Button } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export type DropDownOptionKey = string | number;

export type DropDownOption = {
  key: DropDownOptionKey;
  value: any;
};

interface DropdownListProps {
  options: DropDownOption[];
  selectedOptionKey?: DropDownOptionKey;
  onOptionSelected?: (key: DropDownOptionKey, value: any) => void;
  buttonStyle?: ViewStyle;
}

function DropdownList({
  options,
  selectedOptionKey,
  onOptionSelected,
  buttonStyle,
}: DropdownListProps) {
  const { styles } = useStyles(stylesheet);

  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        opacity={-1}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => ["25%"], []);

  const handleOptionSelect = (option: DropDownOption) => {
    onOptionSelected && onOptionSelected(option.key, option.value);
    bottomSheetModalRef.current?.dismiss();
  };

  const selected = `${options.find((o) => o.key === selectedOptionKey)?.value || ""}`;

  return (
    <View style={styles.container}>
      <Button
        style={buttonStyle}
        onPress={handlePresentModalPress}
        mode="contained"
        icon="arrow-up"
      >
        {selected}
      </Button>

      <BottomSheetModal
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        handleIndicatorStyle={{ backgroundColor: theme.colors.primary }}
        backgroundStyle={{ backgroundColor: theme.colors.primary }}
      >
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <TouchableRipple onPress={() => handleOptionSelect(item)}>
              <List.Item
                contentStyle={styles.languageBottomSheetContainer}
                title={item.value}
                titleStyle={[
                  styles.languageText,
                  { color: theme.colors.onPrimary },
                ]}
              />
            </TouchableRipple>
          )}
        />
      </BottomSheetModal>
    </View>
  );
}

const stylesheet = createStyleSheet({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  languageContainer: {
    flexDirection: "row",
    gap: 70 * 2,
    alignItems: "center",
  },
  languageBottomSheetContainer: {
    flex: 1,
    justifyContent: "center",
  },
  languageText: {
    textAlign: "center",
  },
});

export default DropdownList;
