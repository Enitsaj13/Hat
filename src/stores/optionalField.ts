import { Model } from "@nozbe/watermelondb";
import { children, field, text } from "@nozbe/watermelondb/decorators";
import { FieldType } from "../types";
import { OptionalFieldOption } from "@stores/optionalFieldOption";

export class OptionalField extends Model {
  static table = "optional_fields";

  static associations = {
    options: { type: "has_many", foreignKey: "optional_field_server_id" },
  } as const;

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  // @ts-expect-error
  @text("field_type") fieldType: FieldType;

  @children("optional_field_options") options?: OptionalFieldOption[];
}
