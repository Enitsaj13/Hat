import { Model } from "@nozbe/watermelondb";
import { field, immutableRelation, text } from "@nozbe/watermelondb/decorators";
import { OptionalField } from "@stores/optionalField";

export class OptionalFieldOption extends Model {
  static table = "optional_field_options";

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  // this is to enable saving on batch update
  // @ts-expect-error
  @field("optional_field_server_id") optionalFieldServerId: number;
}
