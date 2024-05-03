import React, { useCallback } from "react";
import { Alert, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forgotPasswordSchema,
  IForgotPasswordSchema,
  resetPassword,
} from "@services/resetPassword";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const { styles } = useStyles(stylesheet);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isLoading, isValid, isSubmitSuccessful },
  } = useForm<IForgotPasswordSchema>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const router = useRouter();
  const submitForm = useCallback(async (form: IForgotPasswordSchema) => {
    try {
      const data = await resetPassword(form);
      Alert.alert(i18n.t("R3", { defaultValue: "Successful" }), data.message, [
        {
          text: "OK",
          onPress: router.back,
        },
      ]);
    } catch (e) {
      console.log("forgot password error", JSON.stringify(e));
      Alert.alert(
        i18n.t("S11", { defaultValue: "Failed" }),
        i18n.t("ADD11", {
          defaultValue:
            "Reset Password: An error occurred while processing, Please try again.",
        }),
      );
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          {i18n.t("F1", { defaultValue: "Password Recovery" })}
        </Text>
        <Controller
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error },
          }) => (
            <TextInput
              label={
                i18n.t("D1", { defaultValue: "Email Address" }) +
                (invalid ? ` (${error?.message})` : "")
              }
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={invalid}
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
          )}
          name="email"
          control={control}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            style={styles.subscribeButton}
            onPress={handleSubmit(submitForm)}
            loading={isLoading}
            disabled={isLoading && !isValid}
          >
            {i18n.t("F3", { defaultValue: "Reset Password" })}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontWeight: "500",
    color: colors.midNight,
  },
  textInputContainer: {
    width: "95%",
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 0.4,
    borderColor: colors.cadetGrey,
  },
  buttonContainer: {
    width: "95%",
  },
  subscribeButton: {
    backgroundColor: colors.bgColor,
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
});

export default ForgotPasswordScreen;
