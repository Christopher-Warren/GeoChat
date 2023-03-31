import { useState } from "react";
import { Text, FlatList, RefreshControl } from "react-native";

import { colors } from "../styles/styles";
import { RenderLocalUsers } from "./flatlist/RenderLocalUsers";

import { useHeaderHeight } from "@react-navigation/elements";

import { useRoute } from "@react-navigation/native";

const LocalUsers = ({
  data,
  isRefetching,
  refetch,
  setPage,
  fetchNextPage,
  hasNextPage,
  userId,
  RightComponent,
  ListHeader,
  navigation,
}) => {
  const [selectedId, setSelectedId] = useState(null);

  const height = useHeaderHeight();

  const route = useRoute();
  const routeName = route.name;

  const ListFooterComponent = () => {
    let message = "";

    if (routeName === "LocalUsersTab" && data.length === 0) {
      message = "No users found in your area";
    } else {
      message = "No more users found in your area";
    }

    if (routeName === "Sent" && data.length === 0) {
      message = "No invites sent";
    }

    if (routeName === "Recieved" && data.length === 0) {
      message = "No invites recieved";
    }

    if (routeName === "ChatTab" && data.length === 0) {
      message = "No chat sessions have started";
    }

    return (
      <Text style={{ color: colors.secondaryText, textAlign: "center" }}>
        {message}
      </Text>
    );
  };

  const renderItem = ({ item }) => {
    const connected =
      item.pendingConnection?.creator.hasAccepted &&
      item.pendingConnection?.recipient.hasAccepted;

    const connectionId = item.pendingConnection?._id;

    return (
      <RenderLocalUsers
        item={item}
        onLongPress={(e) => {
          if (selectedId === item._id) {
            setSelectedId(null);
            return;
          }
          setSelectedId(item._id);
        }}
        onPress={() => {
          if (route.name === "ChatTab" && connected) {
            // navigate to conversation
            // connectionId

            navigation.navigate("Conversation", {
              connectionId,
            });

            return;
          }

          if (selectedId === item._id) {
            setSelectedId(null);
            return;
          }
          setSelectedId(item._id);
        }}
        selectedId={selectedId}
        userId={userId}
        RightComponent={RightComponent}
        refetch={refetch}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: 45,
      }}
      data={data}
      ListHeaderComponent={ListHeader}
      extraData={selectedId}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshing={isRefetching}
      refreshControl={
        <RefreshControl
          onRefresh={refetch}
          enabled={true}
          refreshing={isRefetching}
          progressViewOffset={height}
          progressBackgroundColor={colors.primaryAccent}
        />
      }
      onEndReached={(e) => {
        if (!hasNextPage) return;
        fetchNextPage();
      }}
      ListFooterComponent={!hasNextPage && ListFooterComponent}
    />
  );
};

export default LocalUsers;
