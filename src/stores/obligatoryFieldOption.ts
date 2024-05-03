import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class ObligatoryFieldOption extends Model {
  static table = "obligatory_field_options";

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  // @ts-expect-error
  @field("sort") sort: number;

  // @ts-expect-error
  @field("obligatory_field_server_id") obligatoryFieldServerId: number;
}
