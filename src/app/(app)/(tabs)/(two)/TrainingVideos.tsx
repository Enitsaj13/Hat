import { i18n } from "@i18n/index";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const TrainingVideos = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.videoHeaderContainer}>
        <Text variant="bodyLarge" style={styles.videoTitle}>
          VIDEOS
        </Text>
      </View>
      {/* Item 1 */}
      <Link href="/VideosLanguage" asChild>
        <TouchableRipple
          onPress={() => console.log("Clicked!!")}
          style={styles.itemContainer}
        >
          <List.Item
            titleStyle={styles.titleColor}
            title={i18n.t("K3", {
              defaultValue: "New England Journal of Medicine Hand Hygiene",
            })}
            titleNumberOfLines={1}
          />
        </TouchableRipple>
      </Link>

      {/* Item 2 */}
      <TouchableRipple
        onPress={() => console.log("Clicked!!")}
        style={styles.itemContainer}
      >
        <List.Item
          titleStyle={styles.titleColor}
          title={i18n.t("K4", {
            defaultValue: 'WHO - "My 5 Moments for Hand Hygiene"',
          })}
          titleNumberOfLines={1}
        />
      </TouchableRipple>

      {/* Item 3 */}
      <TouchableRipple
        onPress={() => console.log("Clicked!!")}
        style={styles.itemContainer}
      >
        <List.Item
          titleStyle={styles.titleColor}
          title={i18n.t("K5", {
            defaultValue: "Global Hand Hygiene Excellence Award",
          })}
          titleNumberOfLines={1}
        />
      </TouchableRipple>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: "lightgray",
  },
  videoHeaderContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: "lightgray",
    backgroundColor: "#f1f5f9",
  },
  videoTitle: {
    color: "#334155",
    textAlign: "left",
    alignItems: "center",
    padding: 6,
    marginHorizontal: 10,
  },
  titleColor: {
    color: "#334155",
  },
});

export default TrainingVideos;
