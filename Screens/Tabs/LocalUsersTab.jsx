import { useIsFocused, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useRef, forwardRef } from "react";
import { View } from "react-native";

import LocalUserButtons from "../../components/flatlist/LocalUserButtons";

import LocalUsers from "../../components/LocalUsers";
import { BodyText } from "../../components/text/TextStyles";
import { UserContext } from "../../contexts/UserProvider";
import { useLocalUsers } from "../../hooks/useLocalUsers";
import { useLocation } from "../../hooks/useLocation";

import { ScreenContainer } from "../../components/ScreenContainer";

import { appFonts, colors, fontSize } from "../../styles/styles";
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

      // e.g. X new people are near

      // will currently only render 10 items at a time
      // can potentially add meta data to endpoint stating total #

      // can also save state or local storage and compare with that value
      // which prevents new items from showing after restarting app
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

  const ListHeader = () => {
    return (
      <View style={{ paddingBottom: 40 }}>
        <BodyText
          style={{ fontFamily: appFonts.signika, fontSize: fontSize["3xl"] }}
        >
          Users within 1 mile
        </BodyText>
        <BodyText
          style={{
            fontFamily: appFonts.signika,
            fontSize: fontSize.medium,
            color: colors.secondaryText,
            textAlign: "center",
          }}
        >
          Tap a user to request to chat!
        </BodyText>
      </View>
    );
  };

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
      ListHeader={ListHeader}
    />
  );
};

export default LocalUsersTab;
