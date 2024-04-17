import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class OptionalFieldOption extends Model {
  static table = "optional_field_options";

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  // @ts-expect-error
  @field("optional_field_server_id") optionalFieldServerId: number;
}
