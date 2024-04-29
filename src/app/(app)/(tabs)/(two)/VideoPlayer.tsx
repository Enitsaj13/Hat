import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from "expo-router";

const VideoScreen = () => {
  const params = useLocalSearchParams();
  const { videoUrl } = params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: videoUrl as string }}
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  webView: {
    flex: 1,
  },
});

export default VideoScreen;
