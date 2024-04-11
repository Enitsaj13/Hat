import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  MD3Theme,
} from "react-native-paper";
import { NavigationTheme } from "react-native-paper/lib/typescript/types";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const colors = {
  bgColor: "#01b482",
  textColor: "white",
};

const rnPaperLightTheme = { ...MD3LightTheme };
rnPaperLightTheme.colors.onSurface = colors.textColor;
rnPaperLightTheme.colors.onPrimary = "black";
rnPaperLightTheme.colors.onSurfaceVariant = '#475569';
rnPaperLightTheme.colors.surfaceVariant = colors.bgColor;

const navigationLightTheme = { ...LightTheme };
navigationLightTheme.colors.background = colors.bgColor; // bg of the content child
navigationLightTheme.colors.card = colors.bgColor; // header and tab colors
navigationLightTheme.colors.primary = colors.textColor; // active tab color
navigationLightTheme.colors.text = colors.textColor; // header text

export const CombinedDefaultTheme: MD3Theme & NavigationTheme = merge(
  rnPaperLightTheme,
  navigationLightTheme,
);

export const CombinedDarkTheme: MD3Theme & NavigationTheme = merge(
  MD3DarkTheme,
  DarkTheme,
);

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;

type AppBreakpoints = typeof breakpoints;

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints { }
}
