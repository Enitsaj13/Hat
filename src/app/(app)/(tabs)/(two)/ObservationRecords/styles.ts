import { createStyleSheet } from "react-native-unistyles";
import { colors } from "@theme/index";

export const styles = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dateFilteredContainer: {
    flexDirection: "row",
    backgroundColor: colors.babyBlue,
    paddingVertical: 8,
    width: "100%",
    paddingHorizontal: 10,
  },
  dateText: {
    color: colors.cerulean,
    fontSize: 14,
  },
  text: {
    color: colors.midNight,
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 25,
    paddingHorizontal: 10,
  },
  contentContainer: {
    marginTop: 10,
    padding: 10,
  },
  hcwTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginRight: 30,
  },
  filteredDataContainer: {
    height: 30,
    borderWidth: 0.4,
    borderColor: colors.lightGray,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
  },
  hcwTypeFiltered: {
    width: "95%",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: colors.lightGray,
    justifyContent: "space-between",
  },
  hcwFilteredContainer: {
    flexDirection: "row",
    padding: 20,
  },
  dateRowContainer: {
    flexDirection: "row",
  },
  grayText: {
    color: colors.cadetGrey,
    fontSize: 12,
    paddingVertical: 4,
  },
  infoContainer: {
    flexDirection: "column",
  },
});
