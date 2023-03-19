import { Text, View } from "react-native";
import { colors } from "../../styles/styles";

const TabBarBadge = ({ count }) => {
  if (count <= 0) return null;

  return (
    <View
      style={{
        left: -70,
        backgroundColor: colors.primaryAccent,
        padding: 2,
        aspectRatio: 1,
        borderRadius: 100,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 12 }}>
        {count >= 10 ? "10+" : count}
      </Text>
    </View>
  );
};
export default TabBarBadge;
