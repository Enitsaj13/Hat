import { createStyleSheet } from "react-native-unistyles";
import { colors } from "@theme/index";

export const styles = createStyleSheet({
  container: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 0.4,
    borderColor: colors.green,
  },
  textTable: {
    color: colors.textColor,
    fontSize: 16,
  },
  titleLabelContainer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: colors.green,
  },
  healthCareTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.textColor,
  },
  textRow: {
    fontSize: 14,
    color: colors.textColor,
    marginHorizontal: 14,
    textAlign: "center",
  },
  countPercentTitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 14,
    width: "100%",
  },
  countPercentContainer: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.4,
    borderColor: colors.green,
  },
  tableContainer: {
    backgroundColor: colors.bgColor,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    borderBottomWidth: 0.4,
    borderColor: colors.green,
  },
  tableText: {
    fontSize: 14,
    color: colors.textColor,
    textAlign: "center",
  },
  totalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    borderRightWidth: 0.4,
    borderColor: colors.green,
  },
  textTotal: {
    fontSize: 14,
    color: colors.textColor,
    textAlign: "center",
  },
  complianceDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 14,
    width: "100%",
  },
  tableCompliance: {
    justifyContent: "space-evenly",
  },
  tableComplianceContainer: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRightWidth: 0.4,
    borderColor: colors.green,
  },
  handHygieneContainer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.textColor,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  handHygieneText: {
    color: colors.textColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  handHygienePercentContainer: {
    width: "5%",
  },
  feedbackContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 2,
    borderColor: colors.textColor,
    paddingHorizontal: 12,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  feedbackTextContainer: {
    width: "70%",
    alignItems: "flex-start",
  },
  feedbackButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "25%",
    marginHorizontal: 18,
  },
  switchIndication: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  },
  practiceModeContainer: {
    flexDirection: "row",
    backgroundColor: colors.babyBlue,
    paddingVertical: 15,
    width: "100%",
    paddingHorizontal: 20,
  },
  practiceNoteText: {
    color: colors.cerulean,
    marginLeft: 10,
  },
});
