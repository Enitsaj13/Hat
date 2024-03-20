import { translations } from "./multilanguage";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export const i18n = new I18n(translations);

// TODO the selected local should be on user preference page. temp code
i18n.locale = Localization.getLocales()[0].languageTag;
