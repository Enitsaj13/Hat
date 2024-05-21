import { useState } from "react";
import { useBetween } from "use-between";

export interface UseBatchObservationState {
  guid: string;
  balance?: number;
  targetOpportunities: number;
  auditType: number;
  location?: {
    serverId: number;
    name: string;
  };
  practiceMode: boolean;
}

export const emptyBatchObservation: UseBatchObservationState = {
  guid: "",
  targetOpportunities: 0,
  auditType: 0,
  practiceMode: false,
};

function useBatchObservationHolder() {
  const [batchObservationState, setBatchObservationState] =
    useState<UseBatchObservationState>(emptyBatchObservation);

  return { batchObservationState, setBatchObservationState };
}

export function useBatchObservation() {
  return useBetween(useBatchObservationHolder);
}
