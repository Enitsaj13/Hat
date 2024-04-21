import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Locations() {
  const { selectedLocationServerId } = useLocalSearchParams<{
    selectedLocationServerId: string;
  }>();
  console.log("selectedLocationServerId", selectedLocationServerId);

  return (
    <View>
      <Text>{`${selectedLocationServerId}`}</Text>
    </View>
  );
}
