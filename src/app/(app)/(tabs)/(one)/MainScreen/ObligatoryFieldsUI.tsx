import { ObligatoryField } from "@stores/obligatoryField";
import { ObligatoryFieldRelatedProps } from "@app/(app)/(tabs)/(one)/MainScreen/index";
import { styles } from "@app/(app)/(tabs)/(one)/MainScreen/styles";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";
import DropdownList, {
  DropDownOption,
  DropDownOptionKey,
} from "@components/DropdownList";
import React from "react";
import { Switch, View } from "react-native";
import { Text } from "react-native-paper";
import { Controller } from "react-hook-form";
import { ObligatoryFieldOption } from "@stores/obligatoryFieldOption";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import {
  OBLIGATORY_FIELD_VALUE_PREFIX,
  shouldShow,
  useMomentSchemaFormRef,
} from "@app/(app)/(tabs)/(one)/MainScreen/helpers";
import { colors } from "@theme/index";

interface ObligatoryFieldUIProps extends ObligatoryFieldRelatedProps {
  obligatoryField: ObligatoryField;
  options: ObligatoryFieldOption[];
}

function ObligatoryFieldUIComponent({
  obligatoryField,
  options,
}: ObligatoryFieldUIProps) {
  const formRef = useMomentSchemaFormRef();
  const form = formRef.current!;

  const dropdownOptions: DropDownOption[] =
    options.map((opt) => ({
      key: opt.serverId as DropDownOptionKey,
      value: opt.name,
    })) || [];

  const show = shouldShow(
    obligatoryField.actions,
    obligatoryField.isAllActionRequired,
    form,
  );
  return (
    <Controller
      render={({ field: { onChange, value } }) =>
        show ? (
          obligatoryField.fieldType === "DROPDOWN" ? (
            <DropdownList
              options={dropdownOptions}
              dropdownlistStyle={
                [
                  styles.dropdownlistContainer,
                  styles.dropdownlistActionContainer,
                ] as any
              }
              right={<AntDesignIcon name="caretdown" size={10} color="gray" />}
              noOptionSelectedText={obligatoryField.name}
              onOptionSelected={onChange}
              selectedOptionKey={value as DropDownOptionKey}
            />
          ) : (
            <View style={styles.switchContainer}>
              <Text style={styles.obligatoryText}>{obligatoryField.name}</Text>
              <Switch
                trackColor={{ true: colors.bgColor }}
                thumbColor={value ? colors.lilyWhite : colors.textColor}
                ios_backgroundColor={colors.textColor}
                value={value}
                onValueChange={onChange}
              />
            </View>
          )
        ) : (
          <View style={{ display: "none" }} />
        )
      }
      name={
        `obligatoryFields.${OBLIGATORY_FIELD_VALUE_PREFIX}${obligatoryField.serverId}` as any
      }
      control={form.control}
    />
  );
}

type WithObservableProps = ObservableifyProps<
  ObligatoryFieldUIProps,
  "options"
>;

const ObligatoryFieldUI = withObservables(
  ["obligatoryField", "options"],
  ({ obligatoryField }: WithObservableProps) => ({
    options: database
      .get<ObligatoryFieldOption>("obligatory_field_options")
      .query(Q.where("obligatory_field_server_id", obligatoryField.serverId)),
  }),
)(ObligatoryFieldUIComponent as any);

export function ObligatoryFieldsUI(props: ObligatoryFieldRelatedProps) {
  if (props.companyConfig?.enableObligatoryFields === false) {
    return null;
  }

  return props.obligatoryFields?.map((o, index) => (
    <ObligatoryFieldUI obligatoryField={o} key={`${o.serverId}`} />
  ));
}
