import React, { useCallback, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import DropdownList from "@components/DropdownList";
import {
  AntDesign as Icon,
  FontAwesome as FontAwesomeIcon,
} from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import { router, useFocusEffect } from "expo-router";
import CustomDatePicker from "@components/CustomDatePicker";
import {
  useGetObservationsFormRef,
  useSharedLocation,
} from "@app/(app)/(tabs)/(two)/ObservationRecords/report-commons";
import { styles } from "./styles";
import { User } from "@stores/user";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { getMembers } from "@services/getMembers";
import { ActivityIndicator, Button } from "react-native-paper";
import WorkerDropdown from "@app/(app)/(tabs)/(two)/FilterReport/WorkerDropdown";
import { colors } from "@theme/index";

interface FilterReportProps {
  user: User;
}

const Component = ({ user }: FilterReportProps) => {
  const formRef = useGetObservationsFormRef();
  const form = formRef.current;
  const { control, reset, watch } = form!;
  const [location, setLocation] = useSharedLocation();

  // TODO issue with RHF
  // const location = watch("location");

  const [, setFakeCtr] = useState(0);
  useFocusEffect(
    useCallback(() => setFakeCtr((prevState) => prevState + 1), []),
  );

  console.log("location", location);

  const { data: members = [], isLoading } = useQuery("getMembers", getMembers);

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.selectorContainer}>
          <Text style={styles.text}>
            {i18n.t("T2", { defaultValue: "Date From:" })}:
          </Text>
          <Controller
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker value={value} onDateChange={onChange} />
            )}
            name={"dateFrom"}
            control={control}
          />
        </View>
        <View style={styles.selectorContainer}>
          <Text style={styles.text}>
            {i18n.t("T3", { defaultValue: "Date To:" })}:
          </Text>
          <Controller
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker value={value} onDateChange={onChange} />
            )}
            name={"dateTo"}
            control={control}
          />
        </View>
        {user.groupCode !== "AUDITOR" && (
          <View style={styles.selectorContainer}>
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.green} />
              </View>
            )}
            <Text style={styles.text}>
              {i18n.t("T4", { defaultValue: "Auditor:" })}:
            </Text>
            <Controller
              render={({ field: { onChange, value } }) => (
                <DropdownList
                  options={members?.map((m) => ({ key: m.id, value: m.name }))}
                  dropdownlistStyle={styles.dropdownlistContainer}
                  selectedValueStyle={styles.selectedValue}
                  right={
                    <Icon
                      name="caretdown"
                      size={10}
                      style={styles.arrowIcon}
                      color="gray"
                    />
                  }
                  noOptionSelectedText={i18n.t("T12", { defaultValue: "All" })}
                  selectedOptionKey={value}
                  onOptionSelected={onChange}
                />
              )}
              name={"auditor"}
              control={control}
            />
          </View>
        )}
        <View style={styles.selectorContainer}>
          <Text style={styles.text}>
            {i18n.t("T5", { defaultValue: "HCW:" })}:
          </Text>
          <Controller
            render={({ field: { onChange, value } }) => (
              <WorkerDropdown
                selectedWorkerServerId={value}
                onWorkerSelected={onChange}
              />
            )}
            name={"hcwTitle"}
            control={control}
          />
        </View>
        <View style={styles.selectorContainer}>
          <Text style={styles.text}>
            {i18n.t("LC1", { defaultValue: "Location" })}:
          </Text>
          <Pressable
            style={styles.locationButton}
            onPress={() =>
              router.navigate({
                pathname: "/(app)/(tabs)/(two)/Locations/[serverId]",
                params: { serverId: -1 },
              })
            }
          >
            <Text style={styles.locationText}>
              {location?.name || i18n.t("NO_LOCATION_SELECTED")}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            reset({
              dateFrom: new Date(),
              dateTo: new Date(),
              auditor: undefined,
              location: undefined,
              hcwTitle: undefined,
            })
          }
        >
          <Text style={styles.cancelTitle}>{i18n.t("RESET")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={router.back}>
          <Text style={styles.filterTitle}>
            {i18n.t("S4", { defaultValue: "Filter" })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type WithObservableProps = ObservableifyProps<FilterReportProps, "user">;
const FilterReport = withObservables(
  ["user"],
  (props: WithObservableProps) => ({
    user: database
      .get<User>("users")
      .query(Q.take(1))
      .observe()
      .pipe(
        switchMap((user) => (user.length > 0 ? user[0].observe() : of(null))),
      ),
  }),
)(Component as any);

export default FilterReport;
