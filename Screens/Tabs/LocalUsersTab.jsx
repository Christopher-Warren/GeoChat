import { useContext } from "react";
import { StatusBar } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
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
  // const user = useContext(UserContext);

  return (
    <ScreenContainer>
      {/* <StatusBar animated={true} backgroundColor={colors.themeBackground} /> */}
      <LocalUsers />
    </ScreenContainer>
  );
};

export default LocalUsersTab;
