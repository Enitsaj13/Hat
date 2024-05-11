import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import DropdownList from "@components/DropdownList";
import {
  AntDesign as Icon,
  FontAwesome as FontAwesomeIcon,
} from "@expo/vector-icons";
import { colors } from "@theme/index";
import { i18n } from "@i18n/index";
import { router } from "expo-router";
import CustomDatePicker from "@components/CustomDatePicker";

const AuditorType = [
  { key: "all", value: "--All--" },
  { key: "jastine", value: "Jastine" },
  { key: "aldrin", value: "Aldrin" },
  { key: "ronald", value: "Ronald" },
  { key: "aljon", value: "Aljon" },
];

const FilterReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.selectorContainer}>
          <Text style={styles.text}>
            {i18n.t("T2", { defaultValue: "Date From:" })}:
          </Text>
          <CustomDatePicker
            initialDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </View>
        <View style={styles.selectorContainer}>
          <Text style={styles.text}>
            {i18n.t("T3", { defaultValue: "Date To:" })}:
          </Text>
          <CustomDatePicker
            initialDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </View>
        <View style={styles.selectorContainer}>
          <Text style={styles.text}>
            {i18n.t("T4", { defaultValue: "Auditor:" })}:
          </Text>
          <DropdownList
            options={AuditorType}
            dropdownlistStyle={styles.dropdownlistContainer}
            selectedValueStyle={styles.selectedValue}
            right={
              <Icon
                name="caretdown"
                size={10}
                style={styles.arrowIcon}
                color="gray"
              />
            }
            noOptionSelectedText={i18n.t("T12", { defaultValue: "All" })}
          />
        </View>
        <View style={styles.selectorContainer}>
          <Text style={styles.text}>
            {i18n.t("T5", { defaultValue: "HCW:" })}:
          </Text>
          <DropdownList
            options={AuditorType}
            dropdownlistStyle={styles.dropdownlistContainer}
            selectedValueStyle={styles.selectedValue}
            right={
              <Icon
                name="caretdown"
                size={10}
                style={styles.arrowIcon}
                color="gray"
              />
            }
            noOptionSelectedText={i18n.t("T12", { defaultValue: "All" })}
          />
        </View>
        <View style={[styles.selectorContainer, styles.locationHeader]}>
          <Text style={styles.text}>
            {i18n.t("LC1", { defaultValue: "Location" })}:
          </Text>
        </View>

        <View style={[styles.selectorContainer, styles.locationContainer]}>
          <Text style={styles.text}>-{i18n.t("NO_LOCATION_SELECTED")}-</Text>
          <TouchableOpacity style={styles.repeatIcon}>
            <FontAwesomeIcon name="repeat" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.selectorContainer, styles.dropdownlistLocation]}>
          <Text style={styles.text}>
            {i18n.t("LC2", { defaultValue: "Location:" })}:
          </Text>
          <DropdownList
            options={AuditorType}
            dropdownlistStyle={styles.dropdownlistContainer}
            selectedValueStyle={styles.selectedValue}
            right={
              <Icon
                name="caretdown"
                size={10}
                style={styles.arrowIcon}
                color="gray"
              />
            }
            noOptionSelectedText={i18n.t("LC3", { defaultValue: "Select" })}
          />
        </View>
      </View>
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelTitle}>
            {i18n.t("T10", { defaultValue: "Cancel" })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterTitle}>
            {i18n.t("S4", { defaultValue: "Filter" })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterReport;

const styles = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  borderContainer: {
    borderWidth: 0.4,
    borderColor: colors.steelGrey,
    height: "72%",
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: colors.steelGrey,
    paddingHorizontal: 12,
    height: 50,
  },
  text: {
    color: colors.steelGrey,
    fontSize: 16,
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
  arrowIcon: {
    marginLeft: 15,
  },
  locationHeader: {
    backgroundColor: "#fafafa",
  },
  locationContainer: {
    marginTop: 10,
    borderBottomWidth: 0,
  },
  repeatIcon: {
    marginRight: 5,
  },
  dropdownlistLocation: {
    borderWidth: 0.4,
    borderColor: colors.steelGrey,
    marginHorizontal: 15,
    height: 42,
  },
  filterButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#fafafa",
    width: 168,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.midNight,
    shadowOffset: {
      width: 1,
      height: -0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  cancelTitle: {
    color: colors.steelGrey,
    fontSize: 16,
  },
  filterButton: {
    width: 168,
    height: 60,
    backgroundColor: colors.bgColor,
    justifyContent: "center",
    alignItems: "center",
  },
  filterTitle: {
    color: colors.textColor,
    fontSize: 16,
  },
});
