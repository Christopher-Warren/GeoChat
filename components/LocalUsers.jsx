import { useRef, useState } from "react";
import { Text, FlatList } from "react-native";

import { useLocalUsers } from "../hooks/useLocalUsers";
import { useLocation } from "../hooks/useLocation";
import { RenderLocalUsers } from "./flatlist/RenderLocalUsers";

const LocalUsers = ({
  DATA,
  data,
  isRefetching,
  refetch,
  setPage,
  fetchNextPage,
  hasNextPage,
}) => {
  // const { errorMsg } = useLocation();

  const [selectedId, setSelectedId] = useState(null);

  // change this
  // parent needs to conditionally render
  // this component

  const renderItem = ({ item }) => {
    // if (selectedId === item._id) {
    //   console.log(selectedId);
    // }
    const color = selectedId === item._id ? "red" : "white";
    return (
      <RenderLocalUsers
        item={item}
        color={color}
        press={() => {
          if (selectedId === item._id) {
            setSelectedId(null);
            return;
          }
          setSelectedId(item._id);
        }}
        selectedId={selectedId}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 45 }}
      // data={data.pages.flat()}
      data={DATA}
      removeClippedSubviews={true}
      extraData={selectedId}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={(e) => fetchNextPage()}
      ListFooterComponent={!hasNextPage && <Text>End of list</Text>}
    />
  );
};

export default LocalUsers;
