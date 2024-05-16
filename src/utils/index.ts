import dayjs from "dayjs";
import { i18n } from "@i18n/index";

export function formatDate(date: Date) {
  return dayjs(date, "YYYY-MM-DD hh:mm:ss", i18n.locale).format("LL");
}
