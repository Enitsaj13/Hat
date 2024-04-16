import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class InstitutionAction extends Model {
  static table = "institution_actions";

  // @ts-expect-error
  @text("action_code") action_code: string;

  // @ts-expect-error
  @text("action") action: string;

  // @ts-expect-error
  @field("sort") sort: number;

  // @ts-expect-error
  @field("checked") checked: boolean;
}
