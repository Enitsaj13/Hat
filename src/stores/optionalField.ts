import { Model } from "@nozbe/watermelondb";
import { children, field, text } from "@nozbe/watermelondb/decorators";
import { FieldType } from "../types";
import { OptionalFieldOption } from "@stores/optionalFieldOption";

export class OptionalField extends Model {
  static table = "optional_fields";

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  // @ts-expect-error
  @text("field_type") fieldType: FieldType;
}
