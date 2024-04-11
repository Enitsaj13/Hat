import { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AntDesign as Icon } from "@expo/vector-icons";
import { i18n } from "@i18n/index";

function PracticeMode() {
    const { styles } = useStyles(stylesheet);

    const [numberOpportunities, setNumberOpportunities] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.practiceModeContainer}>
                    <Icon name='infocirlce' color='#0369a1' size={25} />
                    <Text variant='bodyLarge' style={styles.practiceNoteText}>NOTE: You are on practice mode.</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        keyboardType="numeric"
                        label="Number of Opportunities for this Audit:"
                        value={numberOpportunities}
                        onChangeText={(text) => setNumberOpportunities(text)}
                        contentStyle={styles.textInput}
                        theme={{ colors: { placeholder: '#475569', primary: '#475569' } }}
                        underlineColor="#f5f5f5" underlineColorAndroid="black"
                        textColor="#020617"
                    />
                    <Button
                        mode="outlined"
                        style={styles.practiceModeButton}
                        onPress={() => { console.log('Clicked!') }}
                    >
                        {i18n.t('Y3', { defaultValue: 'Begin Audit' })}
                        <Icon name="arrowright" size={14} color="white" />
                    </Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const stylesheet = createStyleSheet({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textInputContainer: {
        width: "95%",
        marginTop: 20,
    },
    textInput: {
        height: 80,
        backgroundColor: 'white',
        borderWidth: 0.2,
        borderRadius: 2,
        borderColor: '#94a3b8',
    },
    practiceModeContainer: {
        flexDirection: 'row',
        backgroundColor: '#e0f2fe',
        paddingVertical: 15,
        width: '100%',
        paddingHorizontal: 20
    }, practiceNoteText: {
        color: '#0369a1',
        marginLeft: 10
    },
    practiceModeButton: {
        backgroundColor: '#01b482',
        marginTop: 20,
        borderWidth: 0,
        borderRadius: 4,
        padding: 4
    }
});

export default PracticeMode;