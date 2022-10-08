import { Pressable, Modal, Button, Alert } from "react-native";
import { colors } from "../../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

import axios from "axios";

export const LocalUserButtons = ({ userId, selectedId, refetch, item }) => {
  return (
    <>
      <Pressable
        style={{
          padding: 10,
          backgroundColor: colors.green,
          borderRadius: 10,
        }}
        onPress={async (e) => {
          try {
            const data = await axios.post("/api/requestConnection", {
              creator: userId,
              recipient: selectedId,
            });

            if (data.status === 200)
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: `Chat request sent to ${item.alias}`,
                button: "Ok",
              });

            refetch();
          } catch (error) {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "Server error",
              textBody: `Please try again later`,
              button: "Ok",
            });
          }
        }}
      >
        <Ionicons name="send-outline" size={25} color="white" />
      </Pressable>
    </>
  );
};
export default LocalUserButtons;
