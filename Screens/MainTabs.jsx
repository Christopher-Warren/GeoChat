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

          if (route.name === "HomeTab") {
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
      <Tab.Screen name="HomeTab" component={LocalUsersTab} />
      {/* // Becomes request/sent tabs */}
      <Tab.Screen
        name="UsersNearby"
        options={{
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
        name="Connections"
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
