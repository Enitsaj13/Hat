import { Model } from "@nozbe/watermelondb";
import { field, json, text, writer } from "@nozbe/watermelondb/decorators";

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

  // @ts-expect-error
  @json("body") body: any;

  // @ts-expect-error
  @text("url") url: string;

  // @ts-expect-error
  @text("type") type: ToSendDatusType;

  // @ts-expect-error
  @text("status") status: SendStatus;

  // for observation & feedback both are
  @text("key") key?: SendStatus;

  @writer
  async updateStatus(status: SendStatus) {
    await this.update((user) => {
      user.status = status;
    });
  }
}
