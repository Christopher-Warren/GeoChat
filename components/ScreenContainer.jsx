import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { layout } from "../styles/styles";

export const ScreenContainer = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: layout.paddingHorizontal,
          paddingTop: 15,
          overflow: "visible",
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
