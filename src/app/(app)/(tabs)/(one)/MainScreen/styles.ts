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
    padding: 15,
    marginTop: 0,
    marginBottom: 10,
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
    justifyContent: "center",
    paddingBottom: 5,
    height: 300,
    maxHeight: 400,
  },
  mainScreenImage: {
    width: "100%",
    maxWidth: 400,
    height: 300,
    maxHeight: 400,
  },
  mainScreenImageContainer: {
    position: "relative",
    width: 400,
    height: "100%",
    maxHeight: 400,
  },
  arrowImageContainer1: {
    position: "absolute",
    top: 100,
    left: 36,
  },
  arrowImageContainer2: {
    position: "absolute",
    right: 125,
    top: 55,
  },
  arrowImageContainer3: {
    position: "absolute",
    bottom: 52,
    left: 95,
  },
  arrowImageContainer4: {
    position: "absolute",
    right: 50,
    top: 86,
  },
  arrowImageContainer5: {
    position: "absolute",
    right: 32,
    bottom: 35,
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
  switchContainer: {
    backgroundColor: colors.textColor,
    padding: 8,
    marginHorizontal: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  obligatoryText: {
    color: colors.steelGrey,
    fontSize: 14,
  },
  actionHeaderContainer: {
    backgroundColor: colors.borderColor,
    padding: 10,
  },
  actionTitle: {
    color: colors.textColor,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  hygieneContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  actionButton: {
    borderWidth: 2,
    borderColor: colors.borderColor,
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
    paddingBottom: 15,
  },
  controlButton: {
    flexDirection: "row",
    height: 42,
    minWidth: 110,
    maxWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.borderColor,
    borderRadius: 30,
  },
  controlButtonTitle: {
    color: colors.textColor,
    fontSize: 12,
    marginRight: 3,
  },
  obligatoryContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
});