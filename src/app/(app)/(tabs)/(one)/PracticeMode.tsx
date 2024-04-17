import { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AntDesign as Icon } from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";

function PracticeMode() {
  const { styles } = useStyles(stylesheet);

  const [numberOpportunities, setNumberOpportunities] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.practiceModeContainer}>
          <Icon name="infocirlce" color={colors.cerulean} size={25} />
          <Text variant="bodyLarge" style={styles.practiceNoteText}>
            NOTE: You are on practice mode.
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            keyboardType="numeric"
            label="Number of Opportunities for this Audit:"
            value={numberOpportunities}
            onChangeText={(text) => setNumberOpportunities(text)}
            contentStyle={styles.textInput}
            theme={{
              colors: {
                placeholder: colors.steelGrey,
                primary: colors.steelGrey,
              },
            }}
            underlineColor={colors.whiteSmoke}
            underlineColorAndroid={colors.midNight}
            textColor={colors.midNight}
          />
          <Button
            mode="outlined"
            style={styles.practiceModeButton}
            onPress={() => {
              console.log("Clicked!");
            }}
          >
            <Text variant="bodyLarge">
              {i18n.t("Y3", { defaultValue: "Begin Audit" })}
            </Text>
            <Icon name="arrowright" size={14} color="white" />
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  textInputContainer: {
    width: "95%",
    marginTop: 20,
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 0.4,
    borderColor: colors.cadetGrey,
    height: 80,
    borderRadius: 2,
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
  practiceModeButton: {
    backgroundColor: colors.bgColor,
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 4,
    padding: 4,
  },
});

export default PracticeMode;
