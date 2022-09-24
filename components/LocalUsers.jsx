import { useRef, useState } from "react";
import { Text, FlatList } from "react-native";

import { useLocalUsers } from "../hooks/useLocalUsers";
import { useLocation } from "../hooks/useLocation";
import { RenderLocalUsers } from "./flatlist/RenderLocalUsers";

const LocalUsers = () => {
  const { errorMsg } = useLocation();
  const { data, isRefetching, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsers();

  // change this
  // parent needs to conditionally render
  // this component
  if (!data) {
    return null;
  }

  const DATA = [
    {
      _id: "63056dc642dd162f2e57458e",
      alias: "MissingCoffee",
    },
    {
      _id: "63056dd942dd162f2e57458f",
      alias: "PricklyTurquoise",
    },
    {
      _id: "63056ddd42dd162f2e574590",
      alias: "DelightfulCoffee",
    },
    {
      _id: "63056de442dd162f2e574591",
      alias: "KeenRed",
    },
    {
      _id: "63056deb42dd162f2e574592",
      alias: "EmptyBrown",
    },
    {
      _id: "63056df942dd162f2e574593",
      alias: "FinalBlue",
    },
    {
      _id: "63056dff42dd162f2e574594",
      alias: "ExactTeal",
    },
    {
      _id: "63056ec04de734f88cb0f673",
      alias: "MissingCoffee",
    },
    {
      _id: "63056f2129d811e9470c4a1b",
      alias: "ExternalBlue",
    },
    {
      _id: "63056f2129d811e9470c4a1d",
      alias: "SilentGold",
    },
    {
      _id: "63056f2129d811e9470c4a1f",
      alias: "LooseAmethyst",
    },
    {
      _id: "63056f2129d811e9470c4a21",
      alias: "ModeratePeach",
    },
    {
      _id: "63056f2129d811e9470c4a23",
      alias: "EstablishedScarlet",
    },
    {
      _id: "63056f2129d811e9470c4a25",
      alias: "FortunateViolet",
    },
    {
      _id: "63056f2129d811e9470c4a27",
      alias: "FrozenIndigo",
    },
    {
      _id: "63056f2129d811e9470c4a29",
      alias: "DreadfulPeach",
    },
    {
      _id: "63056f2129d811e9470c4a2b",
      alias: "LogicalMoccasin",
    },
    {
      _id: "63056f2129d811e9470c4a2d",
      alias: "SquareIvory",
    },
    {
      _id: "63056f2129d811e9470c4a2f",
      alias: "SuddenMaroon",
    },
    {
      _id: "63056f2129d811e9470c4a31",
      alias: "SelectGreen",
    },
  ];

  // console.log(data.pages.flat());

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 45 }}
      // data={data.pages.flat()}
      data={DATA}
      renderItem={(props) => <RenderLocalUsers {...props} />}
      keyExtractor={(item) => item._id}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={(e) => fetchNextPage()}
      ListFooterComponent={!hasNextPage && <Text>End of list</Text>}
    />
  );
};

export default LocalUsers;
