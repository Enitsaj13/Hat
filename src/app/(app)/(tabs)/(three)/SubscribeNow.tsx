import React, { useCallback } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ISubscribeNowSchema,
  subcribeNowSchema,
  subscribeNow,
} from "@services/subscribeNow";

const SubscribeNowScreen = () => {
  const { styles } = useStyles(stylesheet);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isLoading, isValid, isSubmitSuccessful },
  } = useForm<ISubscribeNowSchema>({
    resolver: yupResolver(subcribeNowSchema),
  });

  if (isSubmitSuccessful) {
    reset();
  }

  const submitForm = useCallback(async (form: ISubscribeNowSchema) => {
    try {
      await subscribeNow(form);
      Alert.alert(
        i18n.t("R3", { defaultValue: "Successful" }),
        i18n.t("ADD12", { defaultValue: "Your message successfully sent." }),
        [
          {
            text: "OK",
            onPress: () => {
              reset({
                name: "",
                contactNumber: "",
                email: "",
                designation: "",
                department: "",
                hospital: "",
                numberOfBeds: "" as any,
                address: "",
                country: "",
              });
            },
          },
        ],
      );
    } catch (e) {
      console.log("error occurred while submitting a subscribe now form", e);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -150}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textInputContainer}>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("B3", { defaultValue: "Name" }) +
                  (invalid ? `(${error?.message})` : "")
                }
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
            name="name"
            control={control}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("B4", { defaultValue: "Contact Number" }) +
                  (invalid ? `(${error?.message})` : "")
                }
                keyboardType="phone-pad"
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
            name="contactNumber"
            control={control}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("D1", { defaultValue: "Email Address" }) +
                  (invalid ? `(${error?.message})` : "")
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
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("B5", { defaultValue: "Designation" }) +
                  (invalid ? `(${error?.message})` : "")
                }
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
            name="designation"
            control={control}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("B6", { defaultValue: "Department" }) +
                  (invalid ? `(${error?.message})` : "")
                }
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
            name="department"
            control={control}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("B7", { defaultValue: "Hospital" }) +
                  (invalid ? `(${error?.message})` : "")
                }
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
            name="hospital"
            control={control}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("B8", { defaultValue: "No. of Beds" }) +
                  (invalid ? `(${error?.message})` : "")
                }
                value={value?.toString()}
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
            name="numberOfBeds"
            control={control}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("B9", { defaultValue: "Address" }) +
                  (invalid ? `(${error?.message})` : "")
                }
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
            name="address"
            control={control}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                label={
                  i18n.t("B10", { defaultValue: "Country" }) +
                  (invalid ? `(${error?.message})` : "")
                }
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
            name="country"
            control={control}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            style={styles.subscribeButton}
            onPress={handleSubmit(submitForm)}
            loading={isLoading}
            disabled={isLoading && !isValid}
          >
            {i18n.t("B11", { defaultValue: "SEND MESSAGE" })}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  textInputContainer: {
    marginTop: "5%",
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

export default SubscribeNowScreen;
