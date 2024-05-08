import { UseFormReturn } from "react-hook-form";
import isEmpty from "lodash.isempty";
import { useCallback, useMemo, useRef } from "react";
import { useBetween } from "use-between";
import { boolean, mixed, number, object, string } from "yup";
import { i18n } from "@i18n/index";
import { CompanyConfig } from "@stores/companyConfig";
import { ObligatoryField } from "@stores/obligatoryField";
import { OptionalField } from "@stores/optionalField";
import { useBatchObservation } from "@hooks/useBatchObservation";
import { randomUUID } from "expo-crypto";
import {
  FieldJson,
  getAnswer,
  HhCompliance,
  HhComplianceType,
  MaskType,
  SendObservationDataRequest,
} from "../../../../../types";
import { database } from "@stores/index";
import { SendStatus, ToSendDatus, ToSendDatusType } from "@stores/toSendDatus";
import { useNavigation, useRouter } from "expo-router";
import { Alert } from "react-native";

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
  donOnGown?: boolean;
  donOnMask?: boolean;
  maskType?: string;
  optionalFields: Record<string, number | boolean | null | undefined>;

  notes?: string;
  feedbackEnabled: boolean;
  feedback?: string;
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
  return useMemo(() => {
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
            ? number().optional()
            : boolean().optional();
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
            // console.log("this.parent", this.parent);
            return !obligatoryFieldRequired || value != null;
          },
        }),
      occupationRisk: string().optional(),
      donOnGown: boolean().optional(),
      donOnMask: boolean().optional(),
      maskType: string().optional(),
      optionalFields: object(optionalFieldSchema).default({}),
      notes: string().optional().max(150),

      feedbackEnabled: boolean().default(false),
      feedback: string().optional(),
    });
  }, [companyConfig, obligatoryFields, optionalFields]);
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

export function useObservationSubmit() {
  const { batchObservationState, setBatchObservationState } =
    useBatchObservation();
  const router = useRouter();
  const navigation = useNavigation();

  return useCallback(
    async (form: IMomentSchema) => {
      console.log("current form", form);
      const moments: number[] = [];
      if (form.beforeTouchingAPatient) {
        moments.push(1);
      }

      if (form.beforeClean) {
        moments.push(2);
      }

      if (form.afterBodyFluidExposureRisk) {
        moments.push(3);
      }

      if (form.afterTouchingAPatient) {
        moments.push(4);
      }

      if (form.afterTouchingPatientSurroundings) {
        moments.push(5);
      }

      let hhCompliance: HhCompliance = "rub";
      if (form.wash) {
        hhCompliance = "washed";
      } else if (form.missed) {
        hhCompliance = "missed";
      }

      let maskType: MaskType = "";
      if (form.donOnMask && form.maskType != null) {
        maskType = form.maskType as MaskType;
      }

      const obligatoryFields: FieldJson[] = Object.keys(form.obligatoryFields)
        .map((key) => ({
          id: parseInt(
            key.substring(
              key.indexOf(OBLIGATORY_FIELD_VALUE_PREFIX) +
                OBLIGATORY_FIELD_VALUE_PREFIX.length,
            ),
            10,
          ),
          option_id:
            typeof form.obligatoryFields[key] === "number"
              ? (form.obligatoryFields[key] as number)
              : undefined,
          value:
            typeof form.obligatoryFields[key] === "boolean"
              ? (form.obligatoryFields[key] as boolean)
              : undefined,
        }))
        .filter(
          (fieldJson) => fieldJson.option_id == null || fieldJson.value == null,
        );

      const optionalFields: FieldJson[] = Object.keys(form.optionalFields)
        .map((key) => ({
          id: parseInt(
            key.substring(
              key.indexOf(OPTIONAL_FIELD_VALUE_PREFIX) +
                OPTIONAL_FIELD_VALUE_PREFIX.length,
            ),
            10,
          ),
          option_id:
            typeof form.optionalFields[key] === "number"
              ? (form.optionalFields[key] as number)
              : undefined,
          value:
            typeof form.optionalFields[key] === "boolean"
              ? (form.optionalFields[key] as boolean)
              : undefined,
        }))
        .filter(
          (fieldJson) => fieldJson.option_id == null || fieldJson.value == null,
        );

      const sendObservationDataRequest: SendObservationDataRequest = {
        batch_uuid: batchObservationState.guid,
        resend_id: randomUUID(),
        hcw_title: form.workerServerId,
        moment: moments,
        note: form.notes,
        location_id: batchObservationState.location?.serverId!,
        hh_compliance: hhCompliance,
        hh_compliance_type: form.occupationRisk as HhComplianceType,
        glove_compliance: getAnswer(form.gloves),
        gown_compliance: getAnswer(form.donOnGown),
        mask_compliance: getAnswer(form.donOnMask),
        mask_type: maskType,
        date_registered: Date.now(),
        without_indication: form.withoutIndication,
        feedback_given: form.feedbackEnabled && !isEmpty(form.feedback),
        audit_type_id: batchObservationState.auditType,
        obligatory_fields: obligatoryFields,
        optional_fields: optionalFields,
      };

      const db = database.get<ToSendDatus>("to_send_data");
      await database.write(async () => {
        await db.create((newToSendDatus) => {
          newToSendDatus.body = sendObservationDataRequest;
          newToSendDatus.url = "/mobile/save-observation";
          newToSendDatus.type = ToSendDatusType.OBSERVATION;
          newToSendDatus.status = SendStatus.IDLE;
          newToSendDatus.key = batchObservationState.guid;
        });
      });

      setTimeout(() => {
        setBatchObservationState((prevState) => ({
          ...prevState,
          targetOpportunities: prevState!.targetOpportunities - 1,
        }));
      }, 0);

      const currentTargetOpportunities =
        batchObservationState.targetOpportunities;
      console.log(
        "currentTargetOpportunities - 1",
        currentTargetOpportunities - 1,
      );
      if (currentTargetOpportunities - 1 > 0) {
        router.replace("/(app)/(tabs)/(one)/MainScreen");
      } else {
        // TODO trial mode
        Alert.alert(
          i18n.t("AG24", { defaultValue: "COMPLETED!" }),
          i18n.t("AG25", {
            defaultValue: "Observation successfully completed.",
          }),
          [
            {
              text: "OK",
              onPress: () =>
                navigation.reset({
                  index: 1,
                  routes: [
                    {
                      name: "Record",
                    },
                    {
                      name: "AuditSummary",
                      params: { hideFeedbackGiven: true },
                    },
                  ] as any,
                }),
            },
          ],
        );
      }
    },
    [
      batchObservationState.location,
      batchObservationState.guid,
      batchObservationState.auditType,
      batchObservationState.targetOpportunities,
    ],
  );
}
