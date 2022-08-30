import { useRef, useState, useMemo } from "react";
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

import { useLocalUsers } from "../hooks/useLocalUsers";
import { useLocation } from "../hooks/useLocation";
import { RenderLocalUsers } from "./flatlist/RenderLocalUsers";

const LocalUsers = () => {
  const { errorMsg } = useLocation();
  const { data, isRefetching, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsers();

  if (data) {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 45 }}
        data={data.pages.flat()}
        renderItem={RenderLocalUsers}
        keyExtractor={(item) => item._id + Math.random().toString()}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={(e) => fetchNextPage()}
        ListFooterComponent={!hasNextPage && <Text>No mo</Text>}
      />
    );
  }

  return (
    <SafeAreaView>
      {/* {loading && <ActivityIndicator />} */}
      {/* <Text style={{ color: "white", textAlign: "center" }}>
        Total Users: {localUsers.length}
      </Text> */}
    </SafeAreaView>
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

export default LocalUsers;
