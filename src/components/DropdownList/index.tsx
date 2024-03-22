import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, Menu } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type DropDownOption = {
  key: string;
  value: any;
};
interface DropdownListButtonProps {
  options: DropDownOption[];
}

function DropdownListButton({ options }: DropdownListButtonProps) {
  const { styles } = useStyles(stylesheet);

  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<DropDownOption>(
    options[0],
  );

  const handleOptionSelect = (option: DropDownOption) => {
    setSelectedValue(option);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            onPress={() => setVisible(true)}
            mode="contained"
            icon="arrow-up"
          >
            {selectedValue.value}
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
