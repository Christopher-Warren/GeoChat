import React, { useRef, useState, useMemo } from "react";
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

export default RenderLocalUsers = ({ item, index }) => {
  console.log("Render Item: ", index);

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
        {/* <SvgUri
            uri={`https://avatars.dicebear.com/api/bottts/:${item._id.slice(
              (0, -4)
            )}.svg`}
            style={{
              backgroundColor: "#4471E8",
              width: 32,
              height: 32,
              marginRight: 15,
              borderRadius: 8,
            }}
          ></SvgUri> */}
        <View
          style={{
            backgroundColor: "#DDFFF7",
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
              uri: `https://avatars.dicebear.com/api/bottts/:${item._id}.png`,
            }}
          ></Image>
        </View>

        <View>
          <Text style={styles.topLeftText}>User</Text>
          <Text style={styles.bottomLeftText}>{item._id.slice((0, -4))}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.topLeftText}>Status</Text>
        <Text style={styles.bottomLeftText}>Wants to chat!</Text>
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
