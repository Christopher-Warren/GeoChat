import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Button, TextInput, View, Modal, Text, Pressable } from "react-native";
import { HeaderText } from "../../components/text/TextStyles";
import { colors, fontSize } from "../../styles/styles";

import { useEffect, useRef, useState } from "react";
import { getApp } from "firebase/app";
import { getAuth, PhoneAuthProvider } from "firebase/auth/react-native";

import * as Cellular from "expo-cellular";
import { CountryCodes } from "../../assets/misc/CountryCodes";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Loader } from "../../components/loaders/Loader";

import Ionicons from "@expo/vector-icons/Ionicons";
import { OnboardingHeader } from "../../components/headers/OnboardingHeader";

export const SignupScreen = ({ navigation, route }) => {
  const recaptchaVerifier = useRef(null);

  const app = getApp();
  const auth = getAuth();

  const [phoneNumber, setPhoneNumber] = useState("650-555-1234");
  const [countryCode, setCountryCode] = useState(null);

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
      // @TODO: Handle case where there is no found code
      const code = await Cellular.getIsoCountryCodeAsync();

      const foundCode = CountryCodes.find(
        (cc) => cc.code === code.toUpperCase()
      );

      setCountryCode(foundCode);
    };

    if (!route.params || !route.params.countryCode) {
      setMobileCountryCode();
    }

    if (route.params) {
      route.params.countryCode && setCountryCode(route.params.countryCode);
    }
  }, [route.params]);

  if (!countryCode) {
    return <Loader />;
  }

  const sanitizedPhoneNumber = `${countryCode.dial_code} ${phoneNumber}`;

  return (
    <ScreenContainer paddingTopEnabled flexEnabled>
      <FirebaseRecaptchaVerifierModal
        // appVerificationDisabledForTesting={true}
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification={true}
      />
      <OnboardingHeader
        style={{ marginVertical: 15 }}
        route={route}
      ></OnboardingHeader>

      <HeaderText
        style={{
          color: colors.primaryText,
          fontSize: fontSize["3xl"],
          marginVertical: 15,
        }}
      >
        What's your phone number?
      </HeaderText>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() =>
            navigation.navigate("CountrySelection", { countryCode })
          }
          style={{
            marginVertical: 10,
            fontSize: fontSize.xxlarge,
            color: colors.primaryText,
            borderBottomWidth: 2,
            alignItems: "center",
            flexDirection: "row",
            borderBottomColor: colors.primaryText,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: fontSize.xxlarge,
              color: colors.primaryText,
              paddingTop: 2,
              borderBottomColor: colors.primaryText,
            }}
          >
            {`${countryCode.flag} ${countryCode.dial_code}`}
          </Text>
          <Ionicons
            name="chevron-down"
            style={{ marginTop: 7 }}
            color={"white"}
          ></Ionicons>
        </Pressable>

        <TextInput
          style={{
            marginVertical: 10,
            fontSize: fontSize.xxlarge,
            color: colors.primaryText,
            borderBottomWidth: 2,
            borderBottomColor: colors.primaryText,
            paddingVertical: 5,
            flex: 1,
            marginLeft: 15,
          }}
          placeholder="999 999 9999"
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          value={phoneNumber}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
      </View>
      {/* <Button title="Send Verification Code" disabled={!phoneNumber} /> */}
      <Pressable
        style={{
          position: "absolute",
          right: 15,
          bottom: 15,
        }}
        disabled={!sanitizedPhoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.

          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              sanitizedPhoneNumber,
              recaptchaVerifier.current
            );
            navigation.navigate("VerificationScreen", {
              verificationId,
              phoneNumber: sanitizedPhoneNumber,
            });
          } catch (err) {
            console.log(err.message);
            console.log(sanitizedPhoneNumber, typeof sanitizedPhoneNumber);
          }
        }}
      >
        <Ionicons
          name="arrow-forward"
          size={fontSize["3xl"]}
          color={"white"}
          style={{
            backgroundColor: colors.primaryBackground,
            alignSelf: "flex-start",
            borderRadius: 100,
          }}
        />
      </Pressable>
    </ScreenContainer>
  );
};
