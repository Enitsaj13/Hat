import { createStyleSheet } from "react-native-unistyles";
import { colors } from "@theme/index";
import { StyleSheet } from "react-native";

export const styles = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  borderContainer: {
    borderWidth: 0.4,
    borderColor: colors.steelGrey,
    paddingVertical: 20,
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
    padding: 20,
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    opacity: 0.6,
    zIndex: 99,
  },
});
