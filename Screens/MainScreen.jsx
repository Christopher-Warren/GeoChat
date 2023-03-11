import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { View } from "react-native";

import { UserContext } from "../contexts/UserProvider";

import { colors, fontSize } from "../styles/styles";
import OnboardingStack from "./OnboardingStack";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocalUsersTab from "./Tabs/LocalUsersTab";
import UserHeader from "../components/headers/UserHeader";
import HomeTab from "./Tabs/HomeTab";
import ConnectionsTab from "./Tabs/ConnectionsTab";
import HomeScreen from "./HomeScreen";

import { NavTheme } from "../styles/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversation from "./Tabs/Conversation";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const MainScreen = (props) => {
  const user = useContext(UserContext);

  if (!user) {
    return <OnboardingStack />;
  }

  return (
    <NavigationContainer theme={NavTheme} independent>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen name="Conversation" component={Conversation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
