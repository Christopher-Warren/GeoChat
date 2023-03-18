import { useState } from "react";
import { Text, FlatList, Button, View, RefreshControl } from "react-native";

import { appFonts, colors, fontSize, layout } from "../styles/styles";
import { RenderLocalUsers } from "./flatlist/RenderLocalUsers";
import { ScreenContainer } from "./ScreenContainer";
import { BodyText } from "./text/TextStyles";

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

  const renderItem = ({ item }) => {
    const connected =
      item.pendingConnection?.creator.hasAccepted &&
      item.pendingConnection?.recipient.hasAccepted;

    const connectionId = item.pendingConnection?._id;

    return (
      <RenderLocalUsers
        item={item}
        onPress={() => {
          if (route.name === "Active" && connected) {
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
      ListFooterComponent={
        !hasNextPage && (
          <Text style={{ color: colors.secondaryText, textAlign: "center" }}>
            No more users found
          </Text>
        )
      }
    />
  );
};

export default LocalUsers;
