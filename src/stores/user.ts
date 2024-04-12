import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

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
}