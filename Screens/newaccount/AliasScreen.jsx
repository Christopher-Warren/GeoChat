import { Text, View, Button, Alert, TextInput } from "react-native";

import { useEffect, useState } from "react";
import { CommonActions, StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function AliasScreen({ navigation, route }) {
  const [alias, setAlias] = useState("");

  useEffect(() => {
    // navigation.addListener("beforeRemove", (e) => {
    //   // Prevent default behavior of leaving the screen
    //   e.preventDefault();
    // });
  }, [navigation]);

  const phoneNumber = route.params.user.phoneNumber;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Alias Screen</Text>
      <TextInput autoFocus onChangeText={(alias) => setAlias(alias)} />
      <Button
        title="Submit"
        onPress={async () => {
          AsyncStorage.clear();
          // try {
          //   const { data } = await axios.post(
          //     "http://192.168.1.61:8000/api/createUser",
          //     { alias, phoneNumber }
          //   );
          // } catch (error) {
          //   console.log(error);
          // }
        }}
      />
    </View>
  );
}

export default AliasScreen;
