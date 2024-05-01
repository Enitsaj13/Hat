import { colors } from "@theme/index";
import { styles } from "@app/(app)/(tabs)/(one)/MainScreen/styles";
import { Switch } from "react-native";
import React from "react";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { CompanyConfig } from "@stores/companyConfig";
import isEmpty from "lodash.isempty";

export interface WithoutIndicationToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  companyConfig: CompanyConfig;
}

function Component({
  value,
  onValueChange,
  companyConfig,
}: WithoutIndicationToggleProps) {
  const enable = isEmpty(companyConfig) || companyConfig?.enableIndicationField;
  return enable ? (
    <Switch
      trackColor={{ true: colors.bgColor }}
      thumbColor={value ? colors.lilyWhite : colors.textColor}
      ios_backgroundColor={colors.steelGrey}
      value={value}
      onValueChange={onValueChange}
      style={styles.switchIndication}
    />
  ) : null;
}

type WithObservableProps = ObservableifyProps<
  WithoutIndicationToggleProps,
  "companyConfig"
>;

const WithoutIndicationToggle = withObservables(
  ["companyConfig"],
  (props: WithObservableProps) => ({
    appSetting: database
      .get<CompanyConfig>("company_configs")
      .query(Q.take(1))
      .observe()
      .pipe(
        switchMap((companyConfigs) =>
          companyConfigs.length > 0 ? companyConfigs[0].observe() : of(null),
        ),
      ),
  }),
)(Component as any); // as any here is workaround on typescript complaining between Observable<AppSetting> and AppSetting

export default WithoutIndicationToggle;
