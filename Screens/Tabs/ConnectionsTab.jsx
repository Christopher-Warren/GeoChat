import { useIsFocused } from "@react-navigation/native";
import { forwardRef, useContext, useEffect, useRef } from "react";
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

const ConnectionsTab = ({ navigation }) => {
  const { data, isRefetching, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsersConnections();

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
        refetch={refetch}
        isRefetching={isRefetching}
        setPage={setPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        userId={user._id}
        RightComponent={ConnectionButtons}
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
      />
    );
  };

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
      />
    );
  };

  console.log(
    activeConnections.length,
    sentRequests.length,
    recievedRequests.length
  );
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
        <Tab.Screen
          name="Active"
          options={{
            tabBarIcon: () => (
              <Ionicons name="activity" color="white" size={20} />
            ),
            tabBarShowLabel: false,
          }}
          component={ActiveConnections}
        />
      </Tab.Navigator>
    </ScreenContainer>
  );
};
export default ConnectionsTab;
