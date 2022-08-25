import { ActivityIndicator, View } from "react-native";

export const Loader = () => {
  return (
    <View style={{ height: "100%" }}>
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", alignContent: "center", flex: 1 }}
      />
    </View>
  );
};
