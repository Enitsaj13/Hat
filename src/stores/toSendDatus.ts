import { Model } from "@nozbe/watermelondb";
import {
  date,
  json,
  readonly,
  text,
  writer,
  nochange,
} from "@nozbe/watermelondb/decorators";

export enum ToSendDatusType {
  OBSERVATION = "OBSERVATION",
  FEEDBACK = "FEEDBACK",
}

export enum SendStatus {
  IDLE = "IDLE",
  SENDING = "SENDING",
  SENT = "SENT",
  ERROR = "ERROR",
  DO_NOT_SEND = "DO_NOT_SEND",
}
export class ToSendDatus extends Model {
  static table = "to_send_data";

  @nochange @json("body", (json) => json) body: any;

  // @ts-expect-error
  @nochange @text("url") url: string;

  // @ts-expect-error
  @nochange @text("type") type: ToSendDatusType;

  // @ts-expect-error
  @text("status") status: SendStatus;

  // for feedback & observation the key is the observation guid
  @text("key") key?: string;

  // @ts-expect-error
  @readonly @date("created_at") createdAt: Date;

  // @ts-expect-error
  @readonly @date("updated_at") updatedAt: Date;
  @writer
  async updateStatus(status: SendStatus) {
    await this.update((user) => {
      user.status = status;
    });
  }
}
