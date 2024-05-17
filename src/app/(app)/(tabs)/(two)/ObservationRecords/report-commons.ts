import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useBetween } from "use-between";
import { IGetObservationsSchema } from "@services/getObservations";
import { string } from "yup";

function useGetObservationsFormRefHolder() {
  return useRef<UseFormReturn<IGetObservationsSchema> | undefined>();
}

export function useGetObservationsFormRef() {
  return useBetween(useGetObservationsFormRefHolder);
}

function useLocation() {
  return useState<{ serverId: number; name: string } | undefined>();
}

export function useSharedLocation() {
  return useBetween(useLocation);
}
