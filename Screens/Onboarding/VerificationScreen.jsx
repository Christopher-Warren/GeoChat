import {
  getAuth,
  signInWithCredential,
  PhoneAuthProvider,
} from "firebase/auth/react-native";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { OnboardingHeader } from "../../components/headers/OnboardingHeader";
import { ScreenContainer } from "../../components/ScreenContainer";

import { BodyText, HeaderText } from "../../components/text/TextStyles";
import { colors, fontSize } from "../../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { OnbordingBack } from "../../components/onboarding/buttons/OnbordingBack";
import { OnboardingForward } from "../../components/onboarding/buttons/OnboardingForward";

export const VerificationScreen = ({
  route: {
    params: { verificationId, phoneNumber },
  },
  navigation,
}) => {
  const auth = getAuth();
  const [verificationCode, setVerificationCode] = useState("123456");

  const ref = useBlurOnFulfill({
    value: verificationCode,
    cellCount: 6,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode,
  });

  const submitVerification = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const signedIn = await signInWithCredential(auth, credential);

      const userPhoneNumber = signedIn.user.phoneNumber;
      const firebaseUid = signedIn.user.uid;

      // console.log("Phone authentication successful 👍");
    } catch (err) {
      // Warning: Can't perform a React state update on an unmounted component.
      // This is a no-op, but it indicates a memory leak in your application.
      // To fix, cancel all subscriptions and asynchronous tasks in %s.%s, a useEffect cleanup function,
      // console.log("VerificationScreen: ", err.message);
    }
  };

  return (
    <ScreenContainer paddingTopEnabled flexEnabled>
      <OnboardingHeader
        style={{ marginVertical: 15 }}
        route={"VerificationScreen"}
      ></OnboardingHeader>
      <HeaderText
        style={{
          color: colors.primaryText,
          fontSize: fontSize["3xl"],
          marginTop: 15,
        }}
      >
        Enter your Verification Code
      </HeaderText>
      <View style={{ flexDirection: "row", marginVertical: 15 }}>
        <BodyText style={{ color: colors.secondaryText }}>
          Sent to {phoneNumber} •
        </BodyText>
        <Pressable onPress={() => navigation.goBack()}>
          <BodyText style={{ color: colors.primaryAccent }}> Change</BodyText>
        </Pressable>
      </View>

      <View style={{ marginVertical: 30 }}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          cursorColor={colors.primaryAccent}
          value={verificationCode}
          onChangeText={setVerificationCode}
          cellCount={6}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={styles.cell}
              onLayout={getCellOnLayoutHandler(index)}
              onChangeText={(verificationCode) =>
                setVerificationCode(verificationCode)
              }
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>

      <OnbordingBack
        disabled={!verificationId}
        onPress={() => navigation.goBack()}
      />

      <OnboardingForward
        disabled={verificationCode.length !== 6}
        onPress={submitVerification}
      />
      <Pressable
        style={{
          position: "absolute",
          left: 20,
          bottom: 20,
          display: "none",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={fontSize["3xl"]}
          color={"white"}
          style={{
            backgroundColor: colors.primaryBackground,
            alignSelf: "flex-start",
            borderRadius: 100,
            padding: 8,
          }}
        />
      </Pressable>
      <Pressable
        style={({ pressed }) => ({
          position: "absolute",
          right: 20,
          bottom: 20,
          opacity: verificationCode.length === 6 ? 1 : 0.1,
          display: "none",
        })}
        disabled={verificationCode.length !== 6}
        onPress={submitVerification}
      >
        <Ionicons
          name="arrow-forward"
          size={fontSize["3xl"]}
          color={"white"}
          style={{
            backgroundColor: colors.primaryBackground,
            alignSelf: "flex-start",
            borderRadius: 100,
            padding: 8,
          }}
        />
      </Pressable>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    color: colors.primaryText,
    borderBottomWidth: 2,
    borderColor: colors.primaryText,
    textAlign: "center",
  },
});
