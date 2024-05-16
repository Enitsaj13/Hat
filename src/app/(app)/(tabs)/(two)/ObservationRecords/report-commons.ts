import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { useBetween } from "use-between";
import { IGetObservationsSchema } from "@services/getObservations";

function useGetObservationsFormRefHolder() {
  return useRef<UseFormReturn<IGetObservationsSchema> | undefined>();
}

export function useGetObservationsFormRef() {
  return useBetween(useGetObservationsFormRefHolder);
}
