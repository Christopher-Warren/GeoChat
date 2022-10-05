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

  const ListHeader = () => {
    return (
      <View style={{ paddingBottom: 40 }}>
        <BodyText
          style={{ fontFamily: appFonts.signika, fontSize: fontSize["3xl"] }}
        >
          Pending connections
        </BodyText>
        <BodyText
          style={{
            fontFamily: appFonts.signika,
            fontSize: fontSize.medium,
            color: colors.secondaryText,
          }}
        >
          Tap a user to accept or cancel chat request!
        </BodyText>
      </View>
    );
  };

  return (
    <LocalUsers
      ListHeader={ListHeader}
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
