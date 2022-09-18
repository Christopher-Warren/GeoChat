import { StyleSheet, View } from "react-native";

const ScreenContainer = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});
