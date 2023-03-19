import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";

import { useHeaderHeight } from "@react-navigation/elements";

import LocalUserButtons from "../../components/flatlist/LocalUserButtons";

import LocalUsers from "../../components/LocalUsers";

import { UserContext } from "../../contexts/UserProvider";
import { useLocalUsers } from "../../hooks/useLocalUsers";
import { useLocation } from "../../hooks/useLocation";

import { ScreenContainer } from "../../components/ScreenContainer";

import { FlatListHeader } from "../../components/headers/FlatListHeader";

const LocalUsersTab = ({ navigation, route }) => {
  const user = useContext(UserContext);
  const location = useLocation();
  const previousData = useRef(null);

  const height = useHeaderHeight();

  const { data, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsers();

  const isFocused = useIsFocused();

  const [isRefetching, setIsRefetching] = useState(false);

  const manualRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  useEffect(() => {
    if (!data) return;
    const length = data.pages.flat().length;
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
  // causes jerky ui
  // style={{ marginTop: height - 15 }}
  return (
    <ScreenContainer style={{ marginTop: height - 15 }}>
      <LocalUsers
        data={data.pages.flat()}
        refetch={manualRefetch}
        isRefetching={isRefetching}
        setPage={setPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        userId={user._id}
        RightComponent={LocalUserButtons}
        ListHeader={
          <FlatListHeader
            title="Users within one mile"
            body="Tap a user to request to chat"
          />
        }
      />
    </ScreenContainer>
  );
};

export default LocalUsersTab;
