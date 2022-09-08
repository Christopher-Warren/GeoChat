import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAuth } from "firebase/auth/react-native";
import { useContext, useState } from "react";
import { View, Button, StyleSheet, StatusBar, Text } from "react-native";
import LocalUsers from "../components/LocalUsers";
import { UserContext } from "../contexts/UserProvider";

import { useLocation } from "../hooks/useLocation";
import { colors } from "../styles/styles";
import VerifyPhoneScreen from "./VerifyPhoneScreen";

const HomeScreen = ({ route }) => {
  const user = useContext(UserContext);

  if (!user) return <VerifyPhoneScreen />;

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colors.bodyBackground}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />

      <View>
        <Text style={{ color: colors.primaryText, fontSize: 14 }}>
          Hello there,
        </Text>
        <Text style={{ color: colors.primaryText }}>{user.alias}</Text>
        {/* <Button
          color={colors.primaryBackground}
          title="Clear storage"
          onPress={async () => {
            AsyncStorage.clear();
          }}
        /> */}
      </View>

      <LocalUsers />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bodyBackground,
    height: "100%",
    marginTop: 0,
  },
});

export default HomeScreen;
