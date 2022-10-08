import { useHeaderHeight } from "@react-navigation/elements";
import { View } from "react-native";

import { appFonts, colors, fontSize } from "../../styles/styles";
import { BodyText } from "../text/TextStyles";
export const FlatListHeader = ({ title = "", body = "" }) => {
  return (
    <View style={{ paddingBottom: 35, paddingTop: 10 }}>
      <BodyText
        style={{
          fontFamily: appFonts.signika_bold,
          fontSize: fontSize.xxlarge,
        }}
      >
        {title}
      </BodyText>
      <BodyText
        style={{
          fontFamily: appFonts.signika,
          fontSize: fontSize.medium,
          color: colors.secondaryText,
        }}
      >
        {body}
      </BodyText>
    </View>
  );
};
