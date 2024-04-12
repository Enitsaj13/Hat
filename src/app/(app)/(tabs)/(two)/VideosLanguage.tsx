import { Link } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const VideosLanguages = () => {
  const { styles } = useStyles(stylesheet);

  // Define an array of languages
  const languages = [
    "English",
    "French",
    "Spanish",
    "Arabic",
    "Chinese",
    "Russian",
    "German",
    "Indonesian",
    "Italian",
    "Japanese",
    "Portuguese",
    "Romanian",
    "Turkish",
  ];

  const renderItem = ({ item }: any) => (
    <Link href="/VideoPlayer" asChild>
      <TouchableRipple style={styles.itemContainer}>
        <List.Item
          titleStyle={{ color: "#334155" }}
          title={item}
          titleNumberOfLines={1}
        />
      </TouchableRipple>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.videoHeaderContainer}>
        <Text variant="bodyLarge" style={styles.videoTitle}>
          VIDEOS IN DIFFERENT LANGUAGES
        </Text>
      </View>
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Use index as key (not recommended for production)
        contentContainerStyle={{ flexGrow: 1 }}
      />
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
    padding: 6,
    marginHorizontal: 10,
  },
});

export default VideosLanguages;
