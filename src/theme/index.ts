import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";
import { NavigationTheme } from "react-native-paper/lib/typescript/types";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const colors = {
  bgColor: "#01b482",
  borderColor: "#027556",
  textColor: "white",
  lightGray: "#e2e8f0",
  cadetGrey: "#94a3b8",
  midNight: "#020617",
  steelGrey: "#475569",
  lilyWhite: "#ecfdf5",
  chantilly: "#fff1f2",
  blushPink: "#ed6faa",
  lemonChiffon: "#fffbeb",
  sunshade: "#feb65d",
  lavenderMist: "#f5f3ff",
  mediumPurple: "#711e82",
  paleBlue: "#cae3f1",
  vividCerulean: "#0ea5e9",
  terracotta: "#f43f5e",
  cerulean: "#0369a1",
  babyBlue: "#e0f2fe",
  whiteSmoke: "#f5f5f5",
  charcoal: "#334155",
  red: "#F00",
};

const rnPaperLightTheme = { ...MD3LightTheme };
rnPaperLightTheme.colors.onSurface = colors.textColor;
rnPaperLightTheme.colors.onPrimary = "black";
rnPaperLightTheme.colors.onSurfaceVariant = "#475569";
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
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
