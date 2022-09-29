import { Pressable, Text, View, StyleSheet } from "react-native";
import { borderRadius, colors, fontSize } from "../../styles/styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { RenderLocalUsers } from "../../components/flatlist/RenderLocalUsers";

const HomeTab = () => {
  return (
    <View>
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
              // fontFamily: "roboto",
              fontSize: 15,
            }}
          >
            Availible Credits
          </Text>
          <Ionicons name="notifications-outline" size={25} color="white" />
        </View>
        <Text
          style={{
            fontSize: fontSize.xxlarge,
            fontWeight: "bold",
            color: colors.primaryText,
            // fontFamily: "roboto",
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
        <Pressable
          style={{ flexDirection: "column", alignItems: "center", width: 60 }}
        >
          <Ionicons name="add-circle-outline" size={25} color="white" />
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Top up
          </Text>
        </Pressable>

        <View style={styles.verticalLine}></View>

        <Pressable
          style={{ flexDirection: "column", alignItems: "center", width: 60 }}
        >
          <Ionicons name="cash-outline" size={25} color="white" />
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ADs
          </Text>
        </Pressable>

        <View style={styles.verticalLine}></View>

        <Pressable
          style={{ flexDirection: "column", alignItems: "center", width: 60 }}
        >
          <Ionicons name="keypad-outline" size={25} color="white" />
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Promo
          </Text>
        </Pressable>
      </LinearGradient>
      <RenderLocalUsers item={{ alias: 123, _id: 123 }} />
    </View>
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
