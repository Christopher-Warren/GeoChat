import { Pressable } from "react-native";
import { colors } from "../../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

import axios from "axios";
import { BodyText } from "../text/TextStyles";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export const ConnectionButtons = ({ userId, selectedId, refetch, item }) => {
  const creator = item.pendingConnection.creator;
  const recipient = item.pendingConnection.recipient;

  const isCreator = userId === creator.user;
  const isConnected = creator.hasAccepted && recipient.hasAccepted;

  return (
    <>
      {isCreator || isConnected ? (
        <Pressable
          style={{
            padding: 10,
            backgroundColor: colors.red,
            borderRadius: 10,
          }}
          onPress={async (e) => {
            const connectionId = item.pendingConnection._id;
            const req = await axios.post("/api/endConnection", {
              connectionId: connectionId,
              creatorId: creator.user,
              recipientId: recipient.user,
            });

            if (req.status === 200)
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: `Chat request cenceled`,
                button: "Ok",
              });

            refetch();
          }}
        >
          <Ionicons name="close-outline" size={25} color="white" />
        </Pressable>
      ) : (
        <Pressable
          style={{
            padding: 10,
            backgroundColor: colors.green,
            borderRadius: 10,
          }}
          onPress={async (e) => {
            try {
              const connectionId = item.pendingConnection._id;
              const req = await axios.post("/api/acceptRequest", {
                connectionId: connectionId,
              });

              if (req.status === 200)
                Dialog.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: "Success",
                  textBody: `You will recieve a text message allowing you to chat soon`,
                  button: "Ok",
                });

              refetch();
            } catch (error) {}
          }}
        >
          <Ionicons name="checkmark-outline" size={25} color="white" />
        </Pressable>
      )}
    </>
  );
};
export default ConnectionButtons;
