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

  return null;

  // return (
  //   <SafeAreaView>
  //     {console.log("asd")}
  //     {/* {loading && <ActivityIndicator />} */}
  //     {/* <Text style={{ color: "white", textAlign: "center" }}>
  //       Total Users: {localUsers.length}
  //     </Text> */}
  //   </SafeAreaView>
  // );
};

export default LocalUsers;
