import { useState } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import BarChart from './BarChart'

const Charts = () => {

    const [showChart, setShowChart] = useState<boolean>(false);

    const handleButtonClick = () => {
        setShowChart(true);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.dateFilteredContainer}>
                <Text style={styles.dateFilteredText}>
                    {i18n.t("S6", { defaultValue: "Date Filtered:" })}
                </Text>
                <Text style={styles.dateFilteredText}>
                    {' May 10, 2024 to May 20, 2024'}
                </Text>
            </View>
            <View style={styles.titleLabelContainer}>
                <Text style={styles.healthCareTitle}>
                    {i18n.t("W8", {
                        defaultValue: "Opportunity Statistics",
                    })}
                </Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.textTable}>
                    {i18n.t("W11", {
                        defaultValue: "Unsent Opportunities",
                    })}
                </Text>
                <Text style={styles.textTable}>2</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.textTable}>
                    {i18n.t("DL4", {
                        defaultValue: "Opportunities Recorded",
                    })}
                </Text>
                <Text style={styles.textTable}>2</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.textTable}>
                    {i18n.t("DL3", {
                        defaultValue: "Opportunities Passed",
                    })}
                </Text>
                <Text style={styles.textTable}>2</Text>
            </View>

            <View style={styles.handHygieneContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.handHygieneText}>
                        {i18n.t("DL5", {
                            defaultValue: "Hand Hygiene Compliance",
                        })}
                    </Text>
                </View>
                <View style={styles.handHygienePercentContainer}>
                    <Text style={styles.handHygieneText}>%</Text>
                </View>
            </View>
            <View style={styles.titleLabelContainer}>
                <Text style={styles.healthCareTitle}>
                    {i18n.t("W12", {
                        defaultValue: "Compliance Rate",
                    })}
                </Text>
            </View>
            <Button title="Show Chart" onPress={handleButtonClick} />
            <View style={{ backgroundColor: '#035e46' }}>
                {showChart && <BarChart />}
            </View>
            <View style={styles.titleLabelContainer}>
                <Text style={styles.healthCareTitle}>
                    {i18n.t("W14", {
                        defaultValue: "COMPLIANCE DETAILS - by Moments",
                    })}
                </Text>
                <View style={styles.complianceDetailsContainer}>
                    <Text style={styles.textRow}>
                        {i18n.t("AH7", {
                            defaultValue: "Moment",
                        })}
                    </Text>
                    <Text style={styles.textRow}>
                        {i18n.t("ADD8", {
                            defaultValue: "Count",
                        })}
                    </Text>
                    <Text style={styles.textRow}>
                        {i18n.t("AH9", {
                            defaultValue: "Passed",
                        })}
                    </Text>
                    <Text style={styles.textRow}>
                        {i18n.t("AH10", {
                            defaultValue: "Failed",
                        })}
                    </Text>
                    <Text style={styles.textRow}>
                        {i18n.t("W19", {
                            defaultValue: "Percent",
                        })}
                    </Text>
                </View>
            </View>
            <View style={[styles.tableContainer, styles.tableCompliance]}>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>3</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>1</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>0</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>1</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>100%</Text>
                </View>
            </View>
            <View style={[styles.tableContainer, styles.tableCompliance]}>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>4</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>1</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>0</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>1</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>100%</Text>
                </View>
            </View>

            <View style={[styles.tableContainer, styles.tableCompliance]}>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>4</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>1</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>0</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>1</Text>
                </View>
                <View style={styles.tableComplianceContainer}>
                    <Text style={styles.tableText}>100%</Text>
                </View>
            </View>

        </ScrollView>
    );
};

const styles = createStyleSheet({
    container: {
        flexGrow: 1,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 45,
        alignItems: "center",
        paddingHorizontal: 15,
        borderBottomWidth: 0.4,
        borderColor: colors.green,
    },
    textTable: {
        color: colors.textColor,
        fontSize: 16,
    },
    handHygieneContainer: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: colors.textColor,
        padding: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    handHygieneText: {
        color: colors.textColor,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    titleContainer: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
    },
    handHygienePercentContainer: {
        width: "5%",
    },
    titleLabelContainer: {
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.green,
    },
    dateFilteredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        backgroundColor: colors.babyBlue,
        padding: 8
    },
    dateFilteredText: {
        fontSize: 14,
        color: colors.cerulean,
    },
    healthCareTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: colors.textColor,
    },
    textRow: {
        fontSize: 14,
        color: colors.textColor,
        marginHorizontal: 14,
    },
    countPercentTitleContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 14,
        width: "100%",
    },
    countPercentContainer: {
        width: "20%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 0.4,
        borderColor: colors.green,
    },
    tableContainer: {
        backgroundColor: colors.bgColor,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 40,
        borderBottomWidth: 0.4,
        borderColor: colors.green,
    },
    tableText: {
        fontSize: 14,
        color: colors.textColor,
        textAlign: "center",
    },
    totalContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        borderRightWidth: 0.4,
        borderColor: colors.green,
    },
    textTotal: {
        fontSize: 14,
        color: colors.textColor,
        textAlign: "center",
    },
    complianceDetailsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 14,
        width: "100%",
    },
    tableCompliance: {
        justifyContent: "space-evenly",
    },
    tableComplianceContainer: {
        flexDirection: "row",
        width: "20%",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRightWidth: 0.4,
        borderColor: colors.green,
    },
    feedbackContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 2,
        borderColor: colors.textColor,
        paddingHorizontal: 12,
        padding: 6,
        flexDirection: "row",
        alignItems: "center",
    },
    feedbackTextContainer: {
        width: "70%",
        alignItems: "flex-start",
    },
    feedbackButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "25%",
        marginHorizontal: 18,
    },
    switchIndication: {
        transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
    },
});

export default Charts;