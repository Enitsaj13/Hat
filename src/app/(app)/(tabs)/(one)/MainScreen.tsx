import React, { useState } from "react";
import { Text, View, Image, Switch, Pressable, ScrollView } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import {
  AntDesign as ArrowIcon,
  Feather as EditIcon,
  Entypo as EntypoIcon,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { i18n } from "@i18n/index";
import DropdownList from "@components/DropdownList";
import { colors } from "@theme/index";

const HCWType = [
  { key: "Doctors", value: "Doctors" },
  { key: "Nurses", value: "Nurses" },
  { key: "AuxiliaryWorker", value: "Auxiliary Worker" },
];

const RubbingCompoundType = [
  { key: "Alcohol", value: "Alcohol" },
  { key: "Alcogel", value: "Alcogel" },
];
const MainScreen = () => {
  const [showRubbingCompound, setShowRubbingCompound] = useState(false);

  const [isImageGreen1, setIsImageViolet1] = useState(true);
  const [isImageGreen2, setIsImageViolet2] = useState(true);
  const [isImageGreen3, setIsImageViolet3] = useState(true);
  const [isImageGreen4, setIsImageViolet4] = useState(true);
  const [isImageGreen5, setIsImageViolet5] = useState(true);

  const [isRub, setIsRub] = useState(false);
  const [isWash, setIsWash] = useState(true);
  const [isMissed, setIsMissed] = useState(true);
  const [isGlovesAdd, setIsGlovesAdd] = useState(true);
  const [borderColorRub, setBorderColorRub] = useState(colors.borderColor);
  const [borderColorWash, setBorderColorWash] = useState(colors.borderColor);
  const [borderColorMissed, setBorderColorMissed] = useState(
    colors.borderColor,
  );
  const [borderColorGlovesAdd, setBorderColorGlovesAdd] = useState(
    colors.borderColor,
  );
  const [bgColorGlovesAdd, setBgColorGlovesAdd] = useState(colors.bgColor);
  const [bgColorRub, setBgColorRub] = useState(colors.bgColor);
  const [colorTextRub, setColorTextRub] = useState(colors.textColor);
  const [bgColorWash, setBgColorWash] = useState(colors.bgColor);
  const [colorTextWash, setColorTextWash] = useState(colors.textColor);
  const [bgColorMissed, setBgColorMissed] = useState(colors.bgColor);
  const [colorTextMissed, setColorTextMissed] = useState(colors.textColor);
  const [colorTextGlovesAdd, setColorTextGlovesAdd] = useState(
    colors.textColor,
  );

  const handleRubClick = () => {
    setIsRub(!isRub);
    setBorderColorRub(isRub ? colors.borderColor : colors.mediumPurple);
    setBgColorRub(isRub ? colors.bgColor : colors.textColor);
    setColorTextRub(isRub ? colors.textColor : colors.mediumPurple);
    setShowRubbingCompound(!showRubbingCompound);
  };

  const handleWashClick = () => {
    setIsWash(!isWash);
    setBorderColorWash(isWash ? colors.borderColor : colors.mediumPurple);
    setBgColorWash(isWash ? colors.bgColor : colors.textColor);
    setColorTextWash(isWash ? colors.textColor : colors.mediumPurple);
  };

  const handleMissedClick = () => {
    setIsMissed(!isMissed);
    setBorderColorMissed(isMissed ? colors.borderColor : colors.red);
    setBgColorMissed(isMissed ? colors.bgColor : colors.textColor);
    setColorTextMissed(isMissed ? colors.textColor : colors.red);
  };

  const handleGlovesAddClick = () => {
    setIsGlovesAdd(!isGlovesAdd);
    setBorderColorGlovesAdd(
      isGlovesAdd ? colors.borderColor : colors.mediumPurple,
    );
    setBgColorGlovesAdd(isGlovesAdd ? colors.bgColor : colors.textColor);
    setColorTextGlovesAdd(isGlovesAdd ? colors.textColor : colors.mediumPurple);
  };

  const toggleImage1 = () => {
    setIsImageViolet1((prev) => !prev);
  };

  const toggleImage2 = () => {
    setIsImageViolet2((prev) => !prev);
    setShowRubbingCompound(!showRubbingCompound);
  };

  const toggleImage3 = () => {
    setIsImageViolet3((prev) => !prev);
  };

  const toggleImage4 = () => {
    setIsImageViolet4((prev) => !prev);
  };

  const toggleImage5 = () => {
    setIsImageViolet5((prev) => !prev);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState(false);

  const toggleSwitch = (value: boolean) => {
    setMode(value);
    setIsEnabled((prev) => !prev);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DropdownList
        options={HCWType}
        dropdownlistStyle={styles.dropdownlistContainer}
        right={<ArrowIcon name="caretdown" size={10} color="white" />}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {i18n.t("U13", {
            defaultValue: "Moment",
          })}
        </Text>
        <EditIcon name="edit" size={22} color="white" />
      </View>

      <View style={styles.mainScreenContainer}>
        <View style={styles.mainScreenImageContainer}>
          <Image
            source={require("@assets/images/hat-images/MainScreenImage.jpg")}
            resizeMode="contain"
            style={styles.mainScreenImage}
          />

          <Pressable style={styles.arrowImageContainer1} onPress={toggleImage1}>
            <Image
              source={
                isImageGreen1
                  ? require("@assets/images/hat-images/1_green.png")
                  : require("@assets/images/hat-images/1_violet.png")
              }
              resizeMode="contain"
              style={styles.arrowImage1}
            />
          </Pressable>

          <Pressable style={styles.arrowImageContainer2} onPress={toggleImage2}>
            <Image
              source={
                isImageGreen2
                  ? require("@assets/images/hat-images/2_green.png")
                  : require("@assets/images/hat-images/2_violet.png")
              }
              resizeMode="contain"
              style={styles.arrowImage2}
            />
          </Pressable>

          <Pressable style={styles.arrowImageContainer3} onPress={toggleImage3}>
            <Image
              source={
                isImageGreen3
                  ? require("@assets/images/hat-images/3_green.png")
                  : require("@assets/images/hat-images/3_violet.png")
              }
              resizeMode="contain"
              style={styles.arrowImage3}
            />
          </Pressable>

          <Pressable style={styles.arrowImageContainer4} onPress={toggleImage4}>
            <Image
              source={
                isImageGreen4
                  ? require("@assets/images/hat-images/4_green.png")
                  : require("@assets/images/hat-images/4_violet.png")
              }
              resizeMode="contain"
              style={styles.arrowImage4}
            />
          </Pressable>
          <Pressable style={styles.arrowImageContainer5} onPress={toggleImage5}>
            <Image
              source={
                isImageGreen5
                  ? require("@assets/images/hat-images/5_green.png")
                  : require("@assets/images/hat-images/5_violet.png")
              }
              resizeMode="contain"
              style={styles.arrowImage5}
            />
          </Pressable>
        </View>

        <View style={styles.indicationContainer}>
          <Text style={styles.indicationTitle}>
            {i18n.t("INDICATION_TITLE")}
          </Text>
          <Switch
            trackColor={{ true: colors.bgColor }}
            thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
            ios_backgroundColor={colors.steelGrey}
            value={mode}
            onValueChange={toggleSwitch}
            style={styles.switchIndication}
          />
        </View>
      </View>
      <View style={styles.actionHeaderContainer}>
        <Text style={styles.actionTitle}>
          {i18n.t("AE8", { defaultValue: "Action" })}
        </Text>
      </View>

      <View style={styles.hygieneContainer}>
        <Pressable
          style={{
            ...styles.actionButton,
            borderColor: borderColorRub,
            backgroundColor: bgColorRub,
          }}
          onPress={handleRubClick}
        >
          <Text style={{ ...styles.buttonName, color: colorTextRub }}>
            {i18n.t("AE9", { defaultValue: "Rub" })}
          </Text>
        </Pressable>

        <Pressable
          style={{
            ...styles.actionButton,
            borderColor: borderColorWash,
            backgroundColor: bgColorWash,
          }}
          onPress={handleWashClick}
        >
          <Text style={{ ...styles.buttonName, color: colorTextWash }}>
            {i18n.t("A10", { defaultValue: "Wash" })}
          </Text>
        </Pressable>

        <Pressable
          style={{
            ...styles.actionButton,
            borderColor: borderColorMissed,
            backgroundColor: bgColorMissed,
          }}
          onPress={handleMissedClick}
        >
          <Text style={{ ...styles.buttonName, color: colorTextMissed }}>
            {i18n.t("A11", { defaultValue: "Missed" })}
          </Text>
        </Pressable>

        <Pressable
          style={{
            ...styles.actionButton,
            borderColor: borderColorGlovesAdd,
            backgroundColor: bgColorGlovesAdd,
          }}
          onPress={handleGlovesAddClick}
        >
          <Text style={{ ...styles.buttonName, color: colorTextGlovesAdd }}>
            {i18n.t("AE12", { defaultValue: "Gloves" })}
          </Text>
        </Pressable>

        <Pressable
          style={{
            ...styles.actionButton,
            borderColor: borderColorGlovesAdd,
            backgroundColor: bgColorGlovesAdd,
          }}
        >
          <EntypoIcon name="plus" size={24} color={colorTextGlovesAdd} />
        </Pressable>
      </View>

      {showRubbingCompound ? (
        <View style={styles.obligatoryContainer}>
          <DropdownList
            options={RubbingCompoundType}
            dropdownlistStyle={[
              styles.dropdownlistContainer,
              styles.dropdownlistActionContainer,
            ]}
            right={<ArrowIcon name="caretdown" size={10} color="gray" />}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.obligatoryText}>FOO BAR</Text>
            <Switch
              trackColor={{ true: colors.bgColor }}
              thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
              ios_backgroundColor={colors.textColor}
              value={mode}
              onValueChange={toggleSwitch}
            />
          </View>
        </View>
      ) : null}

      <View style={styles.controlContainer}>
        <Pressable
          style={styles.controlButton}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.controlButtonTitle}>
            {i18n.t("ADD28", { defaultValue: "Move" })}
          </Text>
          <ArrowIcon name="arrowleft" size={12} color="white" />
        </Pressable>

        <Pressable style={styles.controlButton}>
          <Text style={styles.controlButtonTitle}>
            {i18n.t("ADD29", { defaultValue: "Stop" })}
          </Text>
          <EntypoIcon name="cross" size={12} color="white" />
        </Pressable>

        <Pressable style={styles.controlButton}>
          <Text style={styles.controlButtonTitle}>
            {i18n.t("AE13", { defaultValue: "Submit" })}
          </Text>
          <ArrowIcon name="arrowright" size={12} color="white" />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = createStyleSheet({
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

export default MainScreen;
