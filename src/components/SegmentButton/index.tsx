import { colors } from '@theme/index';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { createStyleSheet } from "react-native-unistyles";

interface SegmentedButtonProps {
    segments: string[];
    onSegmentChange: (index: number) => void;
}

function SegmentedButton({ segments, onSegmentChange }: SegmentedButtonProps) {
    const [selectedSegment, setSelectedSegment] = useState(0);

    const handleSegmentPress = (index: number) => {
        setSelectedSegment(index);
        onSegmentChange(index);
    };

    return (
        <View style={styles.container}>
            {segments.map((segment, index) => (
                <TouchableRipple
                    key={index}
                    style={[
                        styles.segment,
                        index === selectedSegment && styles.selectedSegment,
                        index < segments.length - 1 && styles.borderRight // Add border to all segments except the last one
                    ]}
                    onPress={() => handleSegmentPress(index)}
                >
                    <Text style={[styles.segmentText, index === selectedSegment && styles.selectedText]}>
                        {segment}
                    </Text>
                </TouchableRipple>
            ))}
        </View>
    );
};

const styles = createStyleSheet({
    container: {
        flexDirection: 'row',
        overflow: 'hidden',
    },
    segment: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.textColor,
    },
    selectedSegment: {
        backgroundColor: colors.mediumPurple
    },
    segmentText: {
        color: colors.midNight,
        fontSize: 14,
    },
    selectedText: {
        color: colors.textColor
    },
    borderRight: {
        borderRightWidth: 0.4,
        borderColor: colors.cadetGrey
    },
});

export default SegmentedButton;
