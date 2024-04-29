import React from "react";
import { FlatList, View } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { router } from "expo-router";
import { colors } from "@theme/index";

interface LanguageItem {
  name: string;
  videoUrl: string;
}

const VideosLanguages = () => {
  const { styles } = useStyles(stylesheet);

  const handleLanguageSelect = (videoUrl: string, name: string) => {
    router.push({
      pathname: "/VideoLanguagesPlayer",
      params: { videoUrl, name },
    });
  };

  const languages: LanguageItem[] = [
    {
      name: "English",
      videoUrl:
        "https://www.youtube.com/embed/sa1iFq2YuUE?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "French",
      videoUrl:
        "https://www.youtube.com/embed/bV_nJGsPGOw?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Spanish",
      videoUrl:
        "https://www.youtube.com/embed/KcbhC3l-G0o?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Arabic",
      videoUrl:
        "https://www.youtube.com/embed/2NO_IasUqOQ?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Chinese",
      videoUrl:
        "https://www.youtube.com/embed/9qsNq10rnlU?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Russian",
      videoUrl:
        "https://www.youtube.com/embed/12A7TrCT2vw?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "German",
      videoUrl:
        "https://www.youtube.com/embed/sxin4ZiF2V0?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Indonesian",
      videoUrl:
        "https://www.youtube.com/embed/G3K5fzPfv_4?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Italian",
      videoUrl:
        "https://www.youtube.com/embed/KnmWywk22t0?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Japanese",
      videoUrl:
        "https://www.youtube.com/embed/UwmoLOqrRDM?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Portuguese",
      videoUrl:
        "https://www.youtube.com/embed/u3FzDSPyzXo?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Romanian",
      videoUrl:
        "https://www.youtube.com/embed/iBrRbLBuZTw?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Turkish",
      videoUrl:
        "https://www.youtube.com/embed/HltuQ2Fo11w?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
    {
      name: "Vietnamese",
      videoUrl:
        "https://www.youtube.com/embed/Z2C4OSmg5pw?list=PLJGB73vx3VjWeeIPRHxjHpWRKgGAUp6c5",
    },
  ];

  const renderItem = ({ item }: { item: LanguageItem }) => (
    <TouchableRipple
      onPress={() => handleLanguageSelect(item?.videoUrl, item?.name)}
    >
      <View style={styles.itemContainer}>
        <List.Item
          titleStyle={{ color: colors.charcoal }}
          title={item.name}
          titleNumberOfLines={1}
        />
      </View>
    </TouchableRipple>
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
        keyExtractor={(item) => item.name}
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
    borderBottomColor: colors.lightGray,
  },
  videoHeaderContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: colors.lightGray,
  },
  videoTitle: {
    color: colors.charcoal,
    textAlign: "left",
    padding: 6,
    marginHorizontal: 10,
  },
});

export default VideosLanguages;
