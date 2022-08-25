import firebaseInit from "./firebaseInit";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VerifyPhoneScreen from "./Screens/VerifyPhoneScreen";
import AliasScreen from "./Screens/newaccount/AliasScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth/react-native";
import { View, Text, ActivityIndicator } from "react-native";
import { createContext, useContext, useState } from "react";

import HomeScreen from "./Screens/HomeScreen";
import axios from "axios";
import { UserProvider } from "./contexts/UserProvider";

const Stack = createNativeStackNavigator();

// Initialize Axios
if (__DEV__) axios.defaults.baseURL = "http://192.168.1.61:8000";
if (!__DEV__) axios.defaults.baseURL = "http://192.168.1.61:8000";

// Initialize Firebase
firebaseInit();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
