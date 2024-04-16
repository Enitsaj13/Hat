import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { AppSetting } from "@stores/appSetting";
import { dbSchema } from "@stores/dbSchema";
import { User } from "@stores/user";
import { Worker } from "@stores/worker";
import { AuditType } from "@stores/auditType";
import { Location } from "@stores/location";
import { CompanyConfig } from "@stores/companyConfig";
import { InstitutionAction } from "@stores/institutionAction";

const adapter = new SQLiteAdapter({
  schema: dbSchema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  // migrations,
  dbName: "hatdb",
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    console.log("db load error", error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    User,
    AppSetting,
    Worker,
    AuditType,
    Location,
    CompanyConfig,
    InstitutionAction,
  ],
});
