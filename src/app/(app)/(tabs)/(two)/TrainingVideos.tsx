import React from "react";
import { Link } from "expo-router";
import { View } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";

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
        <TouchableRipple onPress={() => {}} style={styles.itemContainer}>
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
      <Link href="/WHOMy5MomentsForHandHygiene" asChild>
        <TouchableRipple onPress={() => {}} style={styles.itemContainer}>
          <List.Item
            titleStyle={styles.titleColor}
            title={i18n.t("K4", {
              defaultValue: 'WHO - "My 5 Moments for Hand Hygiene"',
            })}
            titleNumberOfLines={1}
          />
        </TouchableRipple>
      </Link>

      {/* Item 3 */}
      <Link href="/GlobalHandHygieneExcellenceAward" asChild>
        <TouchableRipple onPress={() => {}} style={styles.itemContainer}>
          <List.Item
            titleStyle={styles.titleColor}
            title={i18n.t("K5", {
              defaultValue: "Global Hand Hygiene Excellence Award",
            })}
            titleNumberOfLines={1}
          />
        </TouchableRipple>
      </Link>
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
    borderBottomColor: colors.lightGray,
  },
  videoHeaderContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: colors.lightGray,
  },
  videoTitle: {
    color: colors.charcoal,
    textAlign: "left",
    alignItems: "center",
    padding: 6,
    marginHorizontal: 10,
  },
  titleColor: {
    color: colors.charcoal,
  },
});

export default TrainingVideos;
