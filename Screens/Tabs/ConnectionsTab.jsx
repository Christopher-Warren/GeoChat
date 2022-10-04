import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useRef } from "react";
import { Text } from "react-native";
import ConnectionButtons from "../../components/flatlist/ConnectionButtons";
import LocalUsers from "../../components/LocalUsers";
import { ScreenContainer } from "../../components/ScreenContainer";
import { UserContext } from "../../contexts/UserProvider";
import { useLocalUsersConnections } from "../../hooks/useLocalUsersConnections";

const ConnectionsTab = ({ navigation }) => {
  const { data, isRefetching, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsersConnections();
  const user = useContext(UserContext);

  const previousData = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!data) return;

    if (previousData.current !== data) {
      navigation.setOptions({ tabBarBadge: data.pages.flat().length });
      previousData.current = data;
      return;
    }

    if (isFocused) {
      navigation.setOptions({ tabBarBadge: null });
    }
  }, [data, isFocused]);

  if (!data) {
    return null;
  }
  return (
    <LocalUsers
      data={data}
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
export default ConnectionsTab;
