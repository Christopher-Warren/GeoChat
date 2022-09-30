import { FlatList, TouchableOpacity, View } from "react-native";
import { CountryCodes } from "../../assets/misc/CountryCodes";
import { BodyText } from "../../components/text/TextStyles";

import { colors, fontSize, layout } from "../../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export const CountrySelection = ({ navigation, route }) => {
  const renderItem = ({ item, index }) => {
    const backgroundColor =
      route.params.countryCode.name === item.name
        ? colors.primaryBackground
        : undefined;

    const code = item.code.toLowerCase();

    return (
      <TouchableOpacity
        key={item.name}
        style={{
          backgroundColor,
          paddingVertical: 20,
          paddingHorizontal: layout.paddingHorizontal,

          //   borderBottomWidth: 1,
          //   borderBottomColor: colors.border,
        }}
        onPress={(e) =>
          navigation.navigate("SignupScreen", {
            countryCode: item,
          })
        }
      >
        <BodyText style={{ fontSize: fontSize.xlarge }}>
          {item.flag} {item.dial_code} {item.name}
        </BodyText>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          backgroundColor: colors.border,

          width: "100%",
          height: 1,
          position: "absolute",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={CountryCodes}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
      ></FlatList>
    </SafeAreaView>
  );
};
