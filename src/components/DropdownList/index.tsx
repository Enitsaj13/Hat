import React, { useState } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Button, Menu } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export type DropDownOptionKey = string | number;

export type DropDownOption = {
  key: DropDownOptionKey;
  value: any;
};

interface DropdownListButtonProps {
  selectedOptionKey?: DropDownOptionKey;
  onOptionSelected?: (key: DropDownOptionKey, value: any) => void;
  options: DropDownOption[];
  buttonStyle?: ViewStyle;
}

function DropdownListButton({
  options,
  selectedOptionKey,
  onOptionSelected,
  buttonStyle,
}: DropdownListButtonProps) {
  const { styles } = useStyles(stylesheet);

  const [visible, setVisible] = useState(false);

  const handleOptionSelect = (option: DropDownOption) => {
    onOptionSelected && onOptionSelected(option.key, option.value);
    setVisible(false);
  };

  const selected = `${options.find((o) => o.key === selectedOptionKey)?.value || ""}`;
  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            style={buttonStyle}
            onPress={() => setVisible(true)}
            mode="contained"
            icon="arrow-up"
          >
            {selected}
          </Button>
        }
      >
        <ScrollView showsVerticalScrollIndicator>
          {options.map((option) => (
            <Menu.Item
              titleStyle={{ color: "black" }}
              key={option.key}
              onPress={() => handleOptionSelect(option)}
              title={option.value}
            />
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
}

const stylesheet = createStyleSheet({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DropdownListButton;
