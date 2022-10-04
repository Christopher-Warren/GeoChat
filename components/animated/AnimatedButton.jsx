import { Animated, Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { appFonts, colors, fonts, fontSize } from "../../styles/styles";

export const AnimatedButton = ({ icon, text, onPress }) => {
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Pressable onPress={onPress} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
        style={{
          flexDirection: "column",
          alignItems: "center",
          opacity: animated,
        }}
      >
        <Ionicons name={icon} size={25} color="white" />
        <Text
          style={{
            textAlign: "center",
            color: colors.primaryText,
            fontSize: fontSize.medium,
            fontFamily: appFonts.signika,
          }}
        >
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
};
