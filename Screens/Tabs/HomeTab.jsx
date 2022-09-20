import { Text, View } from "react-native";
import { borderRadius, colors, fontSize } from "../../styles/styles";

import Ionicons from "@expo/vector-icons/Ionicons";

const HomeTab = () => {
  return (
    <View>
      <View
        style={{
          borderRadius: borderRadius.medium,
          backgroundColor: colors.primaryBackground,
          width: "100%",
          height: 200,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: colors.secondaryText,
              // fontFamily: "roboto",
              fontSize: 15,
            }}
          >
            Availible Credits
          </Text>
          <Ionicons name="notifications-outline" size={25} color="white" />
        </View>
        <Text
          style={{
            fontSize: fontSize.xxlarge,
            // fontWeight: "bold",
            color: colors.primaryText,
            fontFamily: "roboto",
          }}
        >
          10001
        </Text>
      </View>
    </View>
  );
};
export default HomeTab;
