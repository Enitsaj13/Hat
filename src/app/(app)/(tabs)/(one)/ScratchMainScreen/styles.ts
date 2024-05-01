import { createStyleSheet } from "react-native-unistyles";
import { colors } from "@theme/index";

export const styles = createStyleSheet({
  container: {
    flex: 1,
  },
  dropdownlistContainer: {
    borderWidth: 1,
    borderColor: colors.textColor,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 6,
    width: "40%",
  },
  dropdownlistActionContainer: {
    width: "80%",
    backgroundColor: colors.textColor,
    padding: 10,
    marginTop: 0,
    marginBottom: 6,
  },
  headerContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    flex: 1,
    textTransform: "uppercase",
    color: colors.textColor,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 30,
  },
  mainScreenContainer: {
    backgroundColor: colors.textColor,
    alignItems: "center",
    paddingBottom: 5,
  },
  mainScreenImageContainer: {
    width: "100%",
    height: 250,
  },
  arrowImageContainer1: {
    position: "absolute",
    top: 75,
    left: 28,
  },
  arrowImageContainer2: {
    position: "absolute",
    right: 112,
    top: 35,
  },
  arrowImageContainer3: {
    position: "absolute",
    bottom: 40,
    left: 86,
  },
  arrowImageContainer4: {
    position: "absolute",
    right: 40,
    top: 67,
  },
  arrowImageContainer5: {
    position: "absolute",
    right: 26,
    bottom: 26,
  },
  arrowImage1: {
    width: 80,
    height: 60,
  },
  arrowImage2: {
    width: 100,
    height: 60,
  },
  arrowImage3: {
    width: 100,
    height: 70,
  },
  arrowImage4: {
    width: 80,
    height: 70,
  },
  arrowImage5: {
    width: 80,
    height: 70,
  },
  indicationContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginHorizontal: 10,
    position: "absolute",
    bottom: 5,
  },
  indicationTitle: {
    fontSize: 12,
    color: colors.midNight,
    marginRight: 5,
    fontWeight: "300",
  },
  switchIndication: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  actionHeaderContainer: {
    backgroundColor: "#059669",
    padding: 10,
  },
  actionTitle: {
    textTransform: "uppercase",
    color: colors.textColor,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  hygieneContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  actionButton: {
    borderWidth: 2,
    borderColor: "#047857",
    height: 55,
    width: 55,
    borderRadius: 4,
    marginHorizontal: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonName: {
    color: colors.textColor,
    textTransform: "uppercase",
    fontSize: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  circleButton: {
    borderRadius: 30,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 5,
  },
  controlButton: {
    flexDirection: "row",
    height: 42,
    minWidth: 110,
    maxWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#047857",
    borderRadius: 30,
  },
  controlButtonTitle: {
    color: colors.textColor,
    fontSize: 12,
    marginRight: 3,
  },
});
