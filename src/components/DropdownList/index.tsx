import React, { useState, FC } from "react";
import { View, ScrollView } from "react-native";
import { Button, Menu } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { i18n } from "@i18n/index"

interface DropdownListButtonProps {
  options: string[];
}

const DropdownListButton: FC<DropdownListButtonProps> = ({ options }) => {
  const { styles } = useStyles(stylesheet);

  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleOptionSelect = (option: string) => {
    setSelectedValue(option);
    setVisible(false);
    // Set the selected language
    i18n.locale = option.toLowerCase(); // Assuming the options are language codes
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} mode="contained" icon="arrow-up">
            {selectedValue}
          </Button>
        }
      >
        <ScrollView showsVerticalScrollIndicator>
          {options.map((option, index) => (
            <Menu.Item
              key={index}
              onPress={() => handleOptionSelect(option)}
              title={option}
            />
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DropdownListButton;
