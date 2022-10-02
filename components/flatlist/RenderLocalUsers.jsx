import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from "react-native";
import { borderRadius, colors, fontSize, iconSize } from "../../styles/styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

export const RenderLocalUsers = ({ item, press, selectedId, userId }) => {
  // const RenderStatus = () => {
  //   if (!item.pendingConnection) {
  //     return "none";
  //   }
  //   if (item._id === item.pendingConnection.userOne.user) {
  //     return "wants t9 chat";
  //   }
  //   if (item._id === item.pendingConnection.userTwo.user) {
  //     return "requeet sent";
  //   }
  // };

  const animated = new Animated.Value(1);

  const slideAnim = useRef(new Animated.Value(54)).current;

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // return (
  //   <Pressable onPress={press}>
  //     <View></View>
  //     <Text style={{ color: color }}>{item._id}</Text>
  //   </Pressable>
  // );

  if (selectedId === item._id) {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(slideAnim, {
      toValue: 54,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Pressable
      key={item._id}
      onPress={press}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
    >
      <Animated.View
        style={[
          styles.cardContainer,

          { overflow: "hidden", opacity: animated },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 35,
              height: 35,
              marginRight: 15,
            }}
          >
            <Image
              style={{
                height: 50,
                width: 50,
              }}
              source={{
                uri: `https://avatars.dicebear.com/api/bottts/:${item._id}.png?primaryColorLevel=700`,
              }}
            />
          </View>

          <View>
            <Text style={styles.topLeftText}>User</Text>
            <Text style={styles.bottomLeftText}>{item.alias}</Text>
          </View>
        </View>

        <View style={{ display: "none" }}>
          <Text style={{ textAlign: "right", color: colors.secondaryText }}>
            Active
          </Text>
          <Text style={{ color: colors.primaryText }}>Recently</Text>
        </View>

        <Pressable
          style={{
            height: "100%",
          }}
          onPress={(e) => {
            axios.post("/api/requestConnection", {
              userOne: userId,
              userTwo: selectedId,
            });
          }}
        >
          <Animated.View
            style={[
              { transform: [{ translateX: slideAnim }] },
              {
                height: "100%",
                width: 54,
                position: "absolute",
                right: 0,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Ionicons name="send-outline" size={25} color="white"></Ionicons>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primaryBackground,
    marginBottom: 20,
    // padding: 15,
    borderRadius: borderRadius.xlarge,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topLeftText: {
    color: colors.secondaryText,
  },
  bottomLeftText: {
    color: colors.primaryText,
    fontWeight: "bold",
    fontSize: fontSize.large,
  },
});
