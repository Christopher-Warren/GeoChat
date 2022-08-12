import { Text, View, Button, Alert, TextInput } from "react-native";

import { useEffect, useState } from "react";
import { CommonActions, StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        onPress={() => {
          AsyncStorage.clear();
        }}
      />
    </View>
  );
}

export default AliasScreen;
