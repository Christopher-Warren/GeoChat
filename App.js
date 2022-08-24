import firebaseInit from "./firebaseInit";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VerifyPhoneScreen from "./Screens/VerifyPhoneScreen";
import AliasScreen from "./Screens/newaccount/AliasScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth/react-native";
import { View, Text, ActivityIndicator } from "react-native";
import { useState } from "react";

import HomeScreen from "./Screens/HomeScreen";
import axios from "axios";

const Stack = createNativeStackNavigator();

// Initialize Firebase
firebaseInit();

const LoadingScreen = ({ route }) => {
  return (
    <View style={{ height: "100%" }}>
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", alignContent: "center", flex: 1 }}
      />
    </View>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  onAuthStateChanged(auth, async (currentUser) => {
    // console.log(user);
    if (currentUser && !user) {
      try {
        const { data } = await axios.post(
          "http://192.168.1.61:8000/api/verifyUid",
          {
            firebaseUid: currentUser.uid,
            phoneNumber: currentUser.phoneNumber,
          }
        );
        console.log("onAuthStateChanged");
        setUser(data);
      } catch (error) {
        console.log("ERR", error);
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  });

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="VerifyPhone"
            options={{ headerShown: false }}
            component={VerifyPhoneScreen}
          />
        ) : (
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
