import DropdownList from "@components/DropdownList";
import { AntDesign as Icon } from "@expo/vector-icons";
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
import { of, switchMap } from "rxjs";

import { useSession } from "../auth";

interface SignInProps {
  appSetting: AppSetting;
}

function Component({ appSetting }: SignInProps) {
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
      router.replace("./(app)/(tabs)");
    }
  }, []);

  console.log("language in signin", appSetting?.language);
  const saveSelectedLanguage = useCallback(
    async (languageCode: string) => {
      if (isEmpty(appSetting)) {
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
        await appSetting.saveLanguage(languageCode);
      }
    },
    [appSetting],
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
              left={<TextInput.Icon icon="account" color="white" />}
              error={!isEmpty(errors.email?.message)}
              theme={{ colors: { onSurfaceVariant: "white" } }}
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
              left={<TextInput.Icon icon="key-variant" color="white" />}
              error={!isEmpty(errors.password?.message)}
              theme={{ colors: { onSurfaceVariant: "white" } }}
            />
          )}
          name="password"
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <Button
          textColor="white"
          mode="contained"
          onPress={handleSubmit(onLoginPress)}
          loading={isLoading}
          disabled={isLoading}
          style={{ backgroundColor: "#047857", borderRadius: 4 }}
        >
          {i18n.t("D3", { defaultValue: "LOGIN" })}
        </Button>
      </View>
      <View style={styles.languageContainer}>
        <Text variant="titleMedium" style={styles.languageText}>
          {i18n.t("D0", { defaultValue: "Language" })}
        </Text>
        <DropdownList
          options={languages}
          selectedOptionKey={getDefaultLanguage(appSetting)}
          onOptionSelected={(key) => saveSelectedLanguage(key as string)}
          dropdownlistStyle={styles.languageButtonContainer}
          right={
            <Icon
              name="caretdown"
              size={12}
              color="gray"
              style={{ marginLeft: 20 }}
            />
          }
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
  languageButtonContainer: {
    minWidth: 170,
    backgroundColor: "white",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  languageContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  languageButton: {
    minWidth: 170,
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

type WithObservableProps = ObservableifyProps<SignInProps, "appSetting">;
const SignInScreen = withObservables(
  ["appSetting"],
  (props: WithObservableProps) => ({
    appSetting: database
      .get<AppSetting>("app_settings")
      .query(Q.take(1))
      .observe()
      .pipe(
        switchMap((appSettings) =>
          appSettings.length > 0 ? appSettings[0].observe() : of(null),
        ),
      ),
  }),
)(Component as any); // as any here is workaround on typescript complaining between Observable<AppSetting> and AppSetting

export default SignInScreen;
