import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { colors } from "@theme/index";
import { useRef, useCallback } from "react";
import { View, FlatList, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme, List, TouchableRipple, Text } from "react-native-paper";
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
  dropdownlistStyle?: ViewStyle;
  right?: React.ReactNode;
}

function DropdownList({
  options,
  selectedOptionKey,
  onOptionSelected,
  dropdownlistStyle,
  right,
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
    <TouchableOpacity
      style={styles.container}
      onPress={handlePresentModalPress}
      activeOpacity={0.8}
    >
      <View style={[styles.dropdownlistStyle, dropdownlistStyle]}>
        <Text variant="bodyLarge" style={styles.textColor}>
          {selected}
        </Text>
        {right}
      </View>

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
                titleStyle={[styles.key, { color: theme.colors.onPrimary }]}
                left={() =>
                  selectedOptionKey === item.key ? (
                    <List.Icon
                      icon="check"
                      color="green"
                      style={styles.leftIcon}
                    />
                  ) : null
                }
              />
            </TouchableRipple>
          )}
        />
      </BottomSheetModal>
    </TouchableOpacity>
  );
}

const stylesheet = createStyleSheet({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
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
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handleIndicatorColor: {
    backgroundColor: colors.textColor,
  },
  dropdownlistStyle: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textColor: {
    color: "black",
  },
  leftIcon: {
    position: "absolute",
    left: 90,
  },
});

export default DropdownList;
