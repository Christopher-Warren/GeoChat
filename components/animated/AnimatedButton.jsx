import { Animated, Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { appFonts, colors, fonts, fontSize } from "../../styles/styles";

export const AnimatedButton = ({
  icon,
  text,
  onPress,
  containerStyle,
  style,
  size = 25,
  iconColor = "white",
  disabled = false,
}) => {
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
    <Pressable
      onPress={onPress}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      style={containerStyle}
      disabled={disabled}
    >
      <Animated.View
        style={[
          {
            flexDirection: "column",
            alignItems: "center",
            opacity: animated,
          },
          { ...style },
        ]}
      >
        <Ionicons name={icon} size={size} color={iconColor} />

        {text && (
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
        )}
      </Animated.View>
    </Pressable>
  );
};
