import React from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { List, Text } from "react-native-paper";
import { Link } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useSession } from "src/auth";
import {
  Entypo as Icon,
  MaterialIcons as LogoutIcon,
} from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";

const Settings = () => {
  const { styles } = useStyles(stylesheet);
  const { signOut } = useSession();

  const onPressImprint = async () => {
    const url = "https://www.bbraun.com/en/imprint.html";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Unable to open URL using Linking");
    }
  };

  return (
    <View style={styles.container}>
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
          style={styles.listItemContainer}
        >
          <List.Item
            title={i18n.t("Q2", { defaultValue: "Account Information" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={18} color={colors.midNight} />
              </View>
            )}
            left={() => (
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.lilyWhite },
                ]}
              >
                <Icon name="user" size={18} color={colors.bgColor} />
              </View>
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Clicked!");
          }}
          style={styles.listItemContainer}
        >
          <List.Item
            title={i18n.t("Q7", { defaultValue: "Change Password" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={18} color={colors.midNight} />
              </View>
            )}
            left={() => (
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.chantilly },
                ]}
              >
                <Icon name="lock" size={18} color={colors.blushPink} />
              </View>
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Clicked!");
          }}
          style={styles.listItemContainer}
        >
          <List.Item
            title={i18n.t("D0", { defaultValue: "Language" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={18} color={colors.midNight} />
              </View>
            )}
            left={() => (
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.lemonChiffon },
                ]}
              >
                <Icon name="globe" size={18} color={colors.sunshade} />
              </View>
            )}
          />
        </TouchableOpacity>
        <Link href="/SubscribeNow" asChild>
          <TouchableOpacity
            onPress={() => {
              console.log("Clicked!");
            }}
            style={styles.listItemContainer}
          >
            <List.Item
              title={i18n.t("D4", { defaultValue: "Subscribe Now" })}
              titleStyle={styles.settingsText}
              right={() => (
                <View style={styles.centerContainer}>
                  <Icon
                    name="chevron-right"
                    size={18}
                    color={colors.midNight}
                  />
                </View>
              )}
              left={() => (
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: colors.lavenderMist },
                  ]}
                >
                  <Icon name="rocket" size={18} color={colors.mediumPurple} />
                </View>
              )}
            />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={onPressImprint} style={styles.listItemContainer}>
          <List.Item
            title="Imprint"
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={18} color={colors.midNight} />
              </View>
            )}
            left={() => (
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.paleBlue },
                ]}
              >
                <LogoutIcon
                  name="info"
                  size={18}
                  color={colors.vividCerulean}
                />
              </View>
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Clicked!");
          }}
          style={styles.listItemContainer}
        >
          <List.Item
            title="Data Privacy Policies"
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={18} color={colors.midNight} />
              </View>
            )}
            left={() => (
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.whiteSmoke },
                ]}
              >
                <LogoutIcon
                  name="privacy-tip"
                  size={18}
                  color={colors.steelGrey}
                />
              </View>
            )}
          />
        </TouchableOpacity>
        <Link href="/TermsOfUse" asChild>
          <TouchableOpacity
            onPress={() => {
              console.log("Clicked!");
            }}
            style={styles.listItemContainer}
          >
            <List.Item
              title={i18n.t("TERMS6", { defaultValue: "Terms of Use" })}
              titleStyle={styles.settingsText}
              right={() => (
                <View style={styles.centerContainer}>
                  <Icon
                    name="chevron-right"
                    size={18}
                    color={colors.midNight}
                  />
                </View>
              )}
              left={() => (
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: colors.lilyWhite },
                  ]}
                >
                  <LogoutIcon name="policy" size={18} color={colors.bgColor} />
                </View>
              )}
            />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={signOut} style={styles.listItemContainer}>
          <List.Item
            title={i18n.t("AI10", { defaultValue: "Logout" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.centerContainer}>
                <Icon name="chevron-right" size={18} color={colors.midNight} />
              </View>
            )}
            left={() => (
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.chantilly },
                ]}
              >
                <LogoutIcon name="logout" size={18} color={colors.terracotta} />
              </View>
            )}
          />
        </TouchableOpacity>
      </List.Section>
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>
          Copyright © B. Braun Melsungen AG
        </Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  accountContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  accountImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  accountTextContainer: {
    marginHorizontal: 20,
  },
  accountName: {
    fontSize: 18,
    color: colors.midNight,
  },
  listItemContainer: {
    height: 50
  },
  accountSubName: {
    fontSize: 14,
    textAlign: "left",
    top: 5,
    color: colors.midNight,
  },
  iconContainer: {
    borderRadius: 20,
    height: 38,
    width: 38,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  settingsText: {
    fontSize: 16,
    color: colors.midNight,
  },
  copyrightContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mediumPurple,
    padding: 12,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  copyrightText: {
    fontWeight: "500",
    color: colors.textColor,
    fontSize: 16,
  },
});

export default Settings;
