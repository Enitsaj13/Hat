import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
  MaterialBottomTabNavigationEventMap,
} from "react-native-paper/react-navigation";

import { TabNavigationState, ParamListBase } from "@react-navigation/native";

import { withLayoutContext } from "expo-router";
import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

const BottomTabNavigator = createMaterialBottomTabNavigator().Navigator;

export const MaterialBottomTabs = withLayoutContext<
  MaterialBottomTabNavigationOptions | BottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap | BottomTabNavigationEventMap
>(BottomTabNavigator);
