import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import { List, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Link } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useSession } from "src/auth";
import {
  Entypo as Icon,
  MaterialIcons as MaterialIcon,
  FontAwesome as FontAwesomeIcon,
} from "@expo/vector-icons";
import { i18n } from "@i18n/index";
import { colors } from "@theme/index";
import { User } from "@stores/user";
import { AppSetting } from "@stores/appSetting";
import { ObservableifyProps } from "@nozbe/watermelondb/react/withObservables";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "@stores/index";
import { Q } from "@nozbe/watermelondb";
import { of, switchMap } from "rxjs";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { dropdownStylesheet } from "@components/DropdownList";
import { languages } from "@i18n/languages";

interface SettingsProps {
  user: User;
  appSetting: AppSetting;
}

const Component = ({ user, appSetting }: SettingsProps) => {
  const theme = useTheme();
  const { styles } = useStyles(stylesheet);
  const { styles: dropdownStyles } = useStyles(dropdownStylesheet);
  const { signOut } = useSession();

  const [mode, setMode] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (value: boolean) => {
    setMode(value);
    setIsEnabled((previousState) => !previousState);
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        opacity={-1}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  const openUrl = async (url: string) => {
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
          <Text
            style={styles.accountName}
          >{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.accountSubName}>{user.email}</Text>
        </View>
      </View>
      <List.Section>
        <Link href="/Profile" asChild>
          <TouchableOpacity onPress={() => { }} style={styles.listItemContainer}>
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
        </Link>
        <Link href="/ChangePassword" asChild>
          <TouchableOpacity onPress={() => { }} style={styles.listItemContainer}>
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
        </Link>
        <TouchableOpacity
          onPress={() => bottomSheetModalRef.current?.present()}
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
          <BottomSheetModal
            enableContentPanningGesture={false} // used to scroll bottom sheet on android
            backdropComponent={renderBackdrop}
            snapPoints={["25%"]}
            ref={bottomSheetModalRef}
            handleIndicatorStyle={dropdownStyles.handleIndicatorColor}
            style={dropdownStyles.containerBottomSheetModal}
          >
            <FlatList
              data={languages}
              renderItem={({ item }) => (
                <TouchableRipple
                  onPress={() => {
                    appSetting.saveLanguage(item.key);
                    bottomSheetModalRef.current?.dismiss();
                  }}
                >
                  <List.Item
                    contentStyle={dropdownStyles.languageBottomSheetContainer}
                    title={item.value}
                    titleStyle={[
                      dropdownStyles.key,
                      { color: theme.colors.onPrimary },
                    ]}
                    left={() =>
                      appSetting.language === item.key ? (
                        <List.Icon
                          icon="check"
                          color="green"
                          style={dropdownStyles.leftIcon}
                        />
                      ) : null
                    }
                  />
                </TouchableRipple>
              )}
            />
          </BottomSheetModal>
        </TouchableOpacity>
        <Link href="/SubscribeNow" asChild>
          <TouchableOpacity onPress={() => { }} style={styles.listItemContainer}>
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

        <TouchableOpacity
          onPress={() => openUrl("https://www.bbraun.com/en/imprint.html")}
          style={styles.listItemContainer}
        >
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
                <MaterialIcon
                  name="info"
                  size={18}
                  color={colors.vividCerulean}
                />
              </View>
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openUrl(appSetting.dataPrivacyUrl)}
          style={styles.listItemContainer}
        >
          <List.Item
            title={i18n.t("TERMS8", { defaultValue: "Data Privacy Policies" })}
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
                <MaterialIcon
                  name="privacy-tip"
                  size={18}
                  color={colors.steelGrey}
                />
              </View>
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openUrl(appSetting.termsOfUseUrl)}
          style={styles.listItemContainer}
        >
          <List.Item
            title={i18n.t("TERMS6", { defaultValue: "Terms of Use" })}
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
                  { backgroundColor: colors.lavenderMist },
                ]}
              >
                <MaterialIcon
                  name="policy"
                  size={18}
                  color={colors.mediumPurple}
                />
              </View>
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.listItemContainer}>
          <List.Item
            title={i18n.t("H6", { defaultValue: "Practice Mode" })}
            titleStyle={styles.settingsText}
            right={() => (
              <View style={styles.switchContainer}>
                <Text style={styles.switchTitle}>
                  {`${mode === true ? i18n.t("SHOW") : i18n.t("HIDE")}`}
                </Text>
                <Switch
                  trackColor={{ true: colors.bgColor }}
                  thumbColor={isEnabled ? colors.lilyWhite : colors.textColor}
                  ios_backgroundColor={colors.steelGrey}
                  value={mode}
                  onValueChange={toggleSwitch}
                />
              </View>
            )}
            left={() => (
              <View
                style={{
                  ...styles.iconContainer,
                  backgroundColor: colors.lilyWhite,
                }}
              >
                <FontAwesomeIcon
                  name="bullseye"
                  size={18}
                  color={colors.bgColor}
                />
              </View>
            )}
          />
        </TouchableOpacity>

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
                <MaterialIcon
                  name="logout"
                  size={18}
                  color={colors.terracotta}
                />
              </View>
            )}
          />
        </TouchableOpacity>
      </List.Section>
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>
          {i18n.t("COPYRIGHT")} © B. Braun Melsungen AG
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
    height: 46,
  },
  accountSubName: {
    fontSize: 14,
    textAlign: "left",
    top: 5,
    color: colors.midNight,
  },
  iconContainer: {
    borderRadius: 20,
    height: 35,
    width: 35,
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
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  copyrightText: {
    fontWeight: "500",
    color: colors.textColor,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switchTitle: {
    color: "black",
    marginHorizontal: 10,
    fontSize: 16,
  },
});

type WithObservableProps = ObservableifyProps<
  SettingsProps,
  "user",
  "appSetting"
>;
const Settings = withObservables(
  ["user", "appSetting"],
  (props: WithObservableProps) => ({
    user: database
      .get<User>("users")
      .query(Q.take(1))
      .observe()
      .pipe(
        switchMap((user) => (user.length > 0 ? user[0].observe() : of(null))),
      ),
    appSetting: database
      .get<AppSetting>("app_settings")
      .query(Q.take(1))
      .observe()
      .pipe(
        switchMap((appSettings) =>
          appSettings.length > 0 ? appSettings[0].observe() : of(null),
        ),
      ),
  }),
)(Component as any); // as any here is workaround on typescript complaining between Observable<AppSetting> and AppSetting

export default Settings;
