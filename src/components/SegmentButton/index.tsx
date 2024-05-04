import { colors } from "@theme/index";
import React from "react";
import { Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { createStyleSheet } from "react-native-unistyles";

interface SegmentedButtonProps {
  segments: { value: any; label: string }[];
  onSegmentChange: (value: any) => void;
  value?: any;
}

function SegmentedButton({
  segments,
  onSegmentChange,
  value,
}: SegmentedButtonProps) {
  return (
    <View style={styles.container}>
      {segments.map((segment, index) => (
        <TouchableRipple
          key={segment.value}
          style={[
            styles.segment,
            segment.value === value && styles.selectedSegment,
            index < segments.length - 1 && styles.borderRight, // Add border to all segments except the last one
          ]}
          onPress={onSegmentChange}
        >
          <Text
            style={[
              styles.segmentText,
              segment.value === value && styles.selectedText,
            ]}
          >
            {segment.label}
          </Text>
        </TouchableRipple>
      ))}
    </View>
  );
}

const styles = createStyleSheet({
  container: {
    flexDirection: "row",
    overflow: "hidden",
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.textColor,
  },
  selectedSegment: {
    backgroundColor: colors.mediumPurple,
  },
  segmentText: {
    color: colors.midNight,
    fontSize: 14,
  },
  selectedText: {
    color: colors.textColor,
  },
  borderRight: {
    borderRightWidth: 0.4,
    borderColor: colors.cadetGrey,
  },
});

export default SegmentedButton;
