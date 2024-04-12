import Introduction from "@components/Introduction";
import React from "react";
import { SafeAreaView } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

const IntroductionScreen = () => {
  return (
    <SafeAreaView style={stylesheet.container}>
      <Introduction />
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default IntroductionScreen;
