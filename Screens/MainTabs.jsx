import { colors, fontSize } from "../styles/styles";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocalUsersTab from "./Tabs/LocalUsersTab";
import UserHeader from "../components/headers/UserHeader";
import RequestsTab from "./Tabs/RequestsTab";
import ChatTab from "./Tabs/ChatTab";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
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
            iconName = focused ? "flash" : "flash-outline";
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
      <Tab.Screen name="LocalUsersTab" component={LocalUsersTab} />
      {/* // Becomes request/sent tabs */}
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
