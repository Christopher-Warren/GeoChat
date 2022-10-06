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

import { NavTheme } from "../styles/theme";

const Tab = createBottomTabNavigator();
const MainScreen = (props) => {
  const user = useContext(UserContext);

  if (!user) {
    return <OnboardingStack />;
  }

  return (
    <NavigationContainer theme={NavTheme} independent>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          header: () => <UserHeader />,

          headerTransparent: true,

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
          tabBarStyle: {
            backgroundColor: colors.themeBackground,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen
          name="UsersNearby"
          options={{
            tabBarBadge: 1,
            lazy: false,
            tabBarBadgeStyle: {
              backgroundColor: colors.primaryAccent,
              marginTop: 3,
            },
          }}
          component={LocalUsersTab}
        />
        <Tab.Screen
          name="Connections"
          options={{
            tabBarBadge: 1,
            lazy: false,
            tabBarBadgeStyle: {
              backgroundColor: colors.primaryAccent,
              marginTop: 3,
            },
          }}
          component={ConnectionsTab}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
