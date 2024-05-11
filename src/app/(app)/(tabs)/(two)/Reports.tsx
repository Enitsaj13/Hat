import React from "react";
import { ScrollView, Text, View } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { colors } from "@theme/index";
import { i18n, i18nOptions } from "@i18n/index";

const currentDate: Date = new Date();

const formattedDate: string = currentDate.toLocaleString(
    "en-US",
    i18nOptions.dateFormatOptions,
);

const Reports = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={[styles.rowContainer, styles.titleContainer]}>
                <Text style={styles.title}>
                    {i18n.t("U3", { defaultValue: "Full Details" })}
                </Text>
            </View>
            <View style={[styles.rowContainer, styles.rowGray]}>
                <Text style={styles.text}>
                    {i18n.t("U4", { defaultValue: "Location Audited" })}
                </Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("B6", { defaultValue: "Department 4" })} 4
                </Text>
            </View>
            <View style={styles.grayEmpty} />
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U10", { defaultValue: "Date and Time" })} 4
                </Text>
                <Text style={styles.grayText}>{formattedDate}</Text>
            </View>
            <View style={styles.grayEmpty} />
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U11", { defaultValue: "Type of HCW 4" })}
                </Text>
                <Text style={styles.grayText}>Nurse</Text>
            </View>
            <View style={styles.grayEmpty} />
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("ADD2", { defaultValue: "Moments" })}
                </Text>
                <Text style={styles.grayText}>1 2 3</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U14", { defaultValue: "H.H. Action" })}
                </Text>
                <Text style={styles.grayText}>
                    {i18n.t("AE10", { defaultValue: "Wash" })}
                </Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U15", { defaultValue: "H.H. Result" })}
                </Text>
                <Text style={styles.grayText}>
                    {i18n.t("S10", { defaultValue: "Passed" })}
                </Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U16", { defaultValue: "Occupational Risk" })}
                </Text>
                <Text style={styles.grayText}>-</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U17", { defaultValue: "Glove Compliance" })}
                </Text>
                <Text style={styles.grayText}>-</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U18", { defaultValue: "Gown Compliance" })}
                </Text>
                <Text style={styles.grayText}>-</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U19", { defaultValue: "Mask Compliance" })}
                </Text>
                <Text style={styles.grayText}>-</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U20", { defaultValue: "Mask Type" })}
                </Text>
                <Text style={styles.grayText}>-</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>
                    {i18n.t("U21", { defaultValue: "Notes" })}
                </Text>
                <Text style={styles.grayText}>try me</Text>
            </View>
        </ScrollView>
    );
};

const styles = createStyleSheet({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 44,
        paddingHorizontal: 15,
        borderBottomWidth: 0.4,
        borderBottomColor: colors.lightGray,
    },
    titleContainer: {
        justifyContent: "center",
        height: 40,
    },
    title: {
        textAlign: "center",
        fontSize: 14,
        color: colors.midNight,
    },
    text: {
        color: colors.midNight,
        fontSize: 14,
    },
    rowGray: {
        backgroundColor: "#fafafa",
    },
    grayText: {
        color: colors.cadetGrey,
    },
    grayEmpty: {
        height: 35,
        borderBottomWidth: 0.4,
        borderBottomColor: colors.lightGray,
        backgroundColor: "#fafafa",
    },
});

export default Reports;
