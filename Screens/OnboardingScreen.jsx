import * as React from "react";
import { useState } from "react";

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { getApp } from "firebase/app";

import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth/react-native";
import { colors } from "../styles/styles";
import { HeaderText } from "../components/text/TextStyles";
import DropDownPicker from "react-native-dropdown-picker";
import { CountryCodes } from "../assets/misc/CountryCodes";
import { DropDown } from "../components/inputs/DropDown";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupScreen } from "./Onboarding/SignupScreen";
import { VerificationScreen } from "./Onboarding/VerificationScreen";

function VerifyPhoneScreen({ navigation }) {
  // Ref or state management hooks
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("+1 650-555-1234");
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState("123456");

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;

  // Firebase references

  const app = getApp();
  const auth = getAuth();

  // Double-check that we can run the example
  if (!app?.options || Platform.OS === "web") {
    throw new Error(
      "This example only works on Android or iOS, and requires a valid Firebase config."
    );
  }

  const Stack = createNativeStackNavigator();

  // Additional steps needed when app if used on ios
  // https://docs.expo.dev/versions/latest/sdk/firebase-recaptcha/#usage

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationTypeForReplace: "push" }}
      >
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen
          name="VerificationScreen"
          // options={{ animation: "slide_from_right" }}
          component={VerificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return (
    <View style={{ padding: 20 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification
      />
      <HeaderText
        style={{ marginTop: 20, color: colors.primaryText, fontSize: 42 }}
      >
        What's your phone number?
      </HeaderText>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="country"
          onPress={() => navigation.navigate("SelectCountry")}
        ></Button>
        <TextInput
          style={{
            marginVertical: 10,
            fontSize: 17,
            color: colors.primaryText,
          }}
          placeholder="+1 999 999 9999"
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          value={phoneNumber}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
      </View>
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: "Verification code has been sent to your phone.",
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />

      <HeaderText style={{ marginTop: 20, color: colors.primaryText }}>
        Enter Verification code
      </HeaderText>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17, color: colors.primaryText }}
        editable={!!verificationId}
        placeholder="123456"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            const signedIn = await signInWithCredential(auth, credential);

            const userPhoneNumber = signedIn.user.phoneNumber;
            const firebaseUid = signedIn.user.uid;

            // showMessage({ text: "Phone authentication successful 👍" });
          } catch (err) {
            // Warning: Can't perform a React state update on an unmounted component.
            // This is a no-op, but it indicates a memory leak in your application.
            // To fix, cancel all subscriptions and asynchronous tasks in %s.%s, a useEffect cleanup function,
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      <HeaderText style={{ color: colors.primaryText }}>
        Phone Verification
      </HeaderText>

      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: "center" },
          ]}
          onPress={() => showMessage(undefined)}
        >
          <HeaderText
            style={{
              color: message.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </HeaderText>
        </TouchableOpacity>
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
}

export default VerifyPhoneScreen;
