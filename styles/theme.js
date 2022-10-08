import { DefaultTheme } from "@react-navigation/native";
import { colors } from "./styles";

export const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.themeBackground,
    border: colors.border,
    primary: colors.primaryAccent,
    text: colors.primaryText,
    card: colors.themeBackground,
  },
};
