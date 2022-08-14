import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
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
  onAuthStateChanged,
} from "firebase/auth/react-native";
import axios from "axios";

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

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        value={phoneNumber}
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
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
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
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

            const createUser = await axios.post(
              "http://192.168.1.61:8000/api/createUser",
              { phoneNumber: userPhoneNumber, firebaseUid }
            );

            // showMessage({ text: "Phone authentication successful 👍" });
          } catch (err) {
            // Warning: Can't perform a React state update on an unmounted component.
            // This is a no-op, but it indicates a memory leak in your application.
            // To fix, cancel all subscriptions and asynchronous tasks in %s.%s, a useEffect cleanup function,
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      <Text>Phone Verification</Text>
      <Button
        title="Go to Alias"
        onPress={() => navigation.navigate("Alias")}
      />
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: "center" },
          ]}
          onPress={() => showMessage(undefined)}
        >
          <Text
            style={{
              color: message.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
}

export default VerifyPhoneScreen;
