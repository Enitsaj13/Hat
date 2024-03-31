import DropdownListButton from "@components/DropdownList";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDefaultLanguage, i18n } from "@i18n/index";
import { languages } from "@i18n/languages";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { ILoginSchema, login, loginSchema } from "@services/login";
import { AppSetting } from "@stores/appSetting";
import { database } from "@stores/index";
import { colors } from "@theme/index";
import { router } from "expo-router";
import isEmpty from "lodash.isempty";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useSession } from "../auth";

interface SignInProps {
  appSettings: AppSetting[];
}

function Component({ appSettings }: SignInProps) {
  const { styles } = useStyles(stylesheet);
  const { signIn } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ILoginSchema>({ resolver: yupResolver(loginSchema) });

  const onLoginPress = useCallback(async function (form: ILoginSchema) {
    const result = await login(form);
    if (isEmpty(result.token)) {
      Alert.alert(
        i18n.t("S11", { defaultValue: "Failed" }),
        result.messageFromServer || result.message,
      );
    } else {
      signIn(result.token!);
      router.replace("/");
    }
  }, []);

  console.log("appSettings in signin", appSettings);
  const saveSelectedLanguage = useCallback(
    async (languageCode: string) => {
      if (isEmpty(appSettings)) {
        await database.write(async () => {
          await database
            .get<AppSetting>("app_settings")
            .create((appSetting) => {
              appSetting.language = languageCode;
              appSetting.dataPrivacyUrl = "";
              appSetting.termsOfUseUrl = "";
            });
        });
      } else {
        await appSettings[0].saveLanguage(languageCode);
      }
    },
    [appSettings],
  );

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
        <Button
          mode="contained"
          onPress={handleSubmit(onLoginPress)}
          loading={isLoading}
          disabled={isLoading}
        >
          {i18n.t("D3", { defaultValue: "LOGIN" })}
        </Button>
      </View>
      <View style={styles.languageContainer}>
        <Text variant="titleMedium" style={styles.languageText}>
          {i18n.t("D0", { defaultValue: "Language" })}
        </Text>
        <DropdownListButton
          options={languages}
          selectedOptionKey={getDefaultLanguage(appSettings)}
          onOptionSelected={(key) => saveSelectedLanguage(key as string)}
          buttonStyle={styles.languageButton}
        />
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
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgColor, // TODO workaround as ThemeProvider does not work
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  languageButton: { minWidth: 150 },
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

type WithObservableProps = ObservableifyProps<SignInProps, "appSettings">;
const SignInScreen = withObservables(
  ["appSettings"],
  (props: WithObservableProps) => ({
    appSettings: database.get<AppSetting>("app_settings").query(Q.take(1)),
  }),
)(Component);

export default SignInScreen;
