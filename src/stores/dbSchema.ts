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
        { name: "group_code", type: "string" },
      ],
    }),
    tableSchema({
      name: "app_settings",
      columns: [
        { name: "data_privacy_url", type: "string" },
        { name: "terms_of_use_url", type: "string" },
        { name: "language", type: "string" },
        { name: "is_introduction_viewed", type: "boolean" },
        { name: "disable_practice_mode", type: "boolean" },
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
    tableSchema({
      name: "obligatory_fields",
      columns: [
        { name: "server_id", type: "number" },
        { name: "name", type: "string" },
        { name: "field_type", type: "string" },
        { name: "sort", type: "number" },
        { name: "actions", type: "string" },
        { name: "is_all_action_required", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "obligatory_field_options",
      columns: [
        { name: "server_id", type: "number" },
        { name: "name", type: "string" },
        { name: "sort", type: "number" },
        { name: "obligatory_field_server_id", type: "number" },
      ],
    }),
    tableSchema({
      name: "optional_fields",
      columns: [
        { name: "server_id", type: "number" },
        { name: "name", type: "string" },
        { name: "field_type", type: "string" },
        { name: "sort", type: "number" },
      ],
    }),
    tableSchema({
      name: "optional_field_options",
      columns: [
        { name: "server_id", type: "number" },
        { name: "name", type: "string" },
        { name: "optional_field_server_id", type: "number" },
      ],
    }),
    tableSchema({
      name: "to_send_data",
      columns: [
        { name: "body", type: "string" },
        { name: "url", type: "string" },
        { name: "type", type: "string" },
        { name: "status", type: "string" },
        { name: "key", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
