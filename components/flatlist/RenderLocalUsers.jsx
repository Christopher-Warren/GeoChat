import React, { useCallback } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";

export const RenderLocalUsers = ({ item, index }) => {
  const RenderStatus = () => {
    if (!item.pendingConnection) {
      return "none";
    }
    if (item._id === item.pendingConnection.userOne.user) {
      return "wants t9 chat";
    }
    if (item._id === item.pendingConnection.userTwo.user) {
      return "requeet sent";
    }
  };

  return (
    <Pressable
      key={item._id}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#381B58" : "#281B54",
        },
        styles.cardContainer,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            width: 46,
            height: 46,
            marginRight: 15,
            borderRadius: 8,
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: `https://avatars.dicebear.com/api/bottts/:${item._id}.png?primaryColorLevel=700`,
            }}
          ></Image>
        </View>

        <View>
          <Text style={styles.topLeftText}>User</Text>
          <Text style={styles.bottomLeftText}>{item.alias}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.topLeftText}>Status {index}</Text>
        <Text style={styles.bottomLeftText}>
          <RenderStatus />
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    margin: 15,
    padding: 15,
    // backgroundColor: "#281B54",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topLeftText: {
    color: "#897DAA",
    // fontWeight: "bold",
    // fontSize: 18,
  },
  bottomLeftText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  userCardPress: {},
  image: {
    height: 40,
    width: 40,
  },
});
