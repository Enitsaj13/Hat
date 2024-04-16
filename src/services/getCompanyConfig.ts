import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";
import { CompanyConfig } from "@stores/companyConfig";
import { InstitutionAction } from "@stores/institutionAction";

export interface CompanyActionResponse {
  action: string;
  action_code: string;
  sort: number;
  show_flag: number;
  checked: boolean;
}

export interface CompanyConfigResponse {
  cid: number;
  indication_field_flag: number;
  obligatory_fields_flag: number;
  optional_fields_flag: number;
  enable_audit_types_flag: number;
  actions?: CompanyActionResponse[] | undefined; // TODO already requested to aljon to make this an empty array instead of undefined
}

export async function getCompanyConfig() {
  const result = await axiosInstance.get<CompanyConfigResponse>(
    "/mobile/company-config",
  );
  const dbCompanyConfig = database.get<CompanyConfig>("company_configs");
  const dbInstitutionActions = database.get<InstitutionAction>(
    "institution_actions",
  );
  const response = result.data;

  await database.write(async () => {
    const operations: any[] = [];

    const existingCompanyConfigs = await dbCompanyConfig.query().fetch();
    existingCompanyConfigs.forEach((i) =>
      operations.push(i.prepareDestroyPermanently()),
    );

    const existingDbInstitutionActions = await dbInstitutionActions
      .query()
      .fetch();
    existingDbInstitutionActions.forEach((i) =>
      operations.push(i.prepareDestroyPermanently()),
    );

    operations.push(
      dbCompanyConfig.prepareCreate((newData) => {
        newData.enableIndicationField = response.indication_field_flag === 1;
        newData.enableObligatoryFields = response.obligatory_fields_flag === 1;
        newData.enableOptionalFields = response.optional_fields_flag === 1;
        newData.enableAuditTypes = response.enable_audit_types_flag === 1;
      }),
    );

    // TODO when this becomes an empty array, remove the null check
    response.actions?.forEach((i) => {
      operations.push(
        dbInstitutionActions.prepareCreate((newData) => {
          newData.action = i.action;
          newData.action_code = i.action_code;
          newData.sort = i.sort;
          newData.checked = i.checked;
        }),
      );
    });

    await database.batch(operations);
  });
}
