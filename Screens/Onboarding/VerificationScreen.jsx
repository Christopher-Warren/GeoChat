import { getAuth, signInWithCredential } from "firebase/auth/react-native";
import { useState } from "react";
import { Button, View, TextInput } from "react-native";

import { HeaderText } from "../../components/text/TextStyles";
import { colors } from "../../styles/styles";

export const VerificationScreen = ({
  route: {
    params: { verificationId, PhoneAuthProvider },
  },
}) => {
  //   console.log("navigated", verificationId);

  //   return <HeaderText>ughhhh</HeaderText>;
  const auth = getAuth();
  const [phoneNumber, setPhoneNumber] = useState("+1 650-555-1234");

  const [verificationCode, setVerificationCode] = useState("123456");

  const [message, showMessage] = useState();
  const attemptInvisibleVerification = false;
  return (
    <View>
      <HeaderText style={{ marginTop: 20, color: colors.primaryText }}>
        Enter Verification code
      </HeaderText>
      <TextInput
        style={{
          marginVertical: 10,
          fontSize: 17,
          color: colors.primaryText,
        }}
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

            console.log("Phone authentication successful 👍");
          } catch (err) {
            // Warning: Can't perform a React state update on an unmounted component.
            // This is a no-op, but it indicates a memory leak in your application.
            // To fix, cancel all subscriptions and asynchronous tasks in %s.%s, a useEffect cleanup function,
            console.log("VerificationScreen: ", err.message);
          }
        }}
      />
      <HeaderText style={{ color: colors.primaryText }}>
        Phone Verification
      </HeaderText>
    </View>
  );
};
