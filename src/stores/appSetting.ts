import { Model } from "@nozbe/watermelondb";
import { text, writer } from "@nozbe/watermelondb/decorators";

export class AppSetting extends Model {
  static table = "app_settings";

  // @ts-expect-error
  @text("data_privacy_url") dataPrivacyUrl: string;

  // @ts-expect-error
  @text("terms_of_use_url") termsOfUseUrl: string;

  // @ts-expect-error
  @text("language") language: string;

  @writer
  async saveLanguage(language: string) {
    await this.update((appSetting) => {
      appSetting.language = language;
    });
  }
}
