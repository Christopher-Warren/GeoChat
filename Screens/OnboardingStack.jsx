import * as React from "react";

import { Platform } from "react-native";

import { getApp } from "firebase/app";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupScreen } from "./Onboarding/SignupScreen";
import { VerificationScreen } from "./Onboarding/VerificationScreen";

import { NavTheme } from "../styles/theme";
import { CountrySelection } from "./Onboarding/CountrySelection";

const Stack = createNativeStackNavigator();

function OnboardingStack({ navigation }) {
  // Firebase references

  const app = getApp();

  // Double-check that we can run the example
  if (!app?.options || Platform.OS === "web") {
    throw new Error(
      "This example only works on Android or iOS, and requires a valid Firebase config."
    );
  }

  // Additional steps needed when app if used on ios
  // https://docs.expo.dev/versions/latest/sdk/firebase-recaptcha/#usage

  return (
    <NavigationContainer theme={NavTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen
          name="VerificationScreen"
          // options={{ animation: "slide_from_right" }}

          component={VerificationScreen}
        />
        <Stack.Screen
          name="CountrySelection"
          component={CountrySelection}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default OnboardingStack;
