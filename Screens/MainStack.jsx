import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";

import { UserContext } from "../contexts/UserProvider";

import OnboardingStack from "./OnboardingStack";

import MainTabs from "./MainTabs";

import { NavTheme } from "../styles/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConversationScreen from "./Tabs/ConversationScreen";

const Stack = createNativeStackNavigator();
const MainStack = (props) => {
  const user = useContext(UserContext);

  if (!user) {
    return <OnboardingStack />;
  }

  return (
    <NavigationContainer theme={NavTheme} independent>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          options={{ headerShown: false }}
          component={MainTabs}
        />
        <Stack.Screen
          options={{ animation: "none" }}
          name="Conversation"
          component={ConversationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
