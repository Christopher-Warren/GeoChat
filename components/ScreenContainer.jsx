import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { layout } from "../styles/styles";

export const ScreenContainer = ({
  children,
  style,
  paddingTopEnabled = false,
  flexEnabled = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingHorizontal: layout.paddingHorizontal,
          paddingTop: paddingTopEnabled ? insets.top : 0,
          overflow: "visible",
          flex: flexEnabled ? 1 : 0,
        },
        { ...style },
      ]}
    >
      {children}
    </View>
  );
};
