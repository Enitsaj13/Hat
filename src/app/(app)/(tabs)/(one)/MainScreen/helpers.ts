import { UseFormReturn } from "react-hook-form";
import isEmpty from "lodash.isempty";
import { useRef } from "react";
import { useBetween } from "use-between";

export const OBLIGATORY_FIELD_VALUE_PREFIX = "obligatoryField-";

export const OPTIONAL_FIELD_VALUE_PREFIX = "optionalField-";

export interface IMomentSchema {
  workerServerId: number;
  beforeTouchingAPatient: boolean;
  beforeClean: boolean;
  afterBodyFluidExposureRisk: boolean;
  afterTouchingAPatient: boolean;
  afterTouchingPatientSurroundings: boolean;
  withoutIndication: boolean;
  rub: boolean;
  wash: boolean;
  missed: boolean;
  gloves: boolean;
  obligatoryFieldRequired: boolean;
  obligatoryFields: Record<string, number | boolean>;

  // optional fields
  occupationRisk?: string | undefined;
  donOnGown: boolean;
  donOnMask: boolean;
  maskType?: string;
  optionalFields: Record<string, number | boolean>;
}

export function shouldShow(
  actions: string[],
  isAllActionRequired: boolean,
  form: UseFormReturn<IMomentSchema>,
) {
  const { getValues } = form;
  // console.log("getValues", getValues());
  if (isAllActionRequired || isEmpty(actions)) {
    return true;
  } else if (
    getValues("beforeTouchingAPatient") &&
    actions.includes("moment1")
  ) {
    return true;
  } else if (getValues("beforeClean") && actions.includes("moment2")) {
    return true;
  } else if (
    getValues("afterBodyFluidExposureRisk") &&
    actions.includes("moment3")
  ) {
    return true;
  } else if (
    getValues("afterTouchingAPatient") &&
    actions.includes("moment4")
  ) {
    return true;
  } else if (
    getValues("afterTouchingPatientSurroundings") &&
    actions.includes("moment5")
  ) {
    return true;
  } else if (getValues("rub") && actions.includes("rub")) {
    return true;
  } else if (getValues("wash") && actions.includes("wash")) {
    return true;
  } else if (getValues("missed") && actions.includes("missed")) {
    return true;
  }
  return false;
}

function useMomentSchemaFormRefHolder() {
  return useRef<UseFormReturn<IMomentSchema> | undefined>();
}

export function useMomentSchemaForRef() {
  return useBetween(useMomentSchemaFormRefHolder);
}
