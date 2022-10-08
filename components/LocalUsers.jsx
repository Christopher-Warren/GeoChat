import { useState } from "react";
import { Text, FlatList, Button, View, RefreshControl } from "react-native";

import { appFonts, colors, fontSize, layout } from "../styles/styles";
import { RenderLocalUsers } from "./flatlist/RenderLocalUsers";
import { ScreenContainer } from "./ScreenContainer";
import { BodyText } from "./text/TextStyles";

import { useHeaderHeight } from "@react-navigation/elements";

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
}) => {
  const [selectedId, setSelectedId] = useState(null);

  const height = useHeaderHeight();

  const renderItem = ({ item }) => {
    return (
      <RenderLocalUsers
        item={item}
        onPress={() => {
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
      onRefresh={refetch}
      refreshControl={
        <RefreshControl
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
