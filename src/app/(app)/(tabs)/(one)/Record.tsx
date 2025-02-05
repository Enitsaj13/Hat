import DropdownList from "@components/DropdownList";
import { AntDesign as Icon } from "@expo/vector-icons";
import { i18n, i18nOptions } from "@i18n/index";
import {
  ExtractedObservables,
  withObservables,
} from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Link, usePathname, useRouter } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AuditType } from "@stores/auditType";
import isEmpty from "lodash.isempty";
import { CompanyConfig } from "@stores/companyConfig";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { colors } from "@theme/index";
import { getUserTargetSettings } from "@services/getUserTargetTarget";
import { useQuery } from "react-query";
import { useBatchObservation } from "@hooks/useBatchObservation";
import { number, object } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { createBatchObservationGuid } from "@services/createBatchObservationGuid";
import { showRetryAlert } from "@utils/showRetryAlert";
import { AppSetting } from "@stores/appSetting";
import { randomUUID } from "expo-crypto";

interface IBatchObservationSchema {
  targetOpportunities: number;
  auditType?: number;
}

function Component({ auditTypes, companyConfig, appSetting }: RecordProps) {
  const { styles } = useStyles(stylesheet);

  const validationSchema = object({
    targetOpportunities: number().required(
      i18n.t("AG32", {
        defaultValue: "Required",
      }),
    ),
    auditType: number().test({
      name: "required2",
      message: i18n.t("AG32", {
        defaultValue: "Required",
      }),
      test(value) {
        if (companyConfig?.enableAuditTypes) {
          return value != null && value > 0;
        }
        return true;
      },
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { isLoading, isValid },
  } = useForm<IBatchObservationSchema>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      auditType: !isEmpty(auditTypes) ? auditTypes[0].serverId : undefined,
    },
  });

  const { batchObservationState, setBatchObservationState } =
    useBatchObservation();
  // console.log("batchObservationState", batchObservationState);

  const path = usePathname();
  console.log("path", path);
  const { data: userTargetSettings, isLoading: isUserTargetLoading } = useQuery(
    "userTargetSettings",
    getUserTargetSettings,
    {
      enabled: path === "/Record",
    },
  );

  useEffect(() => {
    if (
      !isEmpty(userTargetSettings) &&
      batchObservationState.balance !== userTargetSettings!.balance
    ) {
      setBatchObservationState((prev) => ({
        ...prev,
        balance: userTargetSettings?.balance,
      }));
    }
  }, [userTargetSettings, batchObservationState.balance]);

  const router = useRouter();
  const onBeginAuditPress = useCallback(
    async (form: IBatchObservationSchema) => {
      try {
        const guid = await createBatchObservationGuid();
        setBatchObservationState((prev) => {
          const newState = { ...prev, ...form, guid, practiceMode: false };
          console.log("newState after onBeginAuditPress", newState);
          return newState;
        });
        console.log(
          "creating batch observation is successful, redirecting to locations",
        );
        router.navigate({
          pathname: "/(app)/(tabs)/(one)/Locations/[serverId]",
          params: { serverId: -1 },
        });
      } catch (e) {
        console.log("error while call create batch endpoint", e);
        showRetryAlert();
      }
    },
    [],
  );

  const onTryPracticeModePress = useCallback(
    (form: IBatchObservationSchema) => {
      const guid = randomUUID();
      setBatchObservationState((prev) => {
        return { ...prev, ...form, guid, practiceMode: true };
      });
      router.navigate({
        pathname: "/(app)/(tabs)/(one)/Locations/[serverId]",
        params: { serverId: -1 },
      });
    },
    [],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, error },
            }) => (
              <TextInput
                keyboardType="numeric"
                label={i18n.t("Y2", {
                  defaultValue: "Number of Opportunities for this Audit:",
                })}
                value={value?.toString()}
                onChangeText={onChange}
                onBlur={onBlur}
                contentStyle={styles.textInput}
                theme={{
                  colors: {
                    placeholder: colors.cadetGrey,
                    primary: colors.cadetGrey,
                  },
                }}
                underlineColor="white"
                underlineColorAndroid={colors.cadetGrey}
                textColor="black"
                error={invalid}
              />
            )}
            name="targetOpportunities"
            control={control}
          />
          {isEmpty(companyConfig) || companyConfig.enableAuditTypes ? (
            <Controller
              render={({ field: { onChange, value } }) => (
                <DropdownList
                  options={auditTypes.map((a) => ({
                    key: a.serverId,
                    value: a.name,
                  }))}
                  onOptionSelected={onChange}
                  selectedOptionKey={value}
                  dropdownlistStyle={styles.dropdownlistContainer}
                  right={<Icon name="caretdown" size={12} color="gray" />}
                />
              )}
              name="auditType"
              control={control}
            />
          ) : null}
          <Button
            mode="outlined"
            style={styles.recordButton}
            onPress={handleSubmit(onBeginAuditPress)}
            loading={isLoading}
            disabled={isLoading && !isValid}
          >
            <Text variant="bodyLarge">
              {i18n.t("Y3", { defaultValue: "Begin Audit" })}
            </Text>
            <Icon name="arrowright" size={14} color="white" />
          </Button>
        </View>
        {!isUserTargetLoading && !isEmpty(userTargetSettings) && (
          <View style={styles.recordContainer}>
            <View style={styles.rowContainer}>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.t("AH2", { defaultValue: "Target Opportunities" })}
              </Text>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.formatNumber(
                  userTargetSettings?.targetOpportunities,
                  i18nOptions.countFormatOptions,
                )}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.t("DL7", { defaultValue: "Balance Remaining" })}
              </Text>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.formatNumber(
                  userTargetSettings?.balance,
                  i18nOptions.countFormatOptions,
                )}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.t("DL8", { defaultValue: "Complete Target By" })}
              </Text>
              <Text variant="bodyLarge" style={styles.recordText}>
                {userTargetSettings?.endDate}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text variant="bodyLarge" style={styles.recordText}>
                {i18n.t("DL9", { defaultValue: "Last Submission On" })}
              </Text>
              <Text variant="bodyLarge" style={styles.recordText}>
                {userTargetSettings?.lastOpportunity}
              </Text>
            </View>
          </View>
        )}
        {!appSetting?.disablePracticeMode && (
          <View style={styles.practiceButtonContainer}>
            <Button mode="text" onPress={handleSubmit(onTryPracticeModePress)}>
              <Text style={styles.practiceButton}>
                {i18n.t("TRY_ON_PRACTICE_MODE")}
              </Text>
            </Button>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  textInputContainer: {
    marginTop: 20,
    width: "95%",
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 0.4,
    borderColor: colors.cadetGrey,
    height: 80,
    borderRadius: 2,
  },
  dropdownlistContainer: {
    borderWidth: 0.4,
    borderRadius: 0,
    borderColor: colors.cadetGrey,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 14,
  },
  recordButton: {
    backgroundColor: colors.bgColor,
    borderWidth: 0,
    borderRadius: 4,
    padding: 4,
    marginTop: 20,
  },
  recordContainer: {
    gap: 10,
    width: "96%",
    marginVertical: 20,
    borderWidth: 2,
    padding: 10,
    borderColor: "purple",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recordText: {
    color: "black",
  },
  practiceButtonContainer: {
    position: "absolute",
    bottom: 0,
  },
  practiceButton: {
    color: "black",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationColor: "purple",
  },
});

interface ObservableProps {
  auditTypes: AuditType[];
  companyConfig?: CompanyConfig | undefined;
  appSetting: AppSetting;
}

const getObservables = (props: ObservableProps) => ({
  auditTypes: database.get<AuditType>("audit_types").query(),
  companyConfig: database
    .get<CompanyConfig>("company_configs")
    .query(Q.take(1))
    .observe()
    .pipe(
      switchMap((companyConfig) =>
        companyConfig.length > 0 ? companyConfig[0].observe() : of(null),
      ),
    ),
  appSetting: database
    .get<AppSetting>("app_settings")
    .query(Q.take(1))
    .observe()
    .pipe(
      switchMap((appSettings) =>
        appSettings.length > 0 ? appSettings[0].observe() : of(null),
      ),
    ),
});

interface RecordProps
  extends ExtractedObservables<ReturnType<typeof getObservables>> {}

const Record = withObservables(
  ["auditTypes", "companyConfig", "appSetting"],
  getObservables,
)(Component);

export default Record;
