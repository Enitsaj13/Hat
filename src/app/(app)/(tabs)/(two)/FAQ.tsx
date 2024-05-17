import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
    FlatList
} from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { Ionicons as SearchIcon } from "@expo/vector-icons";
import { List, Divider } from 'react-native-paper';
import { colors } from "@theme/index";
import { i18n } from "@i18n/index";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>([]);

    const handleCancelPress = () => {
        Keyboard.dismiss();
        setSearchInput("");
        setFilteredFaqs([]);
    };

    const handleSearch = (text: string) => {
        setSearchInput(text);
        const filtered = faqs.filter(faq =>
            faq.question.toLowerCase().includes(text.toLowerCase()) ||
            faq.answer.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredFaqs(filtered);
    };

    const faqs: FAQItem[] = [
        { question: i18n.t("J1", { defaultValue: 'Who will the audit result be emailed to?' }), answer: i18n.t('J2') },
        { question: i18n.t("J3", { defaultValue: 'How fast can the observer receive the results?' }), answer: i18n.t("J4") },
        { question: i18n.t("J5", { defaultValue: 'Can the audit still be carried out without any internet connection?' }), answer: i18n.t("J6") },
        { question: i18n.t("J7", { defaultValue: 'Can this auditing Tool be used across all healthcare disciplines?' }), answer: i18n.t("J8") },
        { question: i18n.t("J9", { defaultValue: 'Who can use this Hygiene Auditing Tool App?' }), answer: i18n.t("J10") },
        { question: i18n.t("J14", { defaultValue: 'How often can the audit take place?' }), answer: i18n.t("J15") },
        { question: i18n.t("J16", { defaultValue: `Why is the Tool based on WHO “My five moments of Hand Hygiene”?` }), answer: i18n.t("J17") },
        { question: i18n.t("J18", { defaultValue: `How do we apply the concept of WHO “My five moments of Hand Hygiene” where there are multiple occupants?` }), answer: i18n.t("J19") },
    ];

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
                        onChangeText={handleSearch}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleCancelPress}
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancelText}>
                        {i18n.t("I3", { defaultValue: "Cancel" })}
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={searchInput ? filteredFaqs : faqs}
                renderItem={({ item }) => (
                    <>
                        <List.Accordion
                            titleStyle={{ color: colors.midNight }}
                            title={item?.question}
                            id={item?.question}
                            style={styles.accordion}
                        >
                            <View style={styles.answerContainer}>
                                <Text style={styles.answer}>
                                    {item?.answer}
                                </Text>
                            </View>
                        </List.Accordion>
                        <Divider />
                    </>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}


const styles = createStyleSheet({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    accordion: {
        backgroundColor: 'white',
        height: 63
    },
    answerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    answer: {
        color: colors.steelGrey
    }

})

export default FAQ