import { useRouter } from "expo-router";
import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const TermsOfUseScreen = () => {
  const { styles } = useStyles(stylesheet);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.descriptionContainer}
        showsVerticalScrollIndicator
      >
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          1. Terms of Use
        </Text>
        <Text variant="bodyLarge">
          The following Terms of Use apply to your use of the B. Braun Apps of
          the B. Braun Group of Companies (referred to herein as *B. Braun*): As
          a result of downloading and using a B. Braun App for the first time,
          you accept the following Terms of Use for the use of our app. You
          further accept that no other terms and conditions, whether express or
          implied, shall apply to your use of our apps.
        </Text>
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          2. Essential Features of B. Braun Apps
        </Text>
        <Text variant="bodyLarge">
          As a user of B. Braun Apps, you have access to information and
          documents and the opportunity to have direct contact with the staff of
          B. Braun. The essential feaures of B. Braun Apps are:
        </Text>
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          2.1 Saving Data Locally
        </Text>
        <Text variant="bodyLarge">
          With the B. Braun Apps you have the opportunity of synchronising and
          annotating content on your tablet device, and to save them locally on
          a tempary basis.
        </Text>
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          2.2 Advertising
        </Text>
        <Text variant="bodyLarge">
          B. Braun reserves the right to set up advertisements, or banner
          advertising, within the B. Braun Apps.
        </Text>
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          2.3 Receiving Targeted Information
        </Text>
        <Text variant="bodyLarge">
          If registration is required to enable expanded content for one of the
          B. Braun Apps, you expressly agree at the time of registration that B.
          Braun may send you targeted information and advertising offers on
          products and services, and the Apps provided by B. Braun. by email or
          mail, and that the personal details you provided during registration
          may be saved and processed for this purpose of B. Braun.
        </Text>
      </ScrollView>
      <View style={styles.termsButtons}>
        <Button mode="contained" icon="close" onPress={() => router.back()}>
          Disagree
        </Button>
        <Button
          mode="contained"
          icon="check"
          onPress={() => console.log("Agree")}
        >
          Agree
        </Button>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionContainer: {
    gap: 10,
    padding: 20,
  },
  termsButtons: {
    flexDirection: "row",
    gap: 100,
    padding: 10,
  },
});

export default TermsOfUseScreen;
