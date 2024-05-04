import { UseFormReturn } from "react-hook-form";
import isEmpty from "lodash.isempty";
import { useMemo, useRef } from "react";
import { useBetween } from "use-between";
import { boolean, mixed, number, object, string } from "yup";
import { i18n } from "@i18n/index";
import { CompanyConfig } from "@stores/companyConfig";
import { ObligatoryField } from "@stores/obligatoryField";
import { OptionalField } from "@stores/optionalField";

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
  maskType?: string; // TODO when saving in ToSendData table, ensure that this is empty when donOnMask is false
  optionalFields: Record<string, number | boolean | null>; // TODO when saving in ToSendData table, if null should be removed

  notes?: string;
}

function useMomentSchemaFormRefHolder() {
  return useRef<UseFormReturn<IMomentSchema> | undefined>();
}

export function useMomentSchemaFormRef() {
  return useBetween(useMomentSchemaFormRefHolder);
}

export function useMomentSchema(
  companyConfig: CompanyConfig | null,
  obligatoryFields: ObligatoryField[],
  optionalFields: OptionalField[],
) {
  const formRef = useMomentSchemaFormRef();
  const momentSchema = useMemo(() => {
    const obligatoryFieldRequired =
      isEmpty(companyConfig) || companyConfig.enableObligatoryFields;
    const obligatoryFieldsSchema: any = {};
    if (obligatoryFieldRequired) {
      for (const obligatoryField of obligatoryFields) {
        const actions = obligatoryField.actions?.slice() || [];
        obligatoryFieldsSchema[
          `${OBLIGATORY_FIELD_VALUE_PREFIX}${obligatoryField.serverId}`
        ] = mixed<number | boolean>().when(
          ["nonExistentField"],
          ([nonExistentField, schema]) => {
            return obligatoryField.fieldType === "DROPDOWN"
              ? number().test({
                  name: "required",
                  message: i18n.t("OBF1", {
                    default: "Please select obligatory field/s.",
                  }),
                  test(value) {
                    // console.log(
                    //   "shouldShow(actions, this.parent)",
                    //   shouldShow(actions, formRef.current!),
                    // );
                    // console.log("value", value);
                    return (
                      !shouldShow(
                        actions,
                        obligatoryField.isAllActionRequired,
                        formRef.current!,
                      ) || value != null
                    );
                  },
                })
              : boolean().required().default(false);
          },
        );
      }
    }

    const optionalFieldSchema: any = {};
    for (const optionalField of optionalFields) {
      optionalFieldSchema[
        `${OPTIONAL_FIELD_VALUE_PREFIX}${optionalField.serverId}`
      ] = mixed<number | boolean>().when(
        ["nonExistentField"],
        ([nonExistentField, schema]) => {
          return optionalField.fieldType === "DROPDOWN"
            ? number().notRequired()
            : boolean().notRequired().default(false);
        },
      );
    }

    return object({
      workerServerId: number().required(
        i18n.t("AG6", {
          defaultValue: "Healthcare worker is required!",
        }),
      ),
      beforeTouchingAPatient: boolean().default(false),
      beforeClean: boolean().default(false),
      afterBodyFluidExposureRisk: boolean()
        .default(false)
        .test({
          name: "atLeastOnceSelectedIfWithoutIndicationIsTurnedOff",
          message: i18n.t("AG30", {
            defaultValue: "Please select moment",
          }),
          test(value) {
            // NOTE: this is a short-circuit validation to ensure one moment is selected if without indication is off
            const {
              withoutIndication,
              beforeTouchingAPatient,
              beforeClean,
              afterTouchingAPatient,
              afterTouchingPatientSurroundings,
            } = this.parent;
            return (
              withoutIndication ||
              value ||
              beforeTouchingAPatient ||
              beforeClean ||
              afterTouchingAPatient ||
              afterTouchingPatientSurroundings
            );
          },
        }),
      afterTouchingAPatient: boolean()
        .default(false)
        .test({
          name: "xorWithAfterTouchingPatientSurroundings",
          message: i18n.t("AG4", {
            defaultValue: "Moment 4 & 5 cannot be simultaneously enabled.",
          }),
          test(value) {
            const { afterTouchingPatientSurroundings } = this.parent;
            return !value || !afterTouchingPatientSurroundings;
          },
        }),
      afterTouchingPatientSurroundings: boolean()
        .default(false)
        .test({
          name: "xorWithAfterTouchingPatientSurroundings",
          message: i18n.t("AG4", {
            defaultValue: "Moment 4 & 5 cannot be simultaneously enabled.",
          }),
          test(value) {
            const { afterTouchingAPatient } = this.parent;
            return !value || !afterTouchingAPatient;
          },
        }),
      withoutIndication: boolean().default(false),
      rub: boolean()
        .default(false)
        .test({
          name: "ShouldBeRubOrWashOrMissed",
          message: i18n.t("AG10", {
            defaultValue: "Please select action either rub, wash or missed!",
          }),
          test(value) {
            const { wash, missed } = this.parent;
            return value || wash || missed;
          },
        }),
      wash: boolean()
        .default(false)
        .test({
          name: "ShouldBeRubOrWashOrMissed",
          message: i18n.t("AG10", {
            defaultValue: "Please select action either rub, wash or missed!",
          }),
          test(value) {
            const { rub, missed } = this.parent;
            return value || rub || missed;
          },
        }),
      missed: boolean()
        .default(false)
        .test({
          name: "ShouldBeRubOrWashOrMissed",
          message: i18n.t("AG10", {
            defaultValue: "Please select action either rub, wash or missed!",
          }),
          test(value) {
            const { rub, wash } = this.parent;
            return value || rub || wash;
          },
        }),
      gloves: boolean().default(false),
      obligatoryFieldRequired: boolean()
        .required()
        .default(obligatoryFieldRequired),
      obligatoryFields: object(obligatoryFieldsSchema)
        .default({})
        .test({
          name: "required", // bugged
          test(value) {
            const { obligatoryFieldRequired } = this.parent;
            console.log("this.parent", this.parent);
            return !obligatoryFieldRequired || value != null;
          },
        }),
      occupationRisk: string().optional(),
      donOnGown: boolean().default(false),
      donOnMask: boolean().default(false),
      maskType: string().optional(),
      optionalFields: object(optionalFieldSchema).default({}),
      notes: string().optional().max(150),
    });
  }, [companyConfig, obligatoryFields, optionalFields]);

  return momentSchema;
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
