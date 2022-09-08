import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAuth } from "firebase/auth/react-native";
import { useContext, useState } from "react";
import { View, Button, StyleSheet, StatusBar, Text, Image } from "react-native";
import LocalUsers from "../components/LocalUsers";
import { UserContext } from "../contexts/UserProvider";

import { useLocation } from "../hooks/useLocation";
import { colors, fontSize } from "../styles/styles";
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

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: colors.primaryText, fontSize: fontSize.small }}>
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

        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            width: 35,
            height: 35,
            marginRight: 15,
            borderRadius: 50,
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: `https://avatars.dicebear.com/api/bottts/:${user._id}.png?primaryColorLevel=700`,
            }}
          />
        </View>
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
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  image: {
    height: 30,
    width: 30,
  },
});

export default HomeScreen;
