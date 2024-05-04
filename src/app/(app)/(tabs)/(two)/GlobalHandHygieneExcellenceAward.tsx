import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { router } from "expo-router";
import { Text, TouchableRipple } from "react-native-paper";
import { colors } from "@theme/index";

function GlobalHandHygieneExcellenceAward() {
  const { styles } = useStyles(stylesheet);

  const videoUrls = [
    "http://www.hhea.info/",
    "https://www.youtube.com/watch?v=Tyfq8rTafrw",
  ];

  const handlerVideo = (videoUrlIndex: number) => {
    const selectedVideoUrl = videoUrls[videoUrlIndex];
    router.navigate({
      pathname: "/VideoPlayer",
      params: { videoUrl: selectedVideoUrl },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        style={styles.videoPlayerContainer}
        onPress={() => handlerVideo(1)}
      >
        <Image
          source={require("@assets/images/hat-images/video-poster.jpg")}
          resizeMode="contain"
          style={styles.videoPlayerImage}
        />
      </TouchableRipple>
      <TouchableOpacity
        style={styles.handlogoContainer}
        onPress={() => handlerVideo(0)}
      >
        <Image
          source={require("@assets/images/hat-images/handlogo.png")}
          resizeMode="contain"
          style={styles.handlogoImage}
        />
        <Text style={styles.handlogoText}>How to Apply</Text>
      </TouchableOpacity>
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
    flexDirection: "row",
    width: "90%",
    paddingHorizontal: 8,
    paddingVertical: 10,
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
  handlogoImage: {
    height: 20,
    width: 20,
  },
  handlogoText: {
    color: colors.cerulean,
    marginHorizontal: 10,
  },
});

export default GlobalHandHygieneExcellenceAward;
