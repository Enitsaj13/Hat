import { useRef, useCallback } from "react";
import { View, FlatList, ViewStyle } from "react-native";
import { useTheme, List, TouchableRipple, Button } from "react-native-paper";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { colors } from "@theme/index";


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
        snapPoints={["25%"]}
        ref={bottomSheetModalRef}
        handleIndicatorStyle={styles.handleIndicatorColor}
        style={styles.containerBottomSheetModal}
      >
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <TouchableRipple onPress={() => handleOptionSelect(item)}>
              <List.Item
                contentStyle={styles.languageBottomSheetContainer}
                title={item.value}
                titleStyle={[
                  styles.key,
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
  languageBottomSheetContainer: {
    flex: 1,
    justifyContent: "center",
  },
  key: {
    textAlign: "center",
  },
  containerBottomSheetModal: {
    backgroundColor: colors.textColor,
    borderRadius: 20
  },
  handleIndicatorColor: {
    backgroundColor: colors.textColor
  }
});

export default DropdownList;
