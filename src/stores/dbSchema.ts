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
        { name: "server_id", type: "number" }, // id field from the JSON response, since watermelon has special field ID
        { name: "name", type: "string" },
        { name: "list_order", type: "number" },
      ],
    }),
    tableSchema({
      name: "audit_types",
      columns: [
        { name: "server_id", type: "number" }, // id field from the JSON response, since watermelon has special field ID
        { name: "name", type: "string" },
      ],
    }),
    tableSchema({
      name: "locations",
      columns: [
        { name: "server_id", type: "number" }, // id field from the JSON response, since watermelon has special field ID
        { name: "name", type: "string" },
        { name: "sort", type: "number" },
        { name: "parent_server_id", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: "company_configs",
      columns: [
        { name: "enable_indication_field", type: "boolean" },
        { name: "enable_obligatory_fields", type: "boolean" },
        { name: "enable_optional_fields", type: "boolean" },
        { name: "enable_audit_types", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "institution_actions",
      columns: [
        { name: "action_code", type: "string" },
        { name: "action", type: "string" },
        { name: "sort", type: "number" },
        { name: "checked", type: "boolean" },
      ],
    }),
  ],
});
