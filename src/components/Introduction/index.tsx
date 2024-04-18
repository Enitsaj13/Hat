import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";

const Introduction = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.introductionContainer}>
        <View style={styles.titleContainer}>
          <Text variant="headlineLarge" style={styles.title}>
            What gets measured gets done.
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {i18n.t("A4", {
              defaultValue:
                'This tool was developed by B. Braun to help infection control practitioners monitor compliance according to the WHO "My 5 Moments for Hand Hygiene".This tool simplifies and standardizes the whole process from data collection to reports generation, reducing manpower and enhancing productivity.',
            })}
          </Text>
        </View>
        <Text style={styles.descriptionText}>
          {i18n.t("A5", {
            defaultValue: `\nContact your local B. Braun representative or email hhat@bbraun.com to register and activate this App.`,
          })}
        </Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  introductionContainer: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    fontWeight: "500",
    color: colors.midNight,
  },
  descriptionContainer: {
    marginVertical: 20,
  },
  contactContainer: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.midNight,
    textAlign: "justify",
  },
});

export default Introduction;
