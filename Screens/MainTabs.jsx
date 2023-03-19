import { colors, fontSize } from "../styles/styles";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserHeader from "../components/headers/UserHeader";

import LocalUsersTab from "./Tabs/LocalUsersTab";
import RequestsTab from "./Tabs/RequestsTab";
import ChatTab from "./Tabs/ChatTab";

const Tab = createBottomTabNavigator();

const MainTabs = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <UserHeader />,

        headerTransparent: true,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 22;

          if (route.name === "LocalUsersTab") {
            iconName = focused ? "compass" : "compass-outline";
            size += 6;
          } else if (route.name === "RequestsTab") {
            iconName = focused ? "people" : "people-outline";
            size += 4;
          } else if (route.name === "ChatTab") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: fontSize.small },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.inactiveTab,
        tabBarStyle: {
          backgroundColor: colors.themeBackground,
        },
        tabBarBadge: null,
        tabBarBadgeStyle: {
          backgroundColor: colors.primaryAccent,
          marginTop: 3,
        },
      })}
    >
      <Tab.Screen name="LocalUsersTab" component={LocalUsersTab} />
      <Tab.Screen
        name="RequestsTab"
        options={{
          headerShown: false,
          tabBarBadge: null,
          lazy: false,
          tabBarBadgeStyle: {
            backgroundColor: colors.primaryAccent,
            marginTop: 3,
          },
        }}
        component={RequestsTab}
      />
      <Tab.Screen
        name="ChatTab"
        options={{
          headerShown: false,
          tabBarBadge: null,
          lazy: false,
          tabBarBadgeStyle: {
            backgroundColor: colors.primaryAccent,
            marginTop: 3,
          },
        }}
        component={ChatTab}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
