import { Model } from "@nozbe/watermelondb";
import { field, text, writer } from "@nozbe/watermelondb/decorators";

export class AppSetting extends Model {
  static table = "app_settings";

  // @ts-expect-error
  @text("data_privacy_url") dataPrivacyUrl: string;

  // @ts-expect-error
  @text("terms_of_use_url") termsOfUseUrl: string;

  // @ts-expect-error
  @text("language") language: string;

  // @ts-expect-error
  @field("is_introduction_viewed") isIntroductionViewed: boolean;

  // @ts-expect-error
  @field("disable_practice_mode") disablePracticeMode: boolean;

  @writer
  async saveLanguage(language: string) {
    await this.update((appSetting) => {
      appSetting.language = language;
    });
  }

  @writer
  async updateIntroductionViewed(isIntroductionViewed: boolean) {
    await this.update((appSetting) => {
      appSetting.isIntroductionViewed = isIntroductionViewed;
    });
  }

  @writer
  async updateDisablePracticeMode(disablePracticeMode: boolean) {
    await this.update((appSetting) => {
      appSetting.disablePracticeMode = disablePracticeMode;
    });
  }
}
