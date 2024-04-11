import { colors } from "@theme/index";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { i18n } from "@i18n/index";


const SubscribeNowScreen = () => {
    const { styles } = useStyles(stylesheet);

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [hospital, setHospital] = useState("");
    const [numberBed, setNumberBed] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TextInput
                    label={i18n.t('B3', { defaultValue: 'Name' })}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
                <TextInput
                    label={i18n.t('B4', { defaultValue: 'Contact Number' })}
                    value={contact}
                    keyboardType="phone-pad"
                    onChangeText={(text) => setContact(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
                <TextInput
                    label={i18n.t('D1', { defaultValue: 'Email Address' })}
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
                <TextInput
                    label={i18n.t('B5', { defaultValue: 'Designation' })}
                    value={designation}
                    onChangeText={(text) => setDesignation(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
                <TextInput
                    label={i18n.t('B6', { defaultValue: 'Department' })}
                    value={department}
                    onChangeText={(text) => setDepartment(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
                <TextInput
                    label={i18n.t('B7', { defaultValue: 'Hospital' })}
                    value={hospital}
                    onChangeText={(text) => setHospital(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
                <TextInput
                    label={i18n.t('B8', { defaultValue: 'No. of Beds' })}
                    value={numberBed}
                    keyboardType="phone-pad"
                    onChangeText={(text) => setNumberBed(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
                <TextInput
                    label={i18n.t('B9', { defaultValue: 'Address' })}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
                <TextInput
                    label={i18n.t('B10', { defaultValue: 'Country' })}
                    value={country}
                    onChangeText={(text) => setCountry(text)}
                    theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                    underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
                    textColor="#020617"
                    contentStyle={styles.textInput}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="outlined" style={styles.subscribeButton} onPress={() => console.log("Successful!")}>
                    SEND MESSAGE
                </Button>
            </View>
        </View>
    );
};

const stylesheet = createStyleSheet({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white',
    },
    textInputContainer: {
        marginTop: '5%',
        width: "95%",
    },
    textInput: {
        backgroundColor: 'white',
        borderWidth: 0.2,
        borderColor: '#94a3b8',
    },
    buttonContainer: {
        width: '95%'
    },
    subscribeButton: {
        backgroundColor: colors.bgColor,
        marginTop: 20,
        borderWidth: 0,
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 4
    }
});

export default SubscribeNowScreen;