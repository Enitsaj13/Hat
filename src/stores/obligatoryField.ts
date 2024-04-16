import { Model } from "@nozbe/watermelondb";
import { children, field, json, text } from "@nozbe/watermelondb/decorators";
import { ObligatoryFieldOption } from "@stores/obligatoryFieldOption";
import { FieldType } from "../types";

export class ObligatoryField extends Model {
  static table = "obligatory_fields";

  static associations = {
    options: { type: "has_many", foreignKey: "obligatory_field_server_id" },
  } as const;

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  // @ts-expect-error
  @text("field_type") fieldType: FieldType;

  // @ts-expect-error
  @field("sort") sort: number;

  // @ts-expect-error
  @field("is_all_action_required") isAllActionRequired: boolean;

  @json("actions", (rawActions) =>
    Array.isArray(rawActions) ? rawActions.map(String) : [],
  )
  // @ts-expect-error
  actions: string[];

  @children("obligatory_field_options") options?: ObligatoryFieldOption[];
}
