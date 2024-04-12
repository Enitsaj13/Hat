import { Video, ResizeMode } from "expo-av";
import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function App() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View>
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          style={styles.video}
          useNativeControls
          shouldPlay
          isLooping
          resizeMode={ResizeMode.CONTAIN}
        />
        <View style={styles.videoHeaderContainer}>
          <Text variant="bodyLarge" style={styles.videoTitle}>
            ENGLISH
          </Text>
        </View>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  video: {
    marginTop: 20,
    width: "90%",
    height: 200,
    alignSelf: "center",
  },
  videoHeaderContainer: {
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    marginHorizontal: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  videoTitle: {
    color: "#334155",
    padding: 10,
    marginHorizontal: 10,
  },
});
