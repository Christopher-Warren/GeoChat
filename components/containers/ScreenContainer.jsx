import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenContainer = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};
export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
