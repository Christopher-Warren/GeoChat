import { useContext } from "react";

import LocalUsers from "../../components/LocalUsers";
import { UserContext } from "../../contexts/UserProvider";

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

  return <LocalUsers />;
};

export default LocalUsersTab;
