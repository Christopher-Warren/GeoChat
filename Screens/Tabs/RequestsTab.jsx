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

const RequestsTab = ({ navigation }) => {
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

  const sentRequests = data.pages
    .flat()
    .filter((item) => item.pendingConnection.creator.user === user._id);

  const recievedRequests = data.pages
    .flat()
    .filter((item) => item.pendingConnection.recipient.user === user._id);

  const activeConnections = data.pages
    .flat()
    .filter(
      (item) =>
        item.pendingConnection.creator.hasAccepted &&
        item.pendingConnection.recipient.hasAccepted
    );

  // break up into 2 parts.

  // active connections will be a new bab, replacing the 3rd one.
  const SentRequests = () => {
    return (
      <LocalUsers
        ListHeader={
          <FlatListHeader
            title="Sent Requests"
            body="Tap user to send chat request"
          />
        }
        data={sentRequests}
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

  const RecievedRequests = () => {
    return (
      <LocalUsers
        ListHeader={
          <FlatListHeader
            title="Incoming Requests"
            body="Tap user to accept or cancel chat request"
          />
        }
        data={recievedRequests}
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
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: colors.primaryAccent },
        }}
      >
        <Tab.Screen
          name="Sent"
          options={{
            tabBarIcon: () => <Ionicons name="send" color="white" size={20} />,
            tabBarShowLabel: false,
          }}
          component={SentRequests}
        />
        <Tab.Screen
          name="Recieved"
          options={{
            tabBarIcon: () => <Ionicons name="inbox" color="white" size={20} />,
            tabBarShowLabel: false,
          }}
          component={RecievedRequests}
        />
      </Tab.Navigator>
    </ScreenContainer>
  );
};
export default RequestsTab;
