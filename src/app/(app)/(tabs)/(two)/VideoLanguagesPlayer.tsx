import React from "react";
import { View, Image } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useLocalSearchParams, router } from "expo-router";
import { Text, TouchableRipple } from "react-native-paper";
import { colors } from "@theme/index";

function VideoPlayerLanguages() {
  const { styles } = useStyles(stylesheet);

  const { name, videoUrl } = useLocalSearchParams();

  const handleVideoPlayer = (url: string | string[]) => {
    router.navigate({
      pathname: "/VideoPlayer",
      params: { videoUrl: url },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        style={styles.videoPlayerContainer}
        onPress={() => handleVideoPlayer(videoUrl)}
      >
        <Image
          source={require("@assets/images/hat-images/video-poster.jpg")}
          resizeMode="contain"
          style={styles.videoPlayerImage}
        />
      </TouchableRipple>
      <View style={styles.handlogoContainer}>
        <Text style={styles.handlogoText}>{name}</Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  videoPlayerContainer: {
    alignItems: "center",
    backgroundColor: colors.bgColor,
    marginTop: "5%",
    width: "90%",
    borderRadius: 2,
  },
  videoPlayerImage: {
    height: 200,
    width: 300,
  },
  handlogoContainer: {
    width: "90%",
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    shadowColor: colors.midNight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  handlogoText: {
    color: colors.midNight,
    textTransform: "uppercase",
    marginHorizontal: 10,
  },
});

export default VideoPlayerLanguages;
