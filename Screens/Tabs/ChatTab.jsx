import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";

import ConnectionButtons from "../../components/flatlist/ConnectionButtons";
import LocalUsers from "../../components/LocalUsers";
import { ScreenContainer } from "../../components/ScreenContainer";

import { UserContext } from "../../contexts/UserProvider";
import { useLocalUsersConnections } from "../../hooks/useLocalUsersConnections";

import { useHeaderHeight } from "@react-navigation/elements";
import { FlatListHeader } from "../../components/headers/FlatListHeader";

const ChatTab = ({ navigation }) => {
  const { data, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsersConnections();

  const [isRefetching, setIsRefetching] = useState(false);

  const manualRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  const user = useContext(UserContext);

  const previousData = useRef(null);
  const isFocused = useIsFocused();

  const height = useHeaderHeight();

  const activeConnections = data?.pages
    .flat()
    .filter(
      (item) =>
        item.pendingConnection.creator.hasAccepted &&
        item.pendingConnection.recipient.hasAccepted
    );

  const numberOfIncomingRequests = activeConnections?.length;

  useEffect(() => {
    if (!data) return;

    const length = activeConnections.length;
    if (isFocused || numberOfIncomingRequests <= 0) {
      return navigation.setOptions({ tabBarBadge: null });
    }
    if (previousData.current !== data) {
      navigation.setOptions({
        tabBarBadge: length >= 10 ? "10+" : numberOfIncomingRequests,
      });
      previousData.current = data;
      return;
    }
  }, [data, isFocused]);

  if (!data) {
    return null;
  }

  const ActiveConnections = () => {
    return (
      <LocalUsers
        ListHeader={<FlatListHeader title="Inbox" body="Tap user to chat" />}
        data={activeConnections}
        refetch={manualRefetch}
        isRefetching={isRefetching}
        setPage={setPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        userId={user._id}
        RightComponent={ConnectionButtons}
        navigation={navigation}
      />
    );
  };

  return (
    <ScreenContainer paddingTopEnabled flexEnabled>
      <ActiveConnections />
    </ScreenContainer>
  );
};
export default ChatTab;
