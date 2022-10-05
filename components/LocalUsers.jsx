import { useState } from "react";
import { Text, FlatList, Button, View } from "react-native";

import { appFonts, colors, fontSize, layout } from "../styles/styles";
import { RenderLocalUsers } from "./flatlist/RenderLocalUsers";
import { ScreenContainer } from "./ScreenContainer";
import { BodyText } from "./text/TextStyles";

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
        paddingHorizontal: layout.paddingHorizontal,
      }}
      data={data.pages.flat()}
      removeClippedSubviews={true}
      ListHeaderComponent={ListHeader}
      extraData={selectedId}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={(e) => fetchNextPage()}
      // ListFooterComponent={
      //   !hasNextPage && (
      //     <Text style={{ color: colors.primaryText }}>End of list</Text>
      //   )
      // }
    />
  );
};

export default LocalUsers;
