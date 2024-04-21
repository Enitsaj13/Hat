import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Location } from "@stores/location";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";

export default function Locations() {
  const { styles } = useStyles(stylesheet);
  const { serverId } = useLocalSearchParams<{
    serverId: string;
  }>();
  console.log("serverId", serverId);

  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>{`${serverId}`}</Text>
      <LocationList parentServerId={parseInt(serverId, 10)} />
    </View>
  );
}

interface LocationListProps {
  parentServerId: number;
  locations?: Location[];
}

function LocationListComponent({ locations }: LocationListProps) {
  return (
    <Text style={{ color: "black" }}>{locations?.map((l) => l.name)}</Text>
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
  },
});
