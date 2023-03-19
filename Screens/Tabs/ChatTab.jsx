import { useIsFocused } from "@react-navigation/native";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import ConnectionButtons from "../../components/flatlist/ConnectionButtons";
import LocalUsers from "../../components/LocalUsers";
import { ScreenContainer } from "../../components/ScreenContainer";
import { BodyText } from "../../components/text/TextStyles";
import { UserContext } from "../../contexts/UserProvider";
import { useLocalUsersConnections } from "../../hooks/useLocalUsersConnections";
import { appFonts, colors, fontSize } from "../../styles/styles";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlatListHeader } from "../../components/headers/FlatListHeader";

import Ionicons from "@expo/vector-icons/Feather";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useLocalUsers } from "../../hooks/useLocalUsers";
const Tab = createMaterialTopTabNavigator();

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

  useEffect(() => {
    if (!data) return;
    if (isFocused) {
      return navigation.setOptions({ tabBarBadge: null });
    }
    if (previousData.current !== data) {
      const length = data.pages.flat().length;

      navigation.setOptions({ tabBarBadge: length >= 10 ? "10+" : length });
      previousData.current = data;
      return;
    }
  }, [data, isFocused]);

  if (!data) {
    return null;
  }

  const activeConnections = data.pages
    .flat()
    .filter(
      (item) =>
        item.pendingConnection.creator.hasAccepted &&
        item.pendingConnection.recipient.hasAccepted
    );

  const ActiveConnections = () => {
    return (
      <LocalUsers
        ListHeader={
          <FlatListHeader title="Connections" body="Tap user to end session" />
        }
        data={activeConnections}
        refetch={refetch}
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
