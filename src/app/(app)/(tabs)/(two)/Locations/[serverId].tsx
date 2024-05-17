import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { List, TouchableRipple, useTheme } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Location } from "@stores/location";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { useCallback, useEffect } from "react";
import isEmpty from "lodash.isempty";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import { Entypo as Icon } from "@expo/vector-icons";
import { useGetObservationsFormRef } from "@app/(app)/(tabs)/(two)/ObservationRecords/report-commons";

export default function Locations() {
  const { styles } = useStyles(stylesheet);
  const { serverId, parentName } = useLocalSearchParams<{
    serverId: string;
    parentName?: string;
  }>();

  const formRef = useGetObservationsFormRef();
  const form = formRef.current;
  const { setValue, trigger } = form!;

  const router = useRouter();
  const navigation = useNavigation();

  console.log("at tab two locations, serverId", serverId);
  const onLocationPress = useCallback(
    async (location: Location) => {
      const childrenCount = await database
        .get<Location>("locations")
        .query(Q.where("parent_server_id", location.serverId))
        .fetchCount();

      if (childrenCount > 0 && location.serverId !== parseInt(serverId, 10)) {
        router.navigate({
          pathname: "/(app)/(tabs)/(two)/Locations/[serverId]",
          params: { serverId: location.serverId, parentName: location.name },
        });
      } else {
        const loc =
          parseInt(serverId, 10) !== -1
            ? { serverId: location.serverId, name: location.name }
            : undefined;
        console.log("No more children, should go back: ", loc);
        setValue("location", loc, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
        await trigger("location");
        setTimeout(() => {
          navigation.reset({
            index: 1,
            routes: [
              {
                name: "ObservationRecords",
              },
              {
                name: "FilterReport",
              },
            ] as any,
          });
        }, 200);
      }
    },
    [serverId],
  );

  useEffect(() => {
    navigation.setOptions({
      title: !isEmpty(parentName)
        ? parentName
        : i18n.t("LC2", {
            defaultValue: "Location",
          }),
    });
  }, [parentName]);

  return (
    <View style={styles.container}>
      <LocationList
        parentServerId={parseInt(serverId, 10)}
        parentName={parentName}
        onLocationPress={onLocationPress}
      />
    </View>
  );
}

interface LocationListProps {
  parentServerId: number;
  parentName: string;
  locations?: Location[];
  onLocationPress: (location: { serverId: number; name: string }) => void;
}

function LocationListComponent({
  parentServerId,
  parentName,
  locations,
  onLocationPress,
}: LocationListProps) {
  const theme = useTheme();
  const { styles } = useStyles(stylesheet);
  return (
    <FlatList
      data={[
        { serverId: parentServerId, name: parentName, isParent: true },
        ...(locations || []),
      ]}
      renderItem={({ item }) => (
        <TouchableRipple
          key={item.serverId}
          onPress={() => onLocationPress(item)}
          style={styles.itemContainer}
        >
          <List.Item
            title={
              !Object.hasOwn(item, "isParent")
                ? item.name
                : i18n.t("T12", { defaultValue: "--All--" })
            }
            titleStyle={[styles.title, { color: theme.colors.onPrimary }]}
            right={() => (
              <Icon
                name="chevron-thin-right"
                size={16}
                color={colors.midNight}
              />
            )}
          />
        </TouchableRipple>
      )}
    />
  );
}

type WithObservableProps = ObservableifyProps<LocationListProps, "locations">;
const LocationList = withObservables(
  ["locations", "parentServerId"],
  (props: WithObservableProps) => ({
    locations: database.get<Location>("locations").query(
      Q.where(
        "parent_server_id",
        // TODO Select All here
        Q.eq(props.parentServerId !== -1 ? props.parentServerId : null),
      ),
    ),
  }),
)(LocationListComponent);

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    color: colors.charcoal,
    fontSize: 16,
    fontWeight: "300",
  },
});
