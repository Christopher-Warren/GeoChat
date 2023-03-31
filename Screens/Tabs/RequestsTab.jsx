import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";

import ConnectionButtons from "../../components/flatlist/ConnectionButtons";
import LocalUsers from "../../components/LocalUsers";
import { ScreenContainer } from "../../components/ScreenContainer";

import { UserContext } from "../../contexts/UserProvider";
import { useLocalUsersConnections } from "../../hooks/useLocalUsersConnections";
import { colors } from "../../styles/styles";

import { FlatListHeader } from "../../components/headers/FlatListHeader";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TabBarBadge from "../../components/tabBar/TabBarBadge";
const Tab = createMaterialTopTabNavigator();

const RequestsTab = ({ navigation }) => {
  const { data, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsersConnections();
  const user = useContext(UserContext);
  const [isRefetching, setIsRefetching] = useState(false);

  const previousData = useRef(null);
  const isFocused = useIsFocused();

  // Needs own route on backend to share connected status
  const sentRequests = data?.pages.flat().filter((item) => {
    const pendingConnection = item.pendingConnection;

    if (
      pendingConnection.recipient.hasAccepted &&
      pendingConnection.creator.hasAccepted
    ) {
      return;
    }
    return item.pendingConnection.creator.user === user._id;
  });

  // Needs own route on backend to share connected status

  const recievedRequests = data?.pages.flat().filter((item) => {
    const pendingConnection = item.pendingConnection;

    if (
      pendingConnection.recipient.hasAccepted &&
      pendingConnection.creator.hasAccepted
    ) {
      return;
    }
    return item.pendingConnection.recipient.user === user._id;
  });

  const manualRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  useEffect(() => {
    if (!data) return;
    const length = recievedRequests.length;
    if (isFocused || length <= 0) {
      return navigation.setOptions({ tabBarBadge: null });
    }
    if (previousData.current !== data) {
      navigation.setOptions({ tabBarBadge: length >= 10 ? "10+" : length });
      previousData.current = data;
      return;
    }
  }, [data, isFocused]);

  if (!data) {
    return null;
  }

  const SentRequests = () => {
    return (
      <LocalUsers
        ListHeader={
          <FlatListHeader
            title="Sent Invites"
            body="Tap user to cancel chat request"
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
            title="Chat Invites"
            body="Tap user to accept or deny chat request"
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
          name="Recieved"
          options={{
            tabBarIcon: () => (
              <Ionicons name="person-add" color="white" size={20} />
            ),
            tabBarShowLabel: false,
            tabBarBadge: () => <TabBarBadge count={recievedRequests.length} />,
          }}
          component={RecievedRequests}
        />
        <Tab.Screen
          name="Sent"
          options={{
            tabBarIcon: () => <Ionicons name="send" color="white" size={20} />,
            tabBarShowLabel: false,
            tabBarBadge: () => <TabBarBadge count={sentRequests.length} />,
          }}
          component={SentRequests}
        />
      </Tab.Navigator>
    </ScreenContainer>
  );
};
export default RequestsTab;
