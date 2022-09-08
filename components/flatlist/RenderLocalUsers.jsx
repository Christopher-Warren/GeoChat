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
import { colors, fontSize } from "../../styles/styles";

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
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            width: 35,
            height: 35,
            marginRight: 15,
            borderRadius: 50,
          }}
        >
          <Image
            style={styles.image}
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
    borderRadius: 10,
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
  image: {
    height: 30,
    width: 30,
  },
});
