import { useContext } from "react";
import { Text, View, Image } from "react-native";
import { UserContext } from "../../contexts/UserProvider";
import { colors, fontSize, iconSize } from "../../styles/styles";

const UserHeader = () => {
  const user = useContext(UserContext);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10,
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
          style={iconSize.large}
          source={{
            uri: `https://avatars.dicebear.com/api/bottts/:${user._id}.png?primaryColorLevel=700`,
          }}
        />
      </View>
    </View>
  );
};
export default UserHeader;
