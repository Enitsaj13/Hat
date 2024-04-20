import { Model } from "@nozbe/watermelondb";
import { field, immutableRelation, text } from "@nozbe/watermelondb/decorators";
import { ObligatoryField } from "@stores/obligatoryField";

export class ObligatoryFieldOption extends Model {
  static table = "obligatory_field_options";

  static associations = {
    obligatory_fields: { type: "belongs_to", key: "server_id" },
  } as const;

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  // @ts-expect-error
  @field("sort") sort: number;

  @immutableRelation("obligatory_fields", "obligatory_field_server_id")
  // @ts-expect-error
  parent: ObligatoryField;

  // this is to enable saving on batch update
  // @ts-expect-error
  @field("obligatory_field_server_id") obligatoryFieldServerId: number;
}
