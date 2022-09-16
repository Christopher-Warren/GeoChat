import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { getAuth } from "firebase/auth/react-native";
import { useContext, useState } from "react";
import { View, Button, StyleSheet, Text, Image } from "react-native";
import LocalUsers from "../components/LocalUsers";
import { UserContext } from "../contexts/UserProvider";

import { LinearGradient } from "expo-linear-gradient";

import { useLocation } from "../hooks/useLocation";
import { colors, fontSize } from "../styles/styles";
import VerifyPhoneScreen from "./VerifyPhoneScreen";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocalUsersTab from "../Tabs/LocalUsersTab";
import UserHeader from "../components/headers/UserHeader";

const Tab = createBottomTabNavigator();
const HomeScreen = ({ route }) => {
  const user = useContext(UserContext);

  if (!user) return <VerifyPhoneScreen />;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.themeBackground,
      border: colors.border,
      primary: colors.primaryTheme,
      text: colors.primaryText,
      card: "red",
    },
  };

  return (
    <NavigationContainer theme={MyTheme} independent>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "Connections") {
              iconName = focused ? "flash" : "flash-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: { fontSize: fontSize.small },
          tabBarItemStyle: {
            padding: 3,
          },
          tabBarInactiveTintColor: colors.primaryTheme_60,
          tabBarBackground: () => (
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: colors.primaryBackground,
              }}
            />
          ),
        })}
      >
        <Tab.Screen
          options={{
            header: UserHeader,
          }}
          name="Home"
          component={LocalUsersTab}
        />
        <Tab.Screen name="Connections" component={LocalUsers} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
