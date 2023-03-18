import { useIsFocused, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useRef, forwardRef, useState } from "react";
import { View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import LocalUserButtons from "../../components/flatlist/LocalUserButtons";

import LocalUsers from "../../components/LocalUsers";
import { BodyText } from "../../components/text/TextStyles";
import { UserContext } from "../../contexts/UserProvider";
import { useLocalUsers } from "../../hooks/useLocalUsers";
import { useLocation } from "../../hooks/useLocation";

import { ScreenContainer } from "../../components/ScreenContainer";

import { appFonts, colors, fontSize } from "../../styles/styles";
import { FlatListHeader } from "../../components/headers/FlatListHeader";
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
    if (isFocused) {
      return navigation.setOptions({ tabBarBadge: null });
    }
    if (previousData.current !== data) {
      // can optionally compare, and update new data after clearing

      // e.g. X new people are near

      // will currently only render 10 items at a time
      // can potentially add meta data to endpoint stating total #

      // can also save state or local storage and compare with that value
      // which prevents new items from showing after restarting app
      const length = data.pages.flat().length;

      navigation.setOptions({ tabBarBadge: length >= 10 ? "10+" : length });
      previousData.current = data;
      return;
    }
  }, [data, isFocused]);

  if (!data) {
    return null;
  }

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
