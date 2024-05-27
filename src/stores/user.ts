import { Model } from "@nozbe/watermelondb";
import { field, text, writer } from "@nozbe/watermelondb/decorators";
export class User extends Model {
  static table = "users";

  // @ts-expect-error
  @text("first_name") firstName: string;

  // @ts-expect-error
  @text("last_name") lastName: string;

  // @ts-expect-error
  @text("email") email: string;

  // @ts-expect-error
  @text("company_name") companyName: string;

  // @ts-expect-error
  @field("has_accepted_app_privacy") hasAcceptedAppPrivacy: boolean;

  // @ts-expect-error
  @text("group_code") groupCode: string;

  // @ts-expect-error
  @text("password") password: string;

  @writer
  async updateUserHasAcceptedAppPrivacy(hasAcceptedAppPrivacy: boolean) {
    await this.update((user) => {
      user.hasAcceptedAppPrivacy = hasAcceptedAppPrivacy;
    });
  }

  @writer
  async updatePassword(newPassword: string) {
    await this.update((user) => {
      user.password = newPassword;
    });
  }
}
