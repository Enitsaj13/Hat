import React from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { colors } from "@theme/index";
import { i18n } from "@i18n/index";
import SegmentedButton from "@components/SegmentButton";
import DropdownList from "@components/DropdownList";
import {
  OPTIONAL_FIELD_VALUE_PREFIX,
  useMomentSchemaFormRef,
} from "@app/(app)/(tabs)/(one)/MainScreen/helpers";
import { Controller } from "react-hook-form";
import { styles } from "@app/(app)/(tabs)/(one)/Precaution/styles";
import { OptionalField } from "@stores/optionalField";
import { OptionalFieldOption } from "@stores/optionalFieldOption";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import {
  ExtractedObservables,
  withObservables,
} from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { of, switchMap } from "rxjs";
import { Q } from "@nozbe/watermelondb";
import { CompanyConfig } from "@stores/companyConfig";

const optionsMapKeyPrefix = "opt-";

const Component = ({
  optionalFields,
  optionsMap,
  companyConfig,
}: PrecautionProps) => {
  const formRef = useMomentSchemaFormRef();
  const form = formRef.current!;
  const { control } = form;
  console.log("optionsMap", optionsMap);
  return (
    <View style={styles.container}>
      <View style={styles.occupationalTitleContainer}>
        <Text style={styles.title}>
          {i18n.t("U16", {
            defaultValue: "Occupational Risk",
          })}
        </Text>
      </View>
      <Controller
        render={({ field: { onChange, value } }) => (
          <SegmentedButton
            segments={[
              {
                value: "Contact",
                label: i18n.t("AF3", { defaultValue: "Contact" }),
              },
              {
                value: "Airborne",
                label: i18n.t("AF4", { defaultValue: "Airborne" }),
              },
              {
                value: "Droplet",
                label: i18n.t("AF5", { defaultValue: "Droplet" }),
              },
            ]}
            onSegmentChange={(v) => onChange(v != value ? v : undefined)}
            value={value}
          />
        )}
        name="occupationRisk"
        control={control}
      />
      <View style={styles.actionTitleContainer}>
        <Text style={styles.title}>
          {i18n.t("AE8", {
            defaultValue: "ACTION",
          })}
        </Text>
      </View>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Pressable
            style={styles.actionContainer}
            onPress={() => onChange(!value)}
          >
            <View style={styles.actionListContainer}>
              <Text style={styles.actionTitle}>
                {i18n.t("AF7", {
                  defaultValue: "Don on Gloves",
                })}
              </Text>

              <Switch
                trackColor={{ true: colors.mediumPurple }}
                thumbColor={value ? colors.lilyWhite : colors.textColor}
                ios_backgroundColor={colors.textColor}
                style={styles.switchIndication}
                onValueChange={onChange}
                value={value}
              />
            </View>
          </Pressable>
        )}
        name="gloves"
        control={control}
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <Pressable
            style={styles.actionContainer}
            onPress={() => onChange(!value)}
          >
            <View style={styles.actionListContainer}>
              <Text style={styles.actionTitle}>
                {i18n.t("AF8", {
                  defaultValue: "Don on Gown",
                })}
              </Text>

              <Switch
                trackColor={{ true: colors.mediumPurple }}
                thumbColor={value ? colors.lilyWhite : colors.textColor}
                ios_backgroundColor={colors.textColor}
                style={styles.switchIndication}
                onValueChange={onChange}
                value={value}
              />
            </View>
          </Pressable>
        )}
        name="donOnGown"
        control={control}
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <>
            <Pressable
              style={styles.actionContainer}
              onPress={() => onChange(!value)}
            >
              <View style={styles.actionListContainer}>
                <Text style={styles.actionTitle}>
                  {i18n.t("AF9", {
                    defaultValue: "Don on Mask",
                  })}
                </Text>

                <Switch
                  trackColor={{ true: colors.mediumPurple }}
                  thumbColor={value ? colors.lilyWhite : colors.textColor}
                  ios_backgroundColor={colors.textColor}
                  style={styles.switchIndication}
                  onValueChange={onChange}
                  value={value}
                />
              </View>
            </Pressable>
            {value && (
              <View style={styles.actionContainer}>
                <Text style={styles.maskType}>
                  -{" "}
                  {i18n.t("U20", {
                    defaultValue: "Mask Type",
                  })}{" "}
                  -
                </Text>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <SegmentedButton
                      segments={[
                        {
                          value: "Surgical",
                          label: i18n.t("AF11", { defaultValue: "Surgical" }),
                        },
                        {
                          value: "High Filtration",
                          label: i18n.t("AF12", {
                            defaultValue: "High Filtration",
                          }),
                        },
                        {
                          value: "Other",
                          label: i18n.t("AF13 ", { defaultValue: "Other" }),
                        },
                      ]}
                      onSegmentChange={(v) =>
                        onChange(v != value ? v : undefined)
                      }
                      value={value}
                    />
                  )}
                  name="maskType"
                  control={control}
                />
              </View>
            )}
          </>
        )}
        name="donOnMask"
        control={control}
      />
      {companyConfig!.enableOptionalFields && (
        <>
          <View style={styles.actionTitleContainer}>
            <Text style={styles.title}>
              {i18n.t("OPF1", {
                defaultValue: "OPTIONAL DATA",
              })}
            </Text>
          </View>

          {optionalFields.map((optField) => (
            <Controller
              key={`optional-field-${optField.serverId}`}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    ...styles.optionalDataContainer,
                    ...(optField.fieldType === "DROPDOWN"
                      ? styles.dropdownContainer
                      : {}),
                  }}
                >
                  {optField.fieldType !== "DROPDOWN" && (
                    <Text style={styles.optionalDataTitle}>
                      {optField.name}
                    </Text>
                  )}
                  {optField.fieldType === "DROPDOWN" ? (
                    <DropdownList
                      options={
                        Object.hasOwn(
                          optionsMap,
                          `${optionsMapKeyPrefix}${optField.serverId.toString()}`,
                        )
                          ? optionsMap[
                              `${optionsMapKeyPrefix}${optField.serverId.toString()}`
                            ].map((opt) => ({
                              key: opt.serverId,
                              value: opt.name,
                            }))
                          : []
                      }
                      onOptionSelected={onChange}
                      dropdownlistStyle={styles.dropdownlistContainer}
                      selectedValueStyle={styles.selectedValue}
                      noOptionSelectedText={optField.name}
                      selectedOptionKey={value}
                      allowNullKeySelection
                    />
                  ) : (
                    <Switch
                      trackColor={{ true: colors.mediumPurple }}
                      thumbColor={value ? colors.lilyWhite : colors.textColor}
                      ios_backgroundColor={colors.textColor}
                      style={styles.switchIndication}
                      onValueChange={onChange}
                      value={value}
                    />
                  )}
                </View>
              )}
              name={
                `optionalFields.${OPTIONAL_FIELD_VALUE_PREFIX}${optField.serverId}` as any
              }
              control={control}
            />
          ))}
        </>
      )}
    </View>
  );
};

interface ObservableProps {
  optionalFields: OptionalField[];
  optionsMap: Record<string, OptionalFieldOption[]>;
  companyConfig?: CompanyConfig;
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
  optionalFields: database
    .get<OptionalField>("optional_fields")
    .query(Q.sortBy("sort", Q.asc)),
  optionsMap: database
    .get<OptionalFieldOption>("optional_field_options")
    .query()
    .observe()
    .pipe(
      switchMap((optionalFields) => {
        // console.log("optionalFields from db", optionalFields);
        const toReturn: Record<string, OptionalFieldOption[]> = {};
        optionalFields.forEach((opt) => {
          const key = `${optionsMapKeyPrefix}${opt.optionalFieldServerId.toString()}`;
          const options = Object.hasOwn(toReturn, key) ? toReturn[key] : [];
          options.push(opt);
          toReturn[key] = options;
        });
        // console.log("optionsMap to be returned", toReturn);
        return of(toReturn);
      }),
    ),
});

export interface PrecautionProps
  extends ExtractedObservables<ReturnType<typeof getObservables>> {}

const Precaution = withObservables(
  ["optionalFields", "optionsMap", "companyConfig"],
  getObservables,
)(Component as any);

export default Precaution;
