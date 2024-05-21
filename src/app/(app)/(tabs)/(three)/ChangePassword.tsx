import React, { useCallback } from "react";
import { View, Alert } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import { Button, TextInput, Text } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  changePassword,
  changePasswordSchema,
  IChangePasswordSchema,
} from "@services/changePassword";

const ChangePassword = () => {

  const {
    control,
    reset,
    handleSubmit,
    formState: { isLoading, isValid, isSubmitSuccessful },
  } = useForm<IChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onChange', // Validate on change
    criteriaMode: 'all', // Show all validation errors
  });

  if (isSubmitSuccessful) {
    reset();
  }

  const submitForm = useCallback(async (form: IChangePasswordSchema) => {
    try {
      await changePassword(form);
      Alert.alert(
        i18n.t("R3", { defaultValue: "Successful" }),
        i18n.t("ADD12", { defaultValue: "" }),
        [
          {
            text: "OK",
            onPress: () => {
              reset({
                currentPassword: "",
                newPassword: "",
                retypePassword: "",
              });
            },
          },
        ],
      );
    } catch (e) {
      console.log("", e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="bodyLarge" style={styles.changePasswordTitle}>
          {i18n.t("Q7", { defaultValue: "Change Password" })}
        </Text>
      </View>

      <Controller
        render={({
          field: { onChange, onBlur, value },
          fieldState: { invalid, error },
        }) => (
          <>
            <TextInput
              label={i18n.t("Q8", { defaultValue: "Current Password" })}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
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
            {invalid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {invalid ? ` (${error?.message})` : ""}
                </Text>
              </View>
            )}
          </>
        )}
        name="currentPassword"
        control={control}
      />
      <Controller
        render={({
          field: { onChange, onBlur, value },
          fieldState: { invalid, error },
        }) => (
          <>
            <TextInput
              label={i18n.t("Q9", { defaultValue: "New Password" })}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
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
            {invalid === true ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {invalid ? ` (${error?.message})` : ""}
                </Text>
              </View>
            ) : null}
          </>
        )}
        name="newPassword"
        control={control}
      />
      <Controller
        render={({
          field: { onChange, onBlur, value },
          fieldState: { invalid, error },
        }) => (
          <>
            <TextInput
              label={i18n.t("Q10", { defaultValue: "Retype Password" })}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
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
            {invalid && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {invalid ? ` (${error?.message})` : ""}
                </Text>
              </View>
            )}
          </>
        )}
        name="retypePassword"
        control={control}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          style={styles.changePasswordButton}
          onPress={handleSubmit(submitForm)}
          loading={isLoading}
          disabled={isLoading && !isValid}
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
  errorContainer: {
    backgroundColor: colors.textColor,
    padding: 10
  },
  errorText: {
    color: colors.red,
    fontSize: 16
  }
});
