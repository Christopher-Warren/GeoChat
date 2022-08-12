import firebaseInit from "./firebaseInit";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VerifyPhoneScreen from "./Screens/newaccount/VerifyPhoneScreen";
import AliasScreen from "./Screens/newaccount/AliasScreen";
import { getAuth } from "firebase/auth/react-native";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

// Initialize Firebase
firebaseInit();

const HomeScreen = ({ route }) => {
  return (
    <View>
      <Text>Welcome home</Text>
    </View>
  );
};

export default function App() {
  // console.log(auth);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{ headerShown: false, presentation: "modal" }}
        >
          <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
          <Stack.Screen name="Alias" component={AliasScreen} />
        </Stack.Group>

        <Stack.Group
          screenOptions={{ headerShown: false, presentation: "modal" }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
