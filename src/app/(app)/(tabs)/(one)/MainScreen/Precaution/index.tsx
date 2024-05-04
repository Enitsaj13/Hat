import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import { colors } from "@theme/index";
import { i18n } from "@i18n/index";
import SegmentedButton from "@components/SegmentButton";
import DropdownList from "@components/DropdownList";
import { useMomentSchemaForRef } from "@app/(app)/(tabs)/(one)/MainScreen/helpers";
import { Controller } from "react-hook-form";
import { styles } from "@app/(app)/(tabs)/(one)/MainScreen/Precaution/styles";

const MealType = [
  { key: "patent", value: "Patent Meal" },
  { key: "full", value: "Full Meal" },
  { key: "half", value: "Half Meal" },
  { key: "breakfat", value: "Breakfast only" },
];

const Precaution = () => {
  const formRef = useMomentSchemaForRef();
  const form = formRef.current!;

  const { control } = form;

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {i18n.t("AF1", {
            defaultValue: "Precaution",
          })}
        </Text>
      </View>
      <View style={styles.dragDownContainer}>
        <Text style={styles.dragDownText}>
          {i18n.t("AF2", {
            defaultValue: "Drag down to go back to opportunity screen",
          })}
        </Text>
      </View>
      <View style={styles.occupationalTitleContainer}>
        <Text style={styles.title}>
          {i18n.t("U16", {
            defaultValue: "Occupational Risk",
          })}
        </Text>
      </View>
      <Controller
        render={({ field: { onChange, value } }) => (
          <SegmentedButton
            segments={[
              {
                value: "Contact",
                label: i18n.t("AF3", { defaultValue: "Contact" }),
              },
              {
                value: "Airborne",
                label: i18n.t("AF4", { defaultValue: "Airborne" }),
              },
              {
                value: "Droplet",
                label: i18n.t("AF5", { defaultValue: "Droplet" }),
              },
            ]}
            onSegmentChange={onChange}
            value={value}
          />
        )}
        name="occupationRisk"
        control={control}
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
          <Controller
            render={({ field: { onChange, value } }) => (
              <Switch
                trackColor={{ true: colors.mediumPurple }}
                thumbColor={value ? colors.lilyWhite : colors.textColor}
                ios_backgroundColor={colors.textColor}
                style={styles.switchIndication}
                onValueChange={onChange}
                value={value}
              />
            )}
            name="gloves"
            control={control}
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
          <Controller
            render={({ field: { onChange, value } }) => (
              <Switch
                trackColor={{ true: colors.mediumPurple }}
                thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
                ios_backgroundColor={colors.textColor}
                style={styles.switchIndication}
                onValueChange={onChange}
                value={value}
              />
            )}
            name="donOnGown"
            control={control}
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
          <Controller
            render={({ field: { onChange, value } }) => (
              <Switch
                trackColor={{ true: colors.mediumPurple }}
                thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
                ios_backgroundColor={colors.textColor}
                style={styles.switchIndication}
                onValueChange={onChange}
                value={value}
              />
            )}
            name="donOnMask"
            control={control}
          />
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Text style={styles.maskType}>
          -{" "}
          {i18n.t("U20", {
            defaultValue: "Mask Type",
          })}{" "}
          -
        </Text>
        <Controller
          render={({ field: { onChange, value } }) => (
            <SegmentedButton
              segments={[
                {
                  value: "Surgical",
                  label: i18n.t("AF11", { defaultValue: "Surgical" }),
                },
                {
                  value: "High Filtration",
                  label: i18n.t("AF12", { defaultValue: "High Filtration" }),
                },
                {
                  value: "Other",
                  label: i18n.t("AF13 ", { defaultValue: "Other" }),
                },
              ]}
              onSegmentChange={onChange}
              value={value}
            />
          )}
          name="maskType"
          control={control}
        />
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
