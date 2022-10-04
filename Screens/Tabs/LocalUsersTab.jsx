import { useContext } from "react";
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
const LocalUsersTab = () => {
  const user = useContext(UserContext);
  const location = useLocation();

  const { data, isRefetching, refetch, setPage, fetchNextPage, hasNextPage } =
    useLocalUsers();

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
