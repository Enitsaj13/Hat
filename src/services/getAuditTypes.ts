import { axiosInstance } from "@services/axios";
import { database } from "@stores/index";
import { Worker } from "@stores/worker";

export interface AuditTypeResponse {
  id: number;
  cid: number;
  audit_type_name: string;
  created_at: string; // "2024-04-01T13:34:12.000000Z"
  created_by: number;
  is_deleted: number;
}

export async function getAuditTypes() {
  const result = await axiosInstance.get<AuditTypeResponse[]>(
    "/mobile/audit-types",
  );

  const auditTypesDb = database.get<Worker>("audit_types");
  const auditTypeResponse = result.data;
  await database.write(async () => {
    const operations: any[] = [];
    const existingAuditTypes = await auditTypesDb.query().fetch();

    const existingAuditTypesMap = new Map<number, Worker>();
    existingAuditTypes.forEach((w) => existingAuditTypesMap.set(w.serverId, w));

    const newAuditTypesMap = new Map<number, AuditTypeResponse>();
    auditTypeResponse.forEach((a) => newAuditTypesMap.set(a.id, a));

    for (const [serverId, auditType] of existingAuditTypesMap.entries()) {
      if (!newAuditTypesMap.has(serverId)) {
        operations.push(auditType.prepareDestroyPermanently());
      }
    }

    for (const [id, auditTypeResponse] of newAuditTypesMap.entries()) {
      if (!existingAuditTypesMap.has(id)) {
        operations.push(
          auditTypesDb.prepareCreate((auditType) => {
            auditType.serverId = auditTypeResponse.id;
            auditType.name = auditTypeResponse.audit_type_name;
          }),
        );
      } else {
        const existingAuditType = existingAuditTypesMap.get(id);
        operations.push(
          existingAuditType?.prepareUpdate((auditType) => {
            auditType.name = auditTypeResponse.audit_type_name;
          }),
        );
      }
    }

    await database.batch(operations);
  });
}
