import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";
import { ObligatoryField } from "@stores/obligatoryField";
import { FieldType } from "../types";
import { ObligatoryFieldOption } from "@stores/obligatoryFieldOption";
import { Q } from "@nozbe/watermelondb";
import axios, { HttpStatusCode } from "axios/index";

export interface ObligatoryFieldOptionResponse {
  id: number;
  option_name: string;
  sort: number;
}

export interface ObligatoryFieldResponse {
  id: number;
  name: string;
  field_type: FieldType;
  obligatory_field_sort: number;
  is_all_required: number;
  actions: string[];
  options?: ObligatoryFieldOptionResponse[];
}

export async function getObligatoryFields() {
  const db = database.get<ObligatoryField>("obligatory_fields");
  const dbObligatoryOption = database.get<ObligatoryFieldOption>(
    "obligatory_field_options",
  );

  try {
    const result = await axiosInstance.get<ObligatoryFieldResponse[]>(
      "/mobile/obligatory-fields",
    );
    const response = result.data;

    await database.write(async () => {
      const operations: any[] = [];
      const existing = await db.query().fetch();

      const existingMap = new Map<number, ObligatoryField>();
      existing.forEach((i) => existingMap.set(i.serverId, i));

      const newMap = new Map<number, ObligatoryFieldResponse>();
      response.forEach((i) => newMap.set(i.id, i));

      for (const [serverId, existing] of existingMap.entries()) {
        if (!newMap.has(serverId)) {
          const existingOptions = await dbObligatoryOption
            .query(Q.where("obligatory_field_server_id", existing.serverId))
            .fetch();
          existingOptions.forEach((i) =>
            operations.push(i.prepareDestroyPermanently()),
          );
          operations.push(existing.prepareDestroyPermanently());
        }
      }

      for (const [id, response] of newMap.entries()) {
        if (!existingMap.has(id)) {
          operations.push(
            db.prepareCreate((newData) => {
              newData.serverId = response.id;
              newData.name = response.name;
              newData.fieldType = response.field_type;
              newData.sort = response.obligatory_field_sort;
              newData.isAllActionRequired = response.is_all_required === 1;
              newData.actions = response.actions;

              response.options?.forEach((responseOption) => {
                operations.push(
                  dbObligatoryOption.prepareCreate((option) => {
                    option.serverId = responseOption.id;
                    option.name = responseOption.option_name;
                    option.sort = responseOption.sort;

                    option.obligatoryFieldServerId = response.id;
                  }),
                );
              });
            }),
          );
        } else {
          const existing = existingMap.get(id)!;
          operations.push(
            existing.prepareUpdate((e) => {
              e.name = response.name;
              e.fieldType = response.field_type;
              e.sort = response.obligatory_field_sort;
              e.isAllActionRequired = response.is_all_required === 1;
              e.actions = response.actions;
            }),
          );

          const existingOptionMap = new Map<number, ObligatoryFieldOption>();
          const existingOptions = await dbObligatoryOption
            .query(Q.where("obligatory_field_server_id", existing.serverId))
            .fetch();
          existingOptions.forEach((i) => existingOptionMap.set(i.serverId, i));

          const newOptionMap = new Map<number, ObligatoryFieldOptionResponse>();
          response.options?.forEach((i) => newOptionMap.set(i.id, i));

          for (const [
            optionServerId,
            existingOption,
          ] of existingOptionMap.entries()) {
            if (!newOptionMap.has(optionServerId)) {
              operations.push(existingOption.prepareDestroyPermanently());
            }
          }

          for (const [
            responseOptionId,
            responseOption,
          ] of newOptionMap.entries()) {
            if (!existingOptionMap.has(responseOptionId)) {
              operations.push(
                dbObligatoryOption.prepareCreate((newData) => {
                  newData.serverId = responseOption.id;
                  newData.name = responseOption.option_name;
                  newData.sort = responseOption.sort;
                  newData.obligatoryFieldServerId = response.id;
                }),
              );
            } else {
              const existingOption = existingOptionMap.get(responseOptionId)!;
              operations.push(
                existingOption.prepareUpdate((e) => {
                  e.name = responseOption.option_name;
                  e.sort = responseOption.sort;
                }),
              );
            }
          }
        }
      }

      await database.batch(operations);
    });
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === HttpStatusCode.UnprocessableEntity
    ) {
      await database.write(async () => {
        const operations: any[] = [];
        const obligatoryFields = await db.query().fetch();

        for (const existing of obligatoryFields) {
          const existingOptions = await dbObligatoryOption
            .query(Q.where("obligatory_field_server_id", existing.serverId))
            .fetch();
          for (const existingOption of existingOptions) {
            operations.push(existingOption.prepareMarkAsDeleted());
          }
          operations.push(existing.prepareMarkAsDeleted());
        }

        await database.batch(operations);
      });
    } else {
      return error;
    }
  }
}
