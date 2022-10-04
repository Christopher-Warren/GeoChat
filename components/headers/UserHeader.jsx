import { useContext } from "react";
import { Text, View, Image } from "react-native";
import { UserContext } from "../../contexts/UserProvider";
import { appFonts, colors, fontSize, iconSize } from "../../styles/styles";
import { ScreenContainer } from "../ScreenContainer";

const UserHeader = () => {
  const user = useContext(UserContext);
  return (
    <ScreenContainer paddingTopEnabled>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 15,
          paddingBottom: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: colors.primaryText,
              fontSize: fontSize.medium,
              fontFamily: appFonts.signika,
            }}
          >
            Hello there,
          </Text>
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: appFonts.signika,
              fontSize: fontSize.large,
            }}
          >
            {user.alias}
          </Text>
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
    </ScreenContainer>
  );
};
export default UserHeader;
