import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { colors } from "../../styles/styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { UserContext } from "../../contexts/UserProvider";

const Conversation = ({ route }) => {
  const connectionId = route.params.connectionId;
  const user = useContext(UserContext);

  const userId = user._id;

  const [newMessage, setNewMessage] = useState("");
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    // Could potentially improve performance here

    const interval = setInterval(() => {
      async function getData() {
        const { data } = await axios.get("/api/getMessages", {
          params: {
            connectionId: connectionId,
            userId: userId,
          },
        });

        const messages = data.messages.reverse();
        setMessageData(messages);
      }
      getData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("/api/getMessages", {
        params: {
          connectionId: connectionId,
          userId: userId,
        },
      });
      const messages = data.messages.reverse();
      setMessageData(messages);
    }
    getData();
  }, []);

  const Message = ({ message, user, index }) => (
    <View key={message}>
      <Text
        style={{
          color: "white",
          backgroundColor: colors.primaryBackground,
          marginVertical: 7,
          alignSelf: user === userId ? "flex-end" : "flex-start",
          maxWidth: "80%",
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 20,
        }}
      >
        {message}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.themeBackground,
      }}
    >
      <View style={{ marginHorizontal: 15, marginBottom: 55 }}>
        <FlatList
          data={messageData}
          inverted
          removeClippedSubviews={false}
          renderItem={({ item, index }) => (
            <Message index={index} message={item.message} user={item.user} />
          )}
        />
      </View>

      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          flexDirection: "row",
          backgroundColor: colors.themeBackground,
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: colors.primaryBackground,
            width: 10,
            borderRadius: 15,
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingVertical: 4,
            flexDirection: "row",
          }}
        >
          <TextInput
            onChangeText={(text) => setNewMessage(text)}
            value={newMessage}
            multiline
            style={{ width: "100%", color: "white" }}
          />
        </View>
        <Pressable
          onPress={async (e) => {
            const { data } = await axios.post(
              "/api/sendMessage",
              { message: newMessage },
              {
                params: {
                  connectionId: connectionId,
                  userId: userId,
                },
              }
            );

            const messages = data.messages.reverse();

            setNewMessage("");
            setMessageData(messages);
          }}
          style={{
            backgroundColor: colors.primaryAccent,
            alignSelf: "flex-end",
            justifyContent: "center",
            borderRadius: 100,
            aspectRatio: 1,
            alignItems: "center",
            width: "10%",
            marginLeft: 10,
          }}
        >
          <Ionicons size={20} name="send-outline" />
        </Pressable>
      </View>
    </View>
  );
};
export default Conversation;
