import { useState } from "react";
import { Text, FlatList } from "react-native";

import { layout } from "../styles/styles";
import { RenderLocalUsers } from "./flatlist/RenderLocalUsers";

const LocalUsers = ({
  data,
  isRefetching,
  refetch,
  setPage,
  fetchNextPage,
  hasNextPage,
  userId,
}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <RenderLocalUsers
        item={item}
        press={() => {
          if (selectedId === item._id) {
            setSelectedId(null);
            return;
          }
          setSelectedId(item._id);
        }}
        selectedId={selectedId}
        userId={userId}
      />
    );
  };
  const DATA = data.pages.flat();

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: 45,
        paddingHorizontal: layout.paddingHorizontal,
      }}
      data={data.pages.flat()}
      removeClippedSubviews={true}
      extraData={selectedId}
      renderItem={renderItem}
      keyExtractor={(item) => {
        console.log(item._id);
        return item._id;
      }}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={(e) => fetchNextPage()}
      ListFooterComponent={!hasNextPage && <Text>End of list</Text>}
    />
  );
};

export default LocalUsers;
