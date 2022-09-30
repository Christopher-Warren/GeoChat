import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Button, TextInput, View, Modal } from "react-native";
import { HeaderText } from "../../components/text/TextStyles";
import { colors } from "../../styles/styles";

import { useEffect, useRef, useState } from "react";
import { getApp } from "firebase/app";
import { getAuth, PhoneAuthProvider } from "firebase/auth/react-native";

import * as Cellular from "expo-cellular";
import { CountryCodes } from "../../assets/misc/CountryCodes";
import { ScreenContainer } from "../../components/ScreenContainer";

export const SignupScreen = ({ navigation, route }) => {
  const recaptchaVerifier = useRef(null);

  const app = getApp();
  const auth = getAuth();

  const [phoneNumber, setPhoneNumber] = useState("650-555-1234");
  const [countryCode, setCountryCode] = useState(null);

  const [verificationId, setVerificationId] = useState();

  const [message, showMessage] = useState();

  /* 
  Client crashes on android when react-navigation/router navigates
  from a component that renders a webview
  • One solution is to disable, or change the default animation 
  on the component which is being navigated TO
  • Another is to set the androidLayerType="software" prop on the webview component
  

  https://github.com/react-navigation/react-navigation/issues/9061#issue-742251453
  
  */

  useEffect(() => {
    const setMobileCountryCode = async () => {
      const code = await Cellular.getIsoCountryCodeAsync();

      const foundCode = CountryCodes.find(
        (cc) => cc.code === code.toUpperCase()
      );

      console.log(foundCode.dial_code);
      setCountryCode(foundCode);
    };

    if (!route.params || !route.params.countryCode) {
      setMobileCountryCode();
    }

    if (route.params) {
      route.params.countryCode && setCountryCode(route.params.countryCode);
    }
  }, [route.params]);

  return (
    <ScreenContainer>
      <FirebaseRecaptchaVerifierModal
        appVerificationDisabledForTesting={true}
        ref={recaptchaVerifier}
        androidLayerType="software"
        firebaseConfig={app.options}
        attemptInvisibleVerification={true}
      />
      <HeaderText style={{ color: colors.primaryText, fontSize: 42 }}>
        What's your phone number?
      </HeaderText>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="country"
          onPress={() =>
            navigation.navigate("CountrySelection", { countryCode })
          }
        />

        <TextInput
          editable={false}
          style={{
            marginVertical: 10,
            fontSize: 17,
            color: colors.primaryText,
          }}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          value={countryCode && countryCode.dial_code}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        <TextInput
          style={{
            marginVertical: 10,
            fontSize: 17,
            color: colors.primaryText,
          }}
          placeholder="999 999 9999"
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

            navigation.navigate("VerificationScreen", {
              verificationId,
              phoneNumber,
            });
          } catch (err) {
            console.log(err.message);
          }
        }}
      />
    </ScreenContainer>
  );
};
