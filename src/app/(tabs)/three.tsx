import DropdownListButton from "@components/DropdownList/index";
import React, { useState } from "react";
import { Alert, View, Image, TouchableOpacity } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const LoginScreen = () => {
  const { styles } = useStyles(stylesheet);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.loginTitleContainer}>
        <Image
          source={require("@assets/images/hat-images/logo.png")}
          style={{ width: 200, height: 100 }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Email Address"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          left={<TextInput.Icon icon="bottle-wine" />}
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <Button mode="contained" onPress={() => Alert.alert("Login")}>
          LOGIN
        </Button>
      </View>
      <View style={styles.languageContainer}>
        <Text variant="titleMedium" style={styles.languageText}>
          Language
        </Text>
        <DropdownListButton
          options={[
            "English",
            "Bahasa Indonesia",
            "Czech",
            "Deutsch",
            "French",
            "Portugese",
            "Portugese BR",
            "Spanish",
            "Thai",
          ]}
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity activeOpacity={0.6}>
          <Text variant="titleMedium">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Image
          source={require("@assets/images/hat-images/powered.png")}
          style={{ width: 100, height: 40 }}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#01b482",
  },
  loginTitleContainer: {
    marginBottom: 60,
  },
  textInputContainer: {
    width: "90%",
  },
  loginButtonContainer: {
    justifyContent: "center",
    marginVertical: 20,
    width: "90%",
  },
  languageContainer: {
    flexDirection: "row",
    gap: 70 * 2,
    alignItems: "center",
  },
  languageText: {
    color: "white",
  },
  forgotPasswordContainer: {
    marginVertical: 20,
  },
});

export default LoginScreen;
