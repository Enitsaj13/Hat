import { i18n } from "@i18n/index";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const IntroductionScreen = () => {
  const { styles } = useStyles(stylesheet);

  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          variant="headlineLarge"
          style={[
            styles.title,
            {
              color: theme.colors.onPrimary,
            },
          ]}
        >
          What gets measured gets done.
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text variant="bodyLarge" style={{ color: theme.colors.onPrimary }}>
          {i18n.t("A4", {
            defaultValue:
              'This tool was developed by B. Braun to help infection control practitioners monitor compliance according to the WHO "My 5 Moments for Hand Hygiene".This tool simplifies and standardizes the whole process from data collection to reports generation, reducing manpower and enhancing productivity.',
          })}
        </Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.onPrimary }}>
          {i18n.t("A5", {
            defaultValue: `\nContact your local B. Braun representative or email hhat@bbraun.com to register and activate this App.`,
          })}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    marginVertical: 20,
  },
  title: {
    fontWeight: "500",
  },
  descriptionContainer: {
    paddingHorizontal: 20,
  },
});

export default IntroductionScreen;