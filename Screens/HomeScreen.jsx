import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAuth } from "firebase/auth/react-native";
import { useContext, useState } from "react";
import { View, Button, StyleSheet, StatusBar } from "react-native";
import LocalUsers from "../components/LocalUsers";
import { UserContext } from "../contexts/UserProvider";

import { useLocation } from "../hooks/useLocation";
import VerifyPhoneScreen from "./VerifyPhoneScreen";

const HomeScreen = ({ route }) => {
  const user = useContext(UserContext);

  if (!user) return <VerifyPhoneScreen />;

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#120041"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <Button
        color="#281B54"
        title="Clear storage"
        onPress={async () => {
          AsyncStorage.clear();
        }}
      />
      <Button title="change state" onPress={(e) => setCount(count + 1)} />

      <LocalUsers />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#120041",
    height: "100%",
    marginTop: 0,
  },
});

export default HomeScreen;
