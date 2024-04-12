import {
  Entypo as Icon,
  MaterialIcons as LogoutIcon,
} from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import { Link } from "expo-router";
import React from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { List, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useSession } from "../../../../auth";

const Settings = () => {
  const { styles } = useStyles(stylesheet);
  const { signOut } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accountContainer}>
        <Image
          style={styles.accountImg}
          source={require("@assets/images/hat-images/profile.png")}
          resizeMode="contain"
        />
        <View style={styles.accountTextContainer}>
          <Text style={styles.accountName}>Jastine Formentera</Text>
          <Text style={styles.accountSubName}>rocketspin@gmail.com</Text>
        </View>
      </View>
      <List.Section>
        <TouchableOpacity
          onPress={() => {
            console.log("Clicked!");
          }}
          style={styles.paddingContainer}
        >
          <List.Item
            contentStyle={styles.rowContainer}
            title={i18n.t("Q2", { defaultValue: "Account Information" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={20} color="black" />
              </View>
            )}
            left={() => (
              <View
                style={[styles.iconContainer, { backgroundColor: "#ecfdf5" }]}
              >
                <Icon name="user" size={20} color="#10b981" />
              </View>
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Clicked!");
          }}
          style={styles.paddingContainer}
        >
          <List.Item
            contentStyle={styles.rowContainer}
            title={i18n.t("Q7", { defaultValue: "Change Password" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={22} color="black" />
              </View>
            )}
            left={() => (
              <View
                style={[styles.iconContainer, { backgroundColor: "#fff1f2" }]}
              >
                <Icon name="lock" size={22} color="#ed6faa" />
              </View>
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Clicked!");
          }}
          style={styles.paddingContainer}
        >
          <List.Item
            contentStyle={styles.rowContainer}
            title={i18n.t("D0", { defaultValue: "Language" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={22} color="black" />
              </View>
            )}
            left={() => (
              <View
                style={[styles.iconContainer, { backgroundColor: "#fffbeb" }]}
              >
                <Icon name="globe" size={22} color="#FEB65D" />
              </View>
            )}
          />
        </TouchableOpacity>
        <Link href="/SubscribeNow" asChild>
          <TouchableOpacity
            onPress={() => {
              console.log("Clicked!");
            }}
            style={styles.paddingContainer}
          >
            <List.Item
              contentStyle={styles.rowContainer}
              title={i18n.t("D4", { defaultValue: "Subscribe Now" })}
              titleStyle={styles.settingsText}
              right={() => (
                <View style={styles.centerContainer}>
                  <Icon name="chevron-right" size={22} color="black" />
                </View>
              )}
              left={() => (
                <View
                  style={[styles.iconContainer, { backgroundColor: "#f5f3ff" }]}
                >
                  <Icon name="rocket" size={22} color="#8b5cf6" />
                </View>
              )}
            />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          onPress={() => {
            console.log("Clicked!");
          }}
          style={styles.paddingContainer}
        >
          <List.Item
            contentStyle={styles.rowContainer}
            title="Data Privacy"
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={22} color="black" />
              </View>
            )}
            left={() => (
              <View
                style={[styles.iconContainer, { backgroundColor: "#CAE3F1" }]}
              >
                <LogoutIcon name="privacy-tip" size={22} color="#0ea5e9" />
              </View>
            )}
          />
        </TouchableOpacity>
        <Link href="/TermsOfUse" asChild>
          <TouchableOpacity
            onPress={() => {
              console.log("Clicked!");
            }}
            style={styles.paddingContainer}
          >
            <List.Item
              contentStyle={styles.rowContainer}
              title={i18n.t("TERMS6", { defaultValue: "Terms of Use" })}
              titleStyle={styles.settingsText}
              right={() => (
                <View style={styles.centerContainer}>
                  <Icon name="chevron-right" size={22} color="black" />
                </View>
              )}
              left={() => (
                <View
                  style={[styles.iconContainer, { backgroundColor: "#ecfdf5" }]}
                >
                  <LogoutIcon name="policy" size={22} color="#10b981" />
                </View>
              )}
            />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={signOut} style={styles.paddingContainer}>
          <List.Item
            contentStyle={styles.rowContainer}
            title={i18n.t("AI10", { defaultValue: "Logout" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={22} color="black" />
              </View>
            )}
            left={() => (
              <View
                style={[styles.iconContainer, { backgroundColor: "#fff1f2" }]}
              >
                <LogoutIcon name="logout" size={22} color="#f43f5e" />
              </View>
            )}
          />
        </TouchableOpacity>
      </List.Section>
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  accountContainer: {
    flexDirection: "row",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  accountImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.bgColor,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  accountTextContainer: {
    top: 24,
    marginHorizontal: 20,
  },
  accountName: {
    fontSize: 18,
    color: "black",
  },
  accountSubName: {
    fontSize: 14,
    textAlign: "left",
    top: 5,
    color: "black",
  },
  rowContainer: {
    marginRight: 120,
    paddingVertical: 10,
  },
  arrow: {
    padding: 10,
  },
  iconContainer: {
    backgroundColor: colors.bgColor,
    borderRadius: 40,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  settingsText: {
    fontSize: 18,
    color: "black",
  },
  paddingContainer: {
    paddingHorizontal: 40,
  },
});

export default Settings;
