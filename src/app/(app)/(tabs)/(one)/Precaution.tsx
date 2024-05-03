import React, { useState } from "react";
import { Text, View, Switch } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { colors } from "@theme/index";
import { i18n } from "@i18n/index";
import SegmentedButton from "@components/SegmentButton";
import DropdownList from "@components/DropdownList";

const MealType = [
  { key: "patent", value: "Patent Meal" },
  { key: "full", value: "Full Meal" },
  { key: "half", value: "Half Meal" },
  { key: "breakfat", value: "Breakfast only" },
];

const Precaution = () => {
  const handleSegmentChange = (index: number) => {
    // Do something based on the selected segment
  };

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{i18n.t("AF1")}</Text>
      </View>
      <View style={styles.dragDownContainer}>
        <Text style={styles.dragDownText}>{i18n.t("AF2")}</Text>
      </View>
      <View style={styles.occupationalTitleContainer}>
        <Text style={styles.title}>
          {i18n.t("U16", {
            defaultValue: "Occupational Risk",
          })}
        </Text>
      </View>
      <SegmentedButton
        segments={["Contact", "Airborne", "Droplet"]}
        onSegmentChange={handleSegmentChange}
      />
      <View style={styles.actionTitleContainer}>
        <Text style={styles.title}>
          {i18n.t("AE8", {
            defaultValue: "ACTION",
          })}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.actionListContainer}>
          <Text style={styles.actionTitle}>
            {i18n.t("AF7", {
              defaultValue: "Don on Gloves",
            })}
          </Text>
          <Switch
            trackColor={{ true: colors.mediumPurple }}
            thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
            ios_backgroundColor={colors.textColor}
            style={styles.switchIndication}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.actionListContainer}>
          <Text style={styles.actionTitle}>
            {i18n.t("AF8", {
              defaultValue: "Don on Gown",
            })}
          </Text>
          <Switch
            trackColor={{ true: colors.mediumPurple }}
            thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
            ios_backgroundColor={colors.textColor}
            style={styles.switchIndication}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.actionListContainer}>
          <Text style={styles.actionTitle}>
            {i18n.t("AF9", {
              defaultValue: "Don on Mask",
            })}
          </Text>
          <Switch
            trackColor={{ true: colors.mediumPurple }}
            thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
            ios_backgroundColor={colors.textColor}
            style={styles.switchIndication}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={styles.actionTitleContainer}>
        <Text style={styles.title}>
          {i18n.t("OPF1", {
            defaultValue: "OPTIONAL DATA",
          })}
        </Text>
      </View>
      <View style={styles.optionalDataContainer}>
        <Text style={styles.optionalDataTitle}>Face Shield?</Text>
        <Switch
          trackColor={{ true: colors.mediumPurple }}
          thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
          ios_backgroundColor={colors.textColor}
          style={styles.switchIndication}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={[styles.optionalDataContainer, styles.dropdownContainer]}>
        <DropdownList
          options={MealType}
          onOptionSelected={(key, value) => {
            console.log(`Selected option: ${value}`);
          }}
          dropdownlistStyle={styles.dropdownlistContainer}
          selectedValueStyle={styles.selectedValue}
          noOptionSelectedText="Patent Meal"
        />
      </View>
      <View style={styles.optionalDataContainer}>
        <Text style={styles.optionalDataTitle}>Prada?</Text>
        <Switch
          trackColor={{ true: colors.mediumPurple }}
          thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
          ios_backgroundColor={colors.textColor}
          style={styles.switchIndication}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default Precaution;

const styles = createStyleSheet({
  container: {
    flex: 1,
    marginTop: 40,
  },
  dragDownContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8dfb7",
  },
  dragDownText: {
    fontSize: 12,
    color: colors.steelGrey,
  },
  occupationalTitleContainer: {
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  title: {
    color: colors.textColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  actionTitleContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#047857",
  },
  actionContainer: {
    justifyContent: "center",
  },
  actionListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderColor: colors.steelGrey,
    padding: 12,
  },
  actionTitle: {
    color: colors.textColor,
    fontSize: 16,
  },
  switchIndication: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  optionalDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 48,
    marginHorizontal: "6%",
    backgroundColor: colors.textColor,
    marginTop: 10,
  },
  optionalDataTitle: {
    color: colors.steelGrey,
  },
  dropdownContainer: {
    paddingHorizontal: 0,
  },
  dropdownlistContainer: {
    backgroundColor: colors.textColor,
  },
  selectedValue: {
    fontSize: 14,
    color: colors.steelGrey,
  },
});
