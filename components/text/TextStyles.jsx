import { Text } from "react-native";
import { colors } from "../../styles/styles";

export const HeaderText = ({ children, style }) => {
  return (
    <Text
      style={[
        { color: colors.primaryText, fontFamily: "roboto_slab", fontSize: 16 },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export const BodyText = ({ children, style }) => {
  return (
    <Text
      style={[
        style,
        { color: colors.primaryText, fontFamily: "signika", fontSize: 16 },
      ]}
    >
      {children}
    </Text>
  );
};
