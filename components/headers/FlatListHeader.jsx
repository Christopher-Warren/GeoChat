import { useHeaderHeight } from "@react-navigation/elements";
import { View } from "react-native";

import { appFonts, colors, fontSize } from "../../styles/styles";
import { BodyText } from "../text/TextStyles";
export const FlatListHeader = ({ title = "", body = "" }) => {
  const height = useHeaderHeight();
  return (
    <View style={{ paddingBottom: 40, marginTop: height }}>
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
