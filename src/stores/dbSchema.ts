import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const dbSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "users",
      columns: [
        { name: "first_name", type: "string" },
        { name: "last_name", type: "string" },
        { name: "email", type: "string" },
        { name: "company_name", type: "string" },
        { name: "has_accepted_app_privacy", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "app_settings",
      columns: [
        { name: "data_privacy_url", type: "string" },
        { name: "terms_of_use_url", type: "string" },
        { name: "language", type: "string" },
        { name: "is_introduction_viewed", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "workers",
      columns: [
        { name: "server_id", type: "string" }, // id field from the JSON response, since watermelon has special field ID
        { name: "name", type: "string" },
        { name: "list_order", type: "number" },
      ],
    }),
  ],
});
