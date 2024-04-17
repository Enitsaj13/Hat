import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";
import { FieldType } from "../types";
import { OptionalField } from "@stores/optionalField";
import { OptionalFieldOption } from "@stores/optionalFieldOption";

export interface OptionalFieldOptionResponse {
  optional_field_option_id: number;
  optional_field_id: number;
  option_name: string;
}

export interface OptionalFieldResponse {
  optional_field_id: number;
  name: string;
  field_type: FieldType;
  options?: OptionalFieldOptionResponse[];
}

// TODO handle 422
export async function getOptionalFields() {
  const result = await axiosInstance.get<OptionalFieldResponse[]>(
    "/mobile/optional-fields",
  );
  const db = database.get<OptionalField>("optional_fields");
  const dbOptionalOption = database.get<OptionalFieldOption>(
    "optional_field_options",
  );
  const response = result.data;

  await database.write(async () => {
    const operations: any[] = [];
    const existing = await db.query().fetch();

    const existingMap = new Map<number, OptionalField>();
    existing.forEach((i) => existingMap.set(i.serverId, i));

    const newMap = new Map<number, OptionalFieldResponse>();
    response.forEach((i) => newMap.set(i.optional_field_id, i));

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
            newData.serverId = response.optional_field_id;
            newData.name = response.name;
            newData.fieldType = response.field_type;

            response.options?.forEach((responseOption) => {
              operations.push(
                dbOptionalOption.prepareCreate((option) => {
                  option.serverId = responseOption.optional_field_option_id;
                  option.name = responseOption.option_name;

                  option.optionalFieldServerId = response.optional_field_id;
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
          }),
        );

        const existingOptionMap = new Map<number, OptionalFieldOption>();
        existingOptionMap.forEach((i) => existingOptionMap.set(i.serverId, i));

        const newOptionMap = new Map<number, OptionalFieldOptionResponse>();
        response.options?.forEach((i) =>
          newOptionMap.set(i.optional_field_option_id, i),
        );

        for (const [serverId, existingOption] of existingOptionMap.entries()) {
          if (!newOptionMap.has(serverId)) {
            operations.push(existingOption.prepareDestroyPermanently());
          }
        }

        for (const [optionId, responseOption] of newOptionMap.entries()) {
          if (!existingOptionMap.has(optionId)) {
            operations.push(
              dbOptionalOption.prepareCreate((newData) => {
                newData.serverId = responseOption.optional_field_option_id;
                newData.name = responseOption.option_name;
                newData.optionalFieldServerId = response.optional_field_id;
              }),
            );
          } else {
            const existingOption = existingOptionMap.get(id);
            operations.push(
              existingOption?.prepareUpdate((e) => {
                e.name = responseOption.option_name;
              }),
            );
          }
        }
      }
    }

    await database.batch(operations);
  });
}
