import DropdownListButton from "@components/DropdownList/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { i18n } from "@i18n/index";
import { ILoginSchema, login, loginSchema } from "@services/login";
import isEmpty from "lodash.isempty";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View, Image } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const languages = [
  { key: "en", value: "English" },
  { key: "pt", value: "Portugese" },
  { key: "fr", value: "French" },
  { key: "de", value: "Deutsch" },
  { key: "br", value: "Portugese BR" },
  { key: "es", value: "Spanish" },
  { key: "id", value: "Bahasa Indonesia" },
  { key: "cs", value: "Czech" },
  { key: "th", value: "Thai" },
];

const LoginScreen = () => {
  const { styles } = useStyles(stylesheet);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({ resolver: yupResolver(loginSchema) });

  const onLoginPress = useCallback(async function (form: ILoginSchema) {
    const result = await login(form);
    if (isEmpty(result.token)) {
      Alert.alert(
        i18n.t("S11", { defaultValue: "Failed" }),
        result.messageFromServer || result.message,
      );
    } else {
      // TODO redirect here to login stack
      Alert.alert("Success", "TODO redirect here to login stack");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginTitleContainer}>
        <Image
          source={require("@assets/images/hat-images/logo.png")}
          style={styles.loginLogoImage}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={`${i18n.t("Q5", { defaultValue: "Email Address" })}${!isEmpty(errors.email?.message) ? " (" + errors.email?.message + ")" : ""}`}
              value={value}
              keyboardType="email-address"
              onChangeText={onChange}
              onBlur={onBlur}
              left={<TextInput.Icon icon="account" />}
              error={!isEmpty(errors.email?.message)}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={`${i18n.t("D2", { defaultValue: "Password" })}${!isEmpty(errors.password?.message) ? " (" + errors.password?.message + ")" : ""}`}
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              left={<TextInput.Icon icon="bottle-wine" />}
              error={!isEmpty(errors.password?.message)}
            />
          )}
          name="password"
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <Button mode="contained" onPress={handleSubmit(onLoginPress)}>
          {i18n.t("D3", { defaultValue: "LOGIN" })}
        </Button>
      </View>
      <View style={styles.languageContainer}>
        <Text variant="titleMedium" style={styles.languageText}>
          {i18n.t("D0", { defaultValue: "Language" })}
        </Text>
        <DropdownListButton options={languages} />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Button mode="text" onPress={() => Alert.alert("Forgot Password")}>
          {i18n.t("D5", { defaultValue: "Forgot Password?" })}
        </Button>
      </View>
      <View style={styles.footerImageContainer}>
        <Image
          source={require("@assets/images/hat-images/powered.png")}
          style={styles.footerImage}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginTitleContainer: {
    marginBottom: 60,
  },
  textInputContainer: {
    width: "90%",
  },
  loginButtonContainer: {
    justifyContent: "center",
    marginVertical: 20,
    width: "90%",
  },
  languageContainer: {
    flexDirection: "row",
    gap: 70 * 2,
    alignItems: "center",
  },
  languageText: {
    color: "white",
  },
  forgotPasswordContainer: {
    marginVertical: 20,
  },
  loginLogoImage: {
    width: 200,
    height: 100,
  },
  footerImageContainer: {
    marginTop: 20,
  },
  footerImage: {
    width: 100,
    height: 40,
  },
});

export default LoginScreen;
