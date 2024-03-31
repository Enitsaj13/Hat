import { AppSetting } from "@stores/appSetting";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import isEmpty from "lodash.isempty";

import { translations } from "./multilanguage";

export const i18n = new I18n(translations);

export function getDefaultLanguage(appSettings: AppSetting[]) {
  const appSetting = !isEmpty(appSettings) ? appSettings[0] : null;
  return (
    appSetting?.language || Localization.getLocales()[0].languageCode || "en"
  );
}
