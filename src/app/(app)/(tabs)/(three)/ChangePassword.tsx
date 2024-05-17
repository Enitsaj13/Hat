import React from "react";
import { View } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import { Button, TextInput, Text } from "react-native-paper";

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="bodyLarge" style={styles.changePasswordTitle}>
          {i18n.t("Q7", { defaultValue: "Change Password" })}
        </Text>
      </View>
      <TextInput
        label={i18n.t("Q8", { defaultValue: "Current Password" })}
        value=""
        onChangeText={() => { }}
        theme={{
          colors: {
            placeholder: colors.steelGrey,
            primary: colors.steelGrey,
          },
        }}
        secureTextEntry
        underlineColor={colors.whiteSmoke}
        underlineColorAndroid={colors.whiteSmoke}
        textColor={colors.midNight}
        contentStyle={styles.textInput}
      />
      <TextInput
        label={i18n.t("Q9", { defaultValue: "New Password" })}
        value=""
        onChangeText={() => { }}
        theme={{
          colors: {
            placeholder: colors.steelGrey,
            primary: colors.steelGrey,
          },
        }}
        secureTextEntry
        underlineColor={colors.whiteSmoke}
        underlineColorAndroid={colors.whiteSmoke}
        textColor={colors.midNight}
        contentStyle={styles.textInput}
      />
      <TextInput
        label={i18n.t("Q10", { defaultValue: "Retype Password" })}
        value=""
        onChangeText={() => { }}
        theme={{
          colors: {
            placeholder: colors.steelGrey,
            primary: colors.steelGrey,
          },
        }}
        secureTextEntry
        keyboardType="email-address"
        underlineColor={colors.whiteSmoke}
        underlineColorAndroid={colors.whiteSmoke}
        textColor={colors.midNight}
        contentStyle={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          style={styles.changePasswordButton}
          onPress={() => { }}
        >
          <Text variant="bodyLarge">
            {i18n.t("Q11", { defaultValue: "Save Changes" })}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;

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
  changePasswordTitle: {
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
  changePasswordButton: {
    backgroundColor: colors.bgColor,
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
});
