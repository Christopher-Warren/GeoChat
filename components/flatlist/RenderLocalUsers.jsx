import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { borderRadius, colors, fontSize, iconSize } from "../../styles/styles";

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
          backgroundColor: pressed
            ? colors.primaryBackgroundPressed
            : colors.primaryBackground,
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
    marginVertical: 13,
    padding: 10,
    borderRadius: borderRadius.medium,
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
