import { useIsFocused, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useRef } from "react";
import LocalUserButtons from "../../components/flatlist/LocalUserButtons";

import LocalUsers from "../../components/LocalUsers";
import { UserContext } from "../../contexts/UserProvider";
import { useLocalUsers } from "../../hooks/useLocalUsers";
import { useLocation } from "../../hooks/useLocation";

import { colors } from "../../styles/styles";
{
  /* <Button
            color={colors.primaryBackground}
            title="Clear storage"
            onPress={async () => {
              AsyncStorage.clear();
            }}
          /> */
}
const LocalUsersTab = ({ navigation, route }) => {
  const user = useContext(UserContext);
  const location = useLocation();
  const previousData = useRef(null);

  const { data, isRefetching, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsers();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!data) return;

    if (previousData.current !== data) {
      console.log("data is diff");
      // can optionally compare, and update new data after clearing
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
      RightComponent={LocalUserButtons}
    />
  );
};

export default LocalUsersTab;
