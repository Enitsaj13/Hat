import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { Entypo as Icon, Ionicons as SearchIcon } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors } from "@theme/index";
import { i18n } from "@i18n/index";

const ObservationRecords = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleCancelPress = () => {
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchIcon}>
                        <SearchIcon name="search-outline" color="white" size={16} />
                    </View>
                    <TextInput
                        style={styles.searchBar}
                        placeholder={i18n.t("SEARCH_PLACEHOLDER")}
                        placeholderTextColor={colors.textColor}
                        value={searchInput}
                        onChangeText={(text) => setSearchInput(text)}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleCancelPress}
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancelText}>
                        {i18n.t("I3", { defaultValue: 'Cancel' })}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dateFilteredContainer}>
                <Text style={styles.dateText}>
                    {i18n.t("S6", { defaultValue: "Date Filtered" })}{" "}
                </Text>
                <Text style={styles.dateText}>Apr 4, 2024 to May 8, 2024</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.text}>
                        {i18n.t("ADD20", { defaultValue: "Total Opportunities" })}
                    </Text>
                    <Text style={styles.text}>1</Text>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.hcwTypeContainer}>
                        <Text style={styles.text}>Nurse</Text>
                        <Text style={styles.text}>1</Text>
                    </View>
                    <Text style={styles.text}>100%</Text>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.hcwTypeContainer}>
                        <Text style={styles.text}>Doctors</Text>
                        <Text style={styles.text}>1</Text>
                    </View>
                    <Text style={styles.text}>100%</Text>
                </View>
            </View>
            <View style={styles.filteredDataContainer}>
                <Text style={styles.text}>May 8, 2024</Text>
            </View>
            <TouchableOpacity
                onPress={() => router.navigate("Reports")}
                style={styles.hcwTypeFiltered}
            >
                <View style={styles.hcwFilteredContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Nurse</Text>
                        <View style={styles.dateRowContainer}>
                            <Text style={styles.grayText}>May 08, 2024 10:59 AM </Text>
                            <Text style={styles.grayText}>| Moments 1 4 </Text>
                            <Text style={styles.grayText}>| Passed</Text>
                        </View>
                    </View>
                </View>
                <Icon name="chevron-thin-right" size={14} color={colors.steelGrey} />
            </TouchableOpacity>
            <View style={styles.filteredDataContainer}>
                <Text style={styles.text}>May 13, 2024</Text>
            </View>
            <TouchableOpacity
                onPress={() => router.navigate("Reports")}
                style={styles.hcwTypeFiltered}
            >
                <View style={styles.hcwFilteredContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Doctors</Text>
                        <View style={styles.dateRowContainer}>
                            <Text style={styles.grayText}>May 13, 2024 12:59 PM </Text>
                            <Text style={styles.grayText}>| Moments 1 4 </Text>
                            <Text style={styles.grayText}>| Passed</Text>
                        </View>
                    </View>
                </View>
                <Icon name="chevron-thin-right" size={14} color={colors.steelGrey} />
            </TouchableOpacity>
        </View>
    );
};

const styles = createStyleSheet({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    dateFilteredContainer: {
        flexDirection: "row",
        backgroundColor: colors.babyBlue,
        paddingVertical: 8,
        width: "100%",
        paddingHorizontal: 10,
    },
    dateText: {
        color: colors.cerulean,
        fontSize: 14,
    },
    text: {
        color: colors.midNight,
        fontSize: 14,
    },
    rowContainer: {
        flexDirection: "row",
        width: "70%",
        justifyContent: "space-between",
        alignItems: "center",
        height: 25,
        paddingHorizontal: 10,
    },
    contentContainer: {
        marginTop: 10,
        padding: 10,
    },
    hcwTypeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginRight: 30,
    },
    filteredDataContainer: {
        height: 30,
        borderWidth: 0.4,
        borderColor: colors.lightGray,
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
    },
    hcwTypeFiltered: {
        width: "95%",
        flexDirection: "row",
        height: 80,
        alignItems: "center",
        borderBottomWidth: 0.4,
        borderBottomColor: colors.lightGray,
        justifyContent: "space-between",
    },
    hcwFilteredContainer: {
        flexDirection: "row",
        padding: 20,
    },
    dateRowContainer: {
        flexDirection: "row",
    },
    grayText: {
        color: colors.cadetGrey,
        fontSize: 12,
        paddingVertical: 4,
    },
    infoContainer: {
        flexDirection: "column",
    },
    searchBarContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: colors.bgColor,
        height: 40,
        alignItems: "center",
    },
    searchContainer: {
        width: "85%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.borderColor,
        borderRadius: 4,
        paddingHorizontal: 10,
        height: 35,
    },
    searchBar: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 14,
        color: colors.textColor,
    },
    searchIcon: {
        padding: 2,
    },
    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    cancelText: {
        color: colors.textColor,
    },
});

export default ObservationRecords;