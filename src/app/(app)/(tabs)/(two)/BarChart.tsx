import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "@theme/index";

const Chart = () => {
    const barData = [
        {
            value: 230,
            label: 'Jan',
            frontColor: colors.mediumPurple,
            sideColor: '#23A7F3',
            topColor: '#92e6f6',
            topLabelComponent: () => (
                <Text style={{ color: colors.textColor, fontSize: 18, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 180,
            label: 'Feb',
            frontColor: colors.mediumPurple,
            sideColor: colors.vividCerulean,
            topColor: '#9FD4E5',
            topLabelComponent: () => (
                <Text style={{ color: colors.textColor, fontSize: 18, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 195,
            label: 'Mar',
            frontColor: colors.mediumPurple,
            sideColor: '#0FAAAB',
            topColor: '#66C9C9',
            topLabelComponent: () => (
                <Text style={{ color: colors.textColor, fontSize: 18, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 250,
            label: 'Apr',
            frontColor: colors.mediumPurple,
            sideColor: '#36D9B2',
            topColor: '#7DE7CE',
            topLabelComponent: () => (
                <Text style={{ color: colors.textColor, fontSize: 18, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 320,
            label: 'May',
            frontColor: colors.mediumPurple,
            sideColor: '#85E0E0',
            topColor: '#B0EAEB',
            topLabelComponent: () => (
                <Text style={{ color: colors.textColor, fontSize: 18, marginBottom: 6 }}>50</Text>
            ),
        },
    ];

    return (
        <View style={{
            backgroundColor: '#035e46',
            marginBottom: 10
        }}>
            <BarChart
                xAxisLabelTextStyle={{ color: colors.textColor }}
                noOfSections={2}
                maxValue={400}
                data={barData}
                barWidth={40}
                sideWidth={20}
                barBorderRadius={4}
                isThreeD
                isAnimated
                side="right"
                yAxisColor={colors.babyBlue}
                xAxisColor={colors.babyBlue}
                hideAxesAndRules={true}
                showGradient
                gradientColor={colors.lilyWhite}
            />
        </View>
    );
};

export default Chart;
