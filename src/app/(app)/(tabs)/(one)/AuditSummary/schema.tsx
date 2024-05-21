import { boolean, object, string } from "yup";
import { useMemo, useRef } from "react";
import { i18n } from "@i18n/index";
import isEmpty from "lodash.isempty";
import { UseFormReturn } from "react-hook-form";
import { useBetween } from "use-between";

export interface IFeedbackSchema {
  feedbackEnabled: boolean;
  feedback?: string;
}

export function useFeedbackSchema() {
  return useMemo(
    () =>
      object({
        feedbackEnabled: boolean().default(false),
        feedback: string().test({
          name: "required", // bugged
          message: i18n.t("FEEDBACK_REQUIRED"),
          test(value) {
            const { feedbackEnabled } = this.parent;
            return !feedbackEnabled || !isEmpty(value);
          },
        }),
      }),
    [],
  );
}

function useFeedbackSchemaFormRefHolder() {
  return useRef<UseFormReturn<IFeedbackSchema> | undefined>();
}

export function useFeedbackSchemaFormRef() {
  return useBetween(useFeedbackSchemaFormRefHolder);
}
