import React from "react";
import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { colors } from "@theme/index";

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

  const handleTilePress = (label: string) => {
    console.log(label + " Clicked!");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.infoContainer}>
        <Tile
          imageSource={require("@assets/images/hat-images/charts.png")}
          label="Charts"
          onPress={() => handleTilePress("Charts")}
        />
        <Tile
          imageSource={require("@assets/images/hat-images/reports.png")}
          label="Reports"
          onPress={() => handleTilePress("Reports")}
        />
        <Link href="/TrainingVideos" asChild>
          <Tile
            imageSource={require("@assets/images/hat-images/video.png")}
            label="Training Videos"
            onPress={() => handleTilePress("Training Videos")}
          />
        </Link>
        <Tile
          imageSource={require("@assets/images/hat-images/faq.png")}
          label="FAQ"
          onPress={() => handleTilePress("FAQ")}
        />
        <Link href="/Introduction" asChild>
          <Tile
            imageSource={require("@assets/images/hat-images/introduction.png")}
            label="Revisit Introduction"
            onPress={() => handleTilePress("Revisit Introduction")}
          />
        </Link>
        {/*<Link href="/PracticeMode" asChild>*/}
        {/*  <Tile*/}
        {/*    imageSource={require("@assets/images/hat-images/simulator.png")}*/}
        {/*    label="Practice Mode"*/}
        {/*    onPress={() => handleTilePress("Practice Mode")}*/}
        {/*  />*/}
        {/*</Link>*/}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    marginTop: 10,
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
