import { AppSetting } from "@stores/appSetting";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import { translations } from "./multilanguage";

export const i18n = new I18n(translations);

export function getDefaultLanguage(appSetting: AppSetting) {
  return (
    appSetting?.language || Localization.getLocales()[0].languageCode || "en"
  );
}

export const i18nOptions = {
  countFormatOptions: { precision: 0 },
  percentageFormatOptions: { precision: 2 },
};
