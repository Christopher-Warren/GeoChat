import { Pressable } from "react-native";
import { colors } from "../../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

import axios from "axios";
import { BodyText } from "../text/TextStyles";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { useLocalUsers } from "../../hooks/useLocalUsers";

export const ConnectionButtons = ({
  userId,
  selectedId,
  refetch,
  refetchExtra,
  item,
}) => {
  const creator = item.pendingConnection.creator;
  const recipient = item.pendingConnection.recipient;

  const isCreator = userId === creator.user;
  const isConnected = creator.hasAccepted && recipient.hasAccepted;

  const { refetch: extraRefetch } = useLocalUsers();

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
                textBody: `Chat request canceled`,
                button: "Ok",
              });

            refetch();
            extraRefetch();
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
                userId: userId,
              });

              if (req.status === 200)
                Dialog.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: "Success",
                  textBody: `You will recieve a text message allowing you to chat soon`,
                  button: "Ok",
                });

              refetch();
              extraRefetch();
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
          <Ionicons name="checkmark-outline" size={25} color="white" />
        </Pressable>
      )}
    </>
  );
};
export default ConnectionButtons;
