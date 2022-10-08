import { colors } from "../../../styles/styles";
import { AnimatedButton } from "../../animated/AnimatedButton";

export const OnbordingBack = ({ onPress, disabled }) => {
  return (
    <AnimatedButton
      icon="arrow-back"
      onPress={onPress}
      size={32}
      disabled={disabled}
      iconColor={colors.primaryBackground}
      containerStyle={{ position: "absolute", left: 15, bottom: 15 }}
      style={{
        padding: 15,
        backgroundColor: colors.primaryAccent,
        borderRadius: 100,
      }}
    />
  );
};
