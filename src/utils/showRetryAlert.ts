import { Alert } from "react-native";
import { i18n } from "@i18n/index";

export function showRetryAlert(onOkPress?: () => void) {
  Alert.alert(
    i18n.t("S11", {
      defaultValue: "Failed",
    }),
    i18n.t("ADD25", {
      defaultValue:
        "Your device is offline. Check connectivity settings or move to a new location with stable Internet connection.",
    }),
    [
      {
        text: "OK",
        onPress: onOkPress,
      },
    ],
  );
}
