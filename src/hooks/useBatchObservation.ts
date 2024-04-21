import { useState } from "react";

export const emptyBatchObservation = {
  guid: "",
  targetOpportunities: 0,
  auditType: 0,
};

export function useBatchObservation() {
  const [batchObservationState, setBatchObservationState] = useState<{
    guid: string;
    balance?: number;
    targetOpportunities: number;
    auditType: number;
  }>(emptyBatchObservation);

  return { batchObservationState, setBatchObservationState };
}
