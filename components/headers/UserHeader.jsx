import { useContext } from "react";
import { Text, View, Image } from "react-native";
import { UserContext } from "../../contexts/UserProvider";
import { colors, fontSize, iconSize } from "../../styles/styles";
import ScreenContainer from "../containers/ScreenContainer";

const UserHeader = () => {
  const user = useContext(UserContext);

  return (
    <ScreenContainer
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ color: colors.primaryText, fontSize: fontSize.small }}>
          Hello there,
        </Text>
        <Text style={{ color: colors.primaryText }}>{user.alias}</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          width: 35,
          height: 35,
          borderRadius: 50,
        }}
      >
        <Image
          style={iconSize.medium}
          source={{
            uri: `https://avatars.dicebear.com/api/bottts/:${user._id}.png?primaryColorLevel=700`,
          }}
        />
      </View>
    </ScreenContainer>
  );
};
export default UserHeader;
