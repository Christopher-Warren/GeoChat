import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { Text, View } from "react-native";
import LocalUsers from "../components/LocalUsers";
import { UserContext } from "../contexts/UserProvider";

import { colors, fontSize } from "../styles/styles";
import VerifyPhoneScreen from "./VerifyPhoneScreen";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocalUsersTab from "./Tabs/LocalUsersTab";
import UserHeader from "../components/headers/UserHeader";
import HomeTab from "./Tabs/HomeTab";
import ConnectionsTab from "./Tabs/ConnectionsTab";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();
const MainScreen = ({ route }) => {
  const user = useContext(UserContext);

  const { top } = useSafeAreaInsets();

  if (!user) return <VerifyPhoneScreen />;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.themeBackground,
      border: colors.border,
      primary: colors.primaryAccent,
      text: colors.primaryText,
      card: "red",
    },
  };

  return (
    <NavigationContainer theme={MyTheme} independent>
      <StatusBar backgroundColor={colors.themeBackground} style="light" />
      <Tab.Navigator
        sceneContainerStyle={{ paddingTop: top + 5, paddingHorizontal: 15 }}
        screenOptions={({ route }) => ({
          header: () => <UserHeader />,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 22;

            if (route.name === "Home") {
              iconName = focused ? "home-outline" : "home-outline";
            } else if (route.name === "UsersNearby") {
              iconName = focused ? "people-outline" : "people-outline";
              size += 4;
            } else if (route.name === "Connections") {
              iconName = focused ? "flash-outline" : "flash-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: { fontSize: fontSize.small },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: colors.inactiveTab,
          tabBarBackground: () => (
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: colors.themeBackground,
              }}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ unmountOnBlur: true }}
          component={HomeTab}
        />
        <Tab.Screen name="UsersNearby" component={LocalUsersTab} />
        <Tab.Screen
          name="Connections"
          options={{ unmountOnBlur: true }}
          component={ConnectionsTab}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
