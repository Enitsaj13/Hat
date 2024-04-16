import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export class CompanyConfig extends Model {
  static table = "company_configs";

  // @ts-expect-error
  @field("enable_indication_field") enableIndicationField: boolean;

  // @ts-expect-error
  @field("enable_obligatory_fields") enableObligatoryFields: boolean;

  // @ts-expect-error
  @field("enable_optional_fields") enableOptionalFields: boolean;

  // @ts-expect-error
  @field("enable_audit_types") enableAuditTypes: boolean;
}
