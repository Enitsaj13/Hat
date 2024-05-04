import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { i18n } from "@i18n/index";
import React, { useCallback, useEffect, useState } from "react";
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
import {
  ExtractedObservables,
  withObservables,
} from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { ObligatoryFieldsUI } from "@app/(app)/(tabs)/(one)/MainScreen/ObligatoryFieldsUI";
import {
  IMomentSchema,
  useMomentSchema,
  useMomentSchemaFormRef,
} from "@app/(app)/(tabs)/(one)/MainScreen/helpers";

import { OptionalField } from "@stores/optionalField";
import NoteModal from "@components/Notes";

function Component({
  companyConfig,
  obligatoryFields,
  optionalFields,
}: MainScreenProps) {
  const { batchObservationState } = useBatchObservation();
  const location = batchObservationState.location;
  // console.log("batchObservationState: ", batchObservationState);

  const [notesVisible, setNotesVisible] = useState(false);

  const toggleNotes = () => {
    setNotesVisible(!notesVisible);
  };

  const closeNotes = () => {
    setNotesVisible(false);
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: location?.name,
    });
  }, [location]);

  const formRef = useMomentSchemaFormRef();

  const momentSchema = useMomentSchema(
    companyConfig,
    obligatoryFields,
    optionalFields,
  );
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
    formState: { errors, isDirty },
  } = form;
  const isGloveSelected = watch("gloves");
  const optionalFieldsWatchValue = watch("optionalFields");
  const occupationRisk = watch("occupationRisk");
  const donOnGown = watch("donOnGown");
  const donOnMask = watch("donOnMask");
  const maskType = watch("maskType");

  const shouldHighlightPlusButton =
    isGloveSelected ||
    !isEmpty(occupationRisk) ||
    donOnGown ||
    donOnMask ||
    !isEmpty(maskType) ||
    !isEmpty(optionalFieldsWatchValue);

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

  const onMovePressed = useCallback(() => {
    if (isDirty) {
      Alert.alert(
        i18n.t("AG15", { defaultValue: "Confirmation" }),
        i18n.t("UNSAVED_OBSERVATION_ON_MOVE_CONFIRMATION"),
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: router.back,
          },
        ],
        {
          cancelable: true,
        },
      );
    } else {
      router.back();
    }
  }, [isDirty]);

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
      <Pressable style={styles.headerContainer} onPress={toggleNotes}>
        <Text style={styles.headerTitle}>
          {i18n.t("U13", {
            defaultValue: "Moment",
          })}
        </Text>
        <EditIcon name="edit" size={22} color="white" />
      </Pressable>
      <NoteModal
        visible={notesVisible}
        onClose={closeNotes}
        title={i18n.t("AE5", {
          defaultValue: "Add Notes",
        })}
        cancelTitle={i18n.t("CLEAR")}
        saveTitle={i18n.t("DONE")}
      />

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
        </View>
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
                borderColor: value ? colors.mediumPurple : colors.green,
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
                borderColor: value ? colors.mediumPurple : colors.green,
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
                borderColor: value ? colors.red : colors.green,
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
                borderColor: value ? colors.mediumPurple : colors.green,
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
        <Pressable
          onPress={() => router.navigate("Precaution")}
          style={{
            ...styles.actionButton,
            borderColor: shouldHighlightPlusButton
              ? colors.mediumPurple
              : colors.green,
            backgroundColor: shouldHighlightPlusButton
              ? colors.textColor
              : colors.bgColor,
          }}
        >
          <EntypoIcon
            name="plus"
            size={24}
            color={
              shouldHighlightPlusButton ? colors.mediumPurple : colors.textColor
            }
          />
        </Pressable>
      </View>

      <ObligatoryFieldsUI
        obligatoryFields={obligatoryFields}
        companyConfig={companyConfig}
      />

      <View style={styles.controlContainer}>
        <Pressable style={styles.controlButton} onPress={onMovePressed}>
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

export interface ObligatoryFieldRelatedProps {
  companyConfig?: CompanyConfig | null;
  obligatoryFields: ObligatoryField[];
}
export interface ObservableProps extends ObligatoryFieldRelatedProps {
  optionalFields: OptionalField[];
}

const getObservables = (props: ObservableProps) => ({
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
  optionalFields: database
    .get<OptionalField>("optional_fields")
    .query(Q.sortBy("sort", Q.asc)),
});

export interface MainScreenProps
  extends ExtractedObservables<ReturnType<typeof getObservables>> {}

const MainScreen = withObservables(
  ["companyConfig", "obligatoryFields", "optionalFields"],
  getObservables,
)(Component);

export default MainScreen;
