import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/styles";

export const OnboardingHeader = ({ route, style }) => {
  const onSignupScreen = route.name === "SignupScreen";
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Ionicons
        name={onSignupScreen ? "call" : "call-outline"}
        size={32}
        color={onSignupScreen ? colors.primaryText : colors.inactiveTab}
      />

      <Ionicons
        name="ellipse"
        size={7}
        color={colors.inactiveTab}
        style={{ marginHorizontal: 15 }}
      />
      <Ionicons
        name={!onSignupScreen ? "shield-checkmark" : "shield-checkmark-outline"}
        size={32}
        color={!onSignupScreen ? colors.primaryText : colors.inactiveTab}
      />
    </View>
  );
};
