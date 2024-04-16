import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class Location extends Model {
  static table = "locations";

  // static associations = {
  //   children: { type: "has_many", foreignKey: "parent_server_id" },
  // } as const;

  // @ts-expect-error
  @field("server_id") serverId: number;

  // @ts-expect-error
  @text("name") name: string;

  // @ts-expect-error
  @field("sort") sort: number;

  @field("parent_server_id") parentServerId?: number | undefined;

  // @children("locations") children?: Location[];
}
