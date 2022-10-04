import { Pressable } from "react-native";
import { colors } from "../../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

import axios from "axios";
import { BodyText } from "../text/TextStyles";

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
            padding: 5,
            backgroundColor: colors.secondaryText,
            borderRadius: 10,
          }}
          onPress={async (e) => {
            const connectionId = item.pendingConnection._id;
            const req = await axios.post("/api/endConnection", {
              connectionId: connectionId,
              creatorId: creator.user,
              recipientId: recipient.user,
            });

            refetch();
          }}
        >
          <Ionicons name="close-outline" size={25} color="white" />
        </Pressable>
      ) : (
        <Pressable
          style={{
            padding: 5,
            backgroundColor: colors.secondaryText,
            borderRadius: 10,
          }}
          onPress={async (e) => {
            const connectionId = item.pendingConnection._id;
            const req = await axios.post("/api/acceptRequest", {
              connectionId: connectionId,
            });

            refetch();
          }}
        >
          <Ionicons name="send-outline" size={25} color="white" />
        </Pressable>
      )}
    </>
  );
};
export default ConnectionButtons;
