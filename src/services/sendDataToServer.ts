import { ToSendDatus } from "@stores/toSendDatus";
import { axiosInstance } from "@services/axios";

export async function sendDataToServer(data: ToSendDatus) {
  console.log("toSendData url", data.url);
  console.log("toSendData", data.body);
  await axiosInstance.post(data.url, data.body);
}
