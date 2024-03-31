import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class Worker extends Model {
  static table = "workers";

  // @ts-expect-error
  @text("server_id") serverId: string;

  // @ts-expect-error
  @text("name") name: string;

  // @ts-expect-error
  @field("list_order") listOrder: number;
}
