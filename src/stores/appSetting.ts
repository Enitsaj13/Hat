import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";

export class AppSetting extends Model {
  static table = "app_settings";

  // @ts-expect-error
  @text("data_privacy_url") dataPrivacyUrl: string;

  // @ts-expect-error
  @text("terms_of_use_url") termsOfUseUrl: string;
}
