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

export default function Locations() {
  const { styles } = useStyles(stylesheet);
  const { serverId, parentName } = useLocalSearchParams<{
    serverId: string;
    parentName?: string;
  }>();
  console.log("serverId", serverId);

  const router = useRouter();
  const onLocationPress = useCallback(async (location: Location) => {
    const childrenCount = await database
      .get<Location>("locations")
      .query(Q.where("parent_server_id", location.serverId))
      .fetchCount();

    if (childrenCount > 0) {
      router.push({
        pathname: "/(app)/(tabs)/(one)/Locations/[serverId]",
        params: { serverId: location.serverId, parentName: location.name },
      });
    } else {
      // TODO locations save in useBatchObservation
      console.log("No more children, should redirect to main screen now");
    }
  }, []);

  const navigation = useNavigation();
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
        onLocationPress={onLocationPress}
      />
    </View>
  );
}

interface LocationListProps {
  parentServerId: number;
  locations?: Location[];
  onLocationPress: (location: Location) => void;
}

function LocationListComponent({
  locations,
  onLocationPress,
}: LocationListProps) {
  const theme = useTheme();
  const { styles } = useStyles(stylesheet);
  return (
    <FlatList
      data={locations}
      renderItem={({ item }) => (
        <TouchableRipple
          key={item.serverId}
          onPress={() => onLocationPress(item)}
        >
          <List.Item
            contentStyle={styles.itemContent}
            title={item.name}
            titleStyle={[styles.title, { color: theme.colors.onPrimary }]}
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
    locations: database
      .get<Location>("locations")
      .query(
        Q.where(
          "parent_server_id",
          Q.eq(props.parentServerId !== -1 ? props.parentServerId : null),
        ),
      ),
  }),
)(LocationListComponent);

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  itemContent: {
    flex: 1,
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingRight: 0,

    // not sure why there is padding on the right, just here to help visually
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  title: {
    textAlign: "center",
  },
});
