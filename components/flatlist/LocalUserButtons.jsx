import { Pressable } from "react-native";
import { colors } from "../../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

import axios from "axios";

export const LocalUserButtons = ({ userId, selectedId, refetch, item }) => {
  return (
    <>
      <Pressable
        style={{
          padding: 5,
          backgroundColor: colors.secondaryText,
          borderRadius: 10,
        }}
        onPress={async (e) => {
          await axios.post("/api/requestConnection", {
            creator: userId,
            recipient: selectedId,
          });

          refetch();
        }}
      >
        <Ionicons name="send-outline" size={25} color="white" />
      </Pressable>
    </>
  );
};
export default LocalUserButtons;
