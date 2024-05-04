import { createStyleSheet } from "react-native-unistyles";
import { colors } from "@theme/index";

export const styles = createStyleSheet({
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
  maskType: {
    color: colors.textColor,
    fontSize: 16,
    padding: 10,
    textAlign: "center",
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
