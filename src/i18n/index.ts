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

interface DateFormatOptions {
  month: "numeric" | "2-digit" | "short" | "long";
  day: "numeric" | "2-digit";
  year: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  hour12?: boolean;
}

interface I18nOptions {
  countFormatOptions: { precision: number };
  percentageFormatOptions: { precision: number };
  dateFormatOptions: DateFormatOptions;
}

export const i18nOptions: I18nOptions = {
  countFormatOptions: { precision: 0 },
  percentageFormatOptions: { precision: 2 },
  dateFormatOptions: {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  },
};
