import { Model } from "@nozbe/watermelondb";
import { field, immutableRelation, text } from "@nozbe/watermelondb/decorators";
import { OptionalField } from "@stores/optionalField";

export class OptionalFieldOption extends Model {
  static table = "optional_field_options";

  static associations = {
    optional_fields: { type: "belongs_to", key: "server_id" },
  } as const;

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  @immutableRelation("optional_fields", "optional_field_server_id")
  // @ts-expect-error
  parent: OptionalField;

  // this is to enable saving on batch update
  // @ts-expect-error
  @field("optional_field_server_id") optionalFieldServerId: number;
}
