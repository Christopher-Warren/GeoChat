import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { Text, View, Image } from "react-native";
import { UserContext } from "../../contexts/UserProvider";

import {
  appFonts,
  colors,
  fontSize,
  getAvatarUri,
  iconSize,
} from "../../styles/styles";
import { ScreenContainer } from "../ScreenContainer";

const UserHeader = () => {
  const user = useContext(UserContext);

  const avatarUri = getAvatarUri(user._id);

  return (
    <LinearGradient
      start={{ x: 0, y: 0.8 }}
      colors={[colors.themeBackground, "#0000"]}
    >
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
                fontFamily: appFonts.signika_bold,
                fontSize: fontSize.large,
              }}
            >
              {user.alias}
            </Text>
          </View>

          <View
            style={{
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
                uri: avatarUri,
              }}
            />
          </View>
        </View>
      </ScreenContainer>
    </LinearGradient>
  );
};
export default UserHeader;
