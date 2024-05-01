import { boolean, mixed, number, object } from "yup";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { i18n } from "@i18n/index";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { colors } from "@theme/index";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import {
  AntDesign as ArrowIcon,
  Entypo as EntypoIcon,
  Feather as EditIcon,
} from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useBatchObservation } from "@hooks/useBatchObservation";
import { styles } from "./styles";
import WorkerDropdown from "@app/(app)/(tabs)/(one)/MainScreen/WorkerDropdown";
import isEmpty from "lodash.isempty";
import WithoutIndicationToggle from "@app/(app)/(tabs)/(one)/MainScreen/WithoutIndicationToggle";
import { CompanyConfig } from "@stores/companyConfig";
import { ObligatoryField } from "@stores/obligatoryField";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { ObligatoryFieldsUI } from "@app/(app)/(tabs)/(one)/MainScreen/ObligatoryFieldsUI";
import {
  IMomentSchema,
  OBLIGATORY_FIELD_VALUE_PREFIX,
  shouldShow,
} from "@app/(app)/(tabs)/(one)/MainScreen/helpers";

export interface MainScreenProps {
  companyConfig?: CompanyConfig;
  obligatoryFields: ObligatoryField[];
}

function Component({ companyConfig, obligatoryFields }: MainScreenProps) {
  const { batchObservationState } = useBatchObservation();
  const location = batchObservationState.location;
  // console.log("batchObservationState: ", batchObservationState);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: location?.name,
    });
  }, [location]);

  const formRef = useRef<UseFormReturn<IMomentSchema> | undefined>();
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
      // glovesMetadata: boolean().default(false), // TODO go back to ronald regarding this
    });
  }, [companyConfig, obligatoryFields]);

  const form = useForm<IMomentSchema>({
    resolver: yupResolver(momentSchema),
    mode: "onChange",
    defaultValues: momentSchema.getDefault(),
  });
  formRef.current = form;

  const {
    control,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const isGloveSelected = watch("gloves");

  useEffect(() => {
    const errorsCopy = JSON.parse(JSON.stringify(errors));
    delete errorsCopy.afterTouchingAPatient;
    delete errorsCopy.afterTouchingPatientSurroundings;

    console.log("errorsCopy 1", errorsCopy);
    if (!isEmpty(errorsCopy)) {
      const keys = Object.keys(errorsCopy);
      const firstErrorKey = keys[0];
      // @ts-ignore
      const firstError: any = errorsCopy[firstErrorKey];
      let message = firstError?.message;
      if (firstErrorKey === "obligatoryFields") {
        // @ts-ignore
        const serverIdObjectKey = Object.keys(errorsCopy.obligatoryFields)[0];
        // @ts-ignore
        message = errorsCopy.obligatoryFields[serverIdObjectKey].message;
      }

      Alert.alert(i18n.t("X10", { defaultValue: "Invalid" }), message);
    }
  }, [errors]);

  useEffect(() => {
    const errorsCopy = JSON.parse(JSON.stringify(errors));
    for (const key of Object.keys(errorsCopy)) {
      if (
        !["afterTouchingAPatient", "afterTouchingPatientSurroundings"].includes(
          key,
        )
      ) {
        delete errorsCopy[key];
      }
    }

    console.log("errorsCopy 2", errorsCopy);
    if (
      !isEmpty(errorsCopy.afterTouchingAPatient) ||
      !isEmpty(errorsCopy.afterTouchingPatientSurroundings)
    ) {
      const keys = Object.keys(errorsCopy);
      const message = errorsCopy[keys[0]].message;

      Alert.alert(i18n.t("X10", { defaultValue: "Invalid" }), message, [
        {
          text: "OK",
          onPress: () => resetField(keys[keys.length - 1] as any),
        },
      ]);
    }
  }, [errors.afterTouchingAPatient, errors.afterTouchingPatientSurroundings]);

  const resetMoments = useCallback(() => {
    resetField("beforeTouchingAPatient");
    resetField("beforeClean");
    resetField("afterBodyFluidExposureRisk");
    resetField("afterTouchingAPatient");
    resetField("afterTouchingPatientSurroundings");
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <WorkerDropdown
            selectedWorkerServerId={value}
            onWorkerSelected={onChange}
          />
        )}
        name="workerServerId"
        control={control}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {i18n.t("U13", {
            defaultValue: "Moment",
          })}
        </Text>
        <EditIcon name="edit" size={22} color="white" />
      </View>

      <View style={styles.mainScreenContainer}>
        <View style={styles.mainScreenImageContainer}>
          <Image
            source={require("@assets/images/hat-images/MainScreenImage.jpg")}
            resizeMode="contain"
            style={styles.mainScreenImage}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Pressable
                style={styles.arrowImageContainer1}
                onPress={() => {
                  onChange(!value);
                  resetField("withoutIndication");
                }}
              >
                <Image
                  source={
                    value
                      ? require("@assets/images/hat-images/1_violet.png")
                      : require("@assets/images/hat-images/1_green.png")
                  }
                  resizeMode="contain"
                  style={styles.arrowImage1}
                />
              </Pressable>
            )}
            name="beforeTouchingAPatient"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Pressable
                style={styles.arrowImageContainer2}
                onPress={() => {
                  onChange(!value);
                  resetField("withoutIndication");
                }}
              >
                <Image
                  source={
                    value
                      ? require("@assets/images/hat-images/2_violet.png")
                      : require("@assets/images/hat-images/2_green.png")
                  }
                  resizeMode="contain"
                  style={styles.arrowImage2}
                />
              </Pressable>
            )}
            name="beforeClean"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Pressable
                style={styles.arrowImageContainer3}
                onPress={() => {
                  onChange(!value);
                  // the withoutIndication field is really important so getValues will work on ObligatoryFieldsUI
                  resetField("withoutIndication");
                }}
              >
                <Image
                  source={
                    value
                      ? require("@assets/images/hat-images/3_violet.png")
                      : require("@assets/images/hat-images/3_green.png")
                  }
                  resizeMode="contain"
                  style={styles.arrowImage3}
                />
              </Pressable>
            )}
            name="afterBodyFluidExposureRisk"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Pressable
                style={styles.arrowImageContainer4}
                onPress={() => {
                  onChange(!value);
                  resetField("withoutIndication");
                }}
              >
                <Image
                  source={
                    value
                      ? require("@assets/images/hat-images/4_violet.png")
                      : require("@assets/images/hat-images/4_green.png")
                  }
                  resizeMode="contain"
                  style={styles.arrowImage4}
                />
              </Pressable>
            )}
            name="afterTouchingAPatient"
            control={control}
          />
        </View>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Pressable
              style={styles.arrowImageContainer5}
              onPress={() => {
                onChange(!value);
                resetField("withoutIndication");
              }}
            >
              <Image
                source={
                  value
                    ? require("@assets/images/hat-images/5_violet.png")
                    : require("@assets/images/hat-images/5_green.png")
                }
                resizeMode="contain"
                style={styles.arrowImage5}
              />
            </Pressable>
          )}
          name="afterTouchingPatientSurroundings"
          control={control}
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <Pressable
              onPress={() => {
                onChange(!value);
                resetMoments();
              }}
              style={styles.indicationContainer}
            >
              <Text style={styles.indicationTitle}>
                {i18n.t("INDICATION_TITLE")}
              </Text>
              <WithoutIndicationToggle
                value={value}
                onValueChange={(v: boolean) => {
                  onChange(v);
                  resetMoments();
                }}
              />
            </Pressable>
          )}
          name="withoutIndication"
          control={control}
        />
      </View>
      <View style={styles.actionHeaderContainer}>
        <Text style={styles.actionTitle}>
          {i18n.t("AF6", { defaultValue: "Action" })}
        </Text>
      </View>

      <View style={styles.hygieneContainer}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Pressable
              style={{
                ...styles.actionButton,
                borderColor: value ? colors.mediumPurple : "#047857",
                backgroundColor: value ? colors.textColor : colors.bgColor,
              }}
              onPress={() => {
                onChange(!value);
                resetField("wash");
                resetField("missed");
              }}
            >
              <Text
                style={{
                  ...styles.buttonName,
                  color: value ? colors.mediumPurple : colors.textColor,
                }}
              >
                {i18n.t("AE9", { defaultValue: "RUB" })}
              </Text>
            </Pressable>
          )}
          name="rub"
          control={control}
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <Pressable
              style={{
                ...styles.actionButton,
                borderColor: value ? colors.mediumPurple : "#047857",
                backgroundColor: value ? colors.textColor : colors.bgColor,
              }}
              onPress={() => {
                onChange(!value);
                resetField("rub");
                resetField("missed");
              }}
            >
              <Text
                style={{
                  ...styles.buttonName,
                  color: value ? colors.mediumPurple : colors.textColor,
                }}
              >
                {i18n.t("AE10", { defaultValue: "WASH" })}
              </Text>
            </Pressable>
          )}
          name="wash"
          control={control}
        />
        <Controller
          render={({ field: { onChange, value } }) => (
            <Pressable
              style={{
                ...styles.actionButton,
                ...styles.circleButton,
                borderColor: value ? colors.red : "#047857",
                backgroundColor: value ? colors.textColor : colors.bgColor,
              }}
              onPress={() => {
                onChange(!value);
                resetField("rub");
                resetField("wash");
              }}
            >
              <Text
                style={{
                  ...styles.buttonName,
                  color: value ? colors.red : colors.textColor,
                }}
              >
                {i18n.t("AE11", { defaultValue: "MISSED" })}
              </Text>
            </Pressable>
          )}
          name="missed"
          control={control}
        />

        <Controller
          render={({ field: { onChange, value } }) => (
            <Pressable
              style={{
                ...styles.actionButton,
                ...styles.circleButton,
                borderColor: value ? colors.mediumPurple : "#047857",
                backgroundColor: value ? colors.textColor : colors.bgColor,
              }}
              onPress={() => onChange(!value)}
            >
              <Text
                style={{
                  ...styles.buttonName,
                  color: value ? colors.mediumPurple : colors.textColor,
                }}
              >
                {i18n.t("AE12", { defaultValue: "GLOVES" })}
              </Text>
            </Pressable>
          )}
          name="gloves"
          control={control}
        />
        {/* TODO when one of optional fields are selected as well then turn this into selected */}
        <Pressable
          style={{
            ...styles.actionButton,
            borderColor: isGloveSelected ? colors.mediumPurple : "#047857",
            backgroundColor: isGloveSelected
              ? colors.textColor
              : colors.bgColor,
          }}
          onPress={() => {}}
        >
          <EntypoIcon
            name="plus"
            size={24}
            color={isGloveSelected ? colors.mediumPurple : colors.textColor}
          />
        </Pressable>
      </View>

      <ObligatoryFieldsUI
        form={form}
        obligatoryFields={obligatoryFields}
        companyConfig={companyConfig}
      />

      <View style={styles.controlContainer}>
        <Pressable
          style={styles.controlButton}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.controlButtonTitle}>
            {i18n.t("ADD28", { defaultValue: "Move" })}
          </Text>
          <ArrowIcon name="arrowleft" size={12} color="white" />
        </Pressable>

        <Pressable style={styles.controlButton}>
          <Text style={styles.controlButtonTitle}>
            {i18n.t("ADD29", { defaultValue: "Stop" })}
          </Text>
          <EntypoIcon name="cross" size={12} color="white" />
        </Pressable>

        <Pressable
          style={styles.controlButton}
          onPress={handleSubmit((currentForm) =>
            console.log("currentForm", currentForm),
          )}
        >
          <Text style={styles.controlButtonTitle}>
            {i18n.t("AE13", { defaultValue: "Submit" })}
          </Text>
          <ArrowIcon name="arrowright" size={12} color="white" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

type WithObservableProps = ObservableifyProps<
  MainScreenProps,
  "companyConfig",
  "obligatoryFields"
>;
const MainScreen = withObservables(
  ["companyConfig", "obligatoryFields"],
  (props: WithObservableProps) => ({
    companyConfig: database
      .get<CompanyConfig>("company_configs")
      .query(Q.take(1))
      .observe()
      .pipe(
        switchMap((companyConfig) =>
          companyConfig.length > 0 ? companyConfig[0].observe() : of(null),
        ),
      ),
    obligatoryFields: database
      .get<ObligatoryField>("obligatory_fields")
      .query(Q.sortBy("sort", Q.asc)),
  }),
)(Component as any);

export default MainScreen;
