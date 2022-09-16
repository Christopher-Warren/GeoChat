import { useContext } from "react";
import { View, StatusBar, Text, Image, StyleSheet } from "react-native";
import LocalUsers from "../components/LocalUsers";
import { UserContext } from "../contexts/UserProvider";

import { colors, fontSize } from "../styles/styles";
{
  /* <Button
            color={colors.primaryBackground}
            title="Clear storage"
            onPress={async () => {
              AsyncStorage.clear();
            }}
          /> */
}
const LocalUsersTab = () => {
  const user = useContext(UserContext);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.themeBackground} />

      <LocalUsers />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 0,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  image: {
    height: 30,
    width: 30,
  },
});

export default LocalUsersTab;
