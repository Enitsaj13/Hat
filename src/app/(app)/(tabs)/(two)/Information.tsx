import React from "react";
import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { colors } from "@theme/index";
import { i18n } from "@i18n/index";

interface TileProps {
  imageSource: ImageSourcePropType;
  label: string;
  onPress: (e: GestureResponderEvent) => void;
}

const Tile = React.forwardRef<TouchableOpacity, TileProps>(
  ({ imageSource, label, onPress }, ref) => {
    const { styles } = useStyles(stylesheet);

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.8}
        style={styles.tileContainer}
        onPress={onPress}
      >
        <Image
          source={imageSource}
          style={styles.infoImages}
          resizeMode="contain"
        />
        <Text variant="bodyLarge" style={styles.labelText}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  },
);

function Information() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Tile
          imageSource={require("@assets/images/hat-images/charts.png")}
          label={i18n.t("H3", { defaultValue: "Charts" })}
          onPress={() => { }}
        />
        <Link href="/(app)/(tabs)/(two)/ObservationRecords" asChild>
          <Tile
            imageSource={require("@assets/images/hat-images/reports.png")}
            label={i18n.t("H4", { defaultValue: "Reports" })}
            onPress={() => { }}
          />
        </Link>
        <Link href="/TrainingVideos" asChild>
          <Tile
            imageSource={require("@assets/images/hat-images/video.png")}
            label={i18n.t("H7", { defaultValue: "Training Videos" })}
            onPress={() => { }}
          />
        </Link>
        <Link href="/FAQ" asChild>
          <Tile
            imageSource={require("@assets/images/hat-images/faq.png")}
            label={i18n.t("H8", { defaultValue: "FAQ" })}
            onPress={() => { }}
          />
        </Link>
        <Link href="/Introduction" asChild>
          <Tile
            imageSource={require("@assets/images/hat-images/introduction.png")}
            label={i18n.t("REVISIT_INTRODUCTION")}
            onPress={() => { }}
          />
        </Link>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  infoContainer: {
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoImages: {
    height: 80,
    width: 80,
  },
  tileContainer: {
    paddingVertical: 30,
    alignItems: "center",
    width: "48%",
    borderWidth: 0.4,
    borderColor: colors.textColor,
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  labelText: {
    textAlign: "center",
  },
});

export default Information;
