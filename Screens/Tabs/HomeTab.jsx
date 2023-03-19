import { Text, View, StyleSheet } from "react-native";
import { appFonts, borderRadius, colors, fontSize } from "../../styles/styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

import { ScreenContainer } from "../../components/ScreenContainer";
import { AnimatedButton } from "../../components/animated/AnimatedButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth/react-native";
import { useHeaderHeight } from "@react-navigation/elements";

const HomeTab = () => {
  const user = getAuth();
  const height = useHeaderHeight();

  return (
    <ScreenContainer style={{ marginTop: height }}>
      <View
        style={{
          borderRadius: borderRadius.xlarge,
          backgroundColor: colors.primaryBackground,
          width: "100%",
          padding: 20,
          paddingBottom: 30,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: colors.secondaryText,
              fontFamily: appFonts.signika,
              fontSize: fontSize.xlarge,
            }}
          >
            Availible Credits
          </Text>

          <Ionicons name="notifications-outline" size={25} color="white" />
        </View>
        <Text
          style={{
            fontSize: fontSize.xxlarge,

            color: colors.primaryText,
            fontFamily: appFonts.roboto_slab_bold,
          }}
        >
          10001
        </Text>
      </View>

      <LinearGradient
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: borderRadius.xlarge,
          backgroundColor: "#4053F5",
          width: "100%",
          height: 75,
          padding: 20,
          marginTop: -20,
        }}
        colors={["#4471E8", "#4053F5"]}
      >
        <AnimatedButton icon="add-circle-outline" text="Top Up" />

        <View style={styles.verticalLine}></View>
        <AnimatedButton icon="cash-outline" text="Free Credits" />

        <View style={styles.verticalLine}></View>
        <AnimatedButton
          icon="keypad-outline"
          onPress={async (e) => {
            await user.signOut();
            await AsyncStorage.clear();
          }}
          text="Promo"
        />
      </LinearGradient>
    </ScreenContainer>
  );
};
export default HomeTab;

const styles = StyleSheet.create({
  verticalLine: {
    width: 1,
    backgroundColor: "#CDD9F8",
    height: "100%",
  },
});
