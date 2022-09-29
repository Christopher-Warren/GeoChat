import { ActivityIndicator, View, Text } from "react-native";

import { colors } from "../../styles/styles";

export const Loader = () => {
  return (
    <View style={{ height: "100%" }}>
      <ActivityIndicator
        size="large"
        color={colors.primaryAccent}
        style={{
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
          backgroundColor: colors.themeBackground,
        }}
      />
      <Text style={{ color: "white", textAlign: "center" }}>LOGO</Text>
    </View>
  );
};
