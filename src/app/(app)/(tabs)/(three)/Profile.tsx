import React from "react";
import { View } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import { Button, TextInput, Text } from "react-native-paper";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="bodyLarge" style={styles.profileTitle}>
          {i18n.t("Q2", { defaultValue: "Account Information" })}
        </Text>
      </View>
      <TextInput
        label={i18n.t("Q3", { defaultValue: "First Name" })}
        value="Developer"
        onChangeText={() => {}}
        theme={{
          colors: {
            placeholder: colors.steelGrey,
            primary: colors.steelGrey,
          },
        }}
        underlineColor={colors.whiteSmoke}
        underlineColorAndroid={colors.whiteSmoke}
        textColor={colors.midNight}
        contentStyle={styles.textInput}
      />
      <TextInput
        label={i18n.t("Q4", { defaultValue: "Last Name" })}
        value="Rocketspin"
        onChangeText={() => {}}
        theme={{
          colors: {
            placeholder: colors.steelGrey,
            primary: colors.steelGrey,
          },
        }}
        underlineColor={colors.whiteSmoke}
        underlineColorAndroid={colors.whiteSmoke}
        textColor={colors.midNight}
        contentStyle={styles.textInput}
      />
      <TextInput
        label={i18n.t("Q5", { defaultValue: "Email Address" })}
        value="developer@rocketspin.ph"
        onChangeText={() => {}}
        theme={{
          colors: {
            placeholder: colors.steelGrey,
            primary: colors.steelGrey,
          },
        }}
        keyboardType="email-address"
        underlineColor={colors.whiteSmoke}
        underlineColorAndroid={colors.whiteSmoke}
        textColor={colors.midNight}
        contentStyle={styles.textInput}
      />
      <TextInput
        label={i18n.t("Q6", { defaultValue: "Address" })}
        value="Malabon City Metro Manila Philippines"
        onChangeText={() => {}}
        theme={{
          colors: {
            placeholder: colors.steelGrey,
            primary: colors.steelGrey,
          },
        }}
        keyboardType="email-address"
        underlineColor={colors.whiteSmoke}
        underlineColorAndroid={colors.whiteSmoke}
        textColor={colors.midNight}
        contentStyle={styles.textInput}
        style={styles.addressInput}
      />
      <View style={styles.buttonContainer}>
        <Button mode="outlined" style={styles.profileButton} onPress={() => {}}>
          <Text variant="bodyLarge">
            {i18n.t("Q11", { defaultValue: "Save Changes" })}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 0.4,
    borderColor: colors.cadetGrey,
  },
  addressInput: {
    height: 80,
  },
  headerContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: colors.lightGray,
    backgroundColor: colors.whiteSmoke,
  },
  profileTitle: {
    color: colors.charcoal,
    textAlign: "left",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 10,
    textTransform: "uppercase",
  },
  buttonContainer: {
    paddingHorizontal: "4%",
  },
  profileButton: {
    backgroundColor: colors.bgColor,
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
});
