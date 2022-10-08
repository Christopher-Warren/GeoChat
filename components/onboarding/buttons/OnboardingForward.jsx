import { colors } from "../../../styles/styles";
import { AnimatedButton } from "../../animated/AnimatedButton";

export const OnboardingForward = ({ onPress, disabled }) => {
  return (
    <AnimatedButton
      icon="arrow-forward"
      onPress={onPress}
      size={32}
      disabled={disabled}
      iconColor={colors.primaryBackground}
      containerStyle={{ position: "absolute", right: 15, bottom: 15 }}
      style={{
        padding: 15,
        backgroundColor: disabled ? colors.green : colors.primaryAccent,
        borderRadius: 100,
      }}
    />
  );
};
