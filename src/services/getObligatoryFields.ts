import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";
import { ObligatoryField } from "@stores/obligatoryField";
import { FieldType } from "../types";
import { ObligatoryFieldOption } from "@stores/obligatoryFieldOption";

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

// TODO handle 422
export async function getObligatoryFields() {
  const result = await axiosInstance.get<ObligatoryFieldResponse[]>(
    "/mobile/obligatory-fields",
  );
  const db = database.get<ObligatoryField>("obligatory_fields");
  const dbObligatoryOption = database.get<ObligatoryFieldOption>(
    "obligatory_field_options",
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
        existing.options?.forEach((i) =>
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
        const existing = existingMap.get(id);
        operations.push(
          existing?.prepareUpdate((e) => {
            e.name = response.name;
            e.fieldType = response.field_type;
            e.sort = response.obligatory_field_sort;
            e.isAllActionRequired = response.is_all_required === 1;
            e.actions = response.actions;
          }),
        );

        const existingOptionMap = new Map<number, ObligatoryFieldOption>();
        existingOptionMap.forEach((i) => existingOptionMap.set(i.serverId, i));

        const newOptionMap = new Map<number, ObligatoryFieldOptionResponse>();
        response.options?.forEach((i) => newOptionMap.set(i.id, i));

        for (const [serverId, existingOption] of existingOptionMap.entries()) {
          if (!newOptionMap.has(serverId)) {
            operations.push(existingOption.prepareDestroyPermanently());
          }
        }

        for (const [optionId, responseOption] of newOptionMap.entries()) {
          if (!existingOptionMap.has(optionId)) {
            operations.push(
              dbObligatoryOption.prepareCreate((newData) => {
                newData.serverId = responseOption.id;
                newData.name = responseOption.option_name;
                newData.sort = responseOption.sort;
                newData.obligatoryFieldServerId = response.id;
              }),
            );
          } else {
            const existingOption = existingOptionMap.get(id);
            operations.push(
              existingOption?.prepareUpdate((e) => {
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
}
