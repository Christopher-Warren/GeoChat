import firebaseInit from "./firebaseInit";
import MainStack from "./Screens/MainStack";
import axios from "axios";
import { UserProvider } from "./contexts/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { colors } from "./styles/styles";
import { StatusBar } from "expo-status-bar";

import { AlertNotificationRoot } from "react-native-alert-notification";

import * as NavigationBar from "expo-navigation-bar";

// Initialize Axios
if (!__DEV__)
  axios.defaults.baseURL = "https://chatlink-backend.herokuapp.com/";
if (__DEV__) axios.defaults.baseURL = "http://192.168.1.108:8000";

// Initialize Firebase
firebaseInit();
const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    signika: require("./assets/fonts/Signika/Signika-VariableFont_wght.ttf"),
    signika_bold: require("./assets/fonts/Signika/static/Signika-Medium.ttf"),
    signika_light: require("./assets/fonts/Signika/static/Signika-Light.ttf"),

    roboto_slab: require("./assets/fonts/Roboto_Slab/RobotoSlab-VariableFont_wght.ttf"),
    roboto_slab_bold: require("./assets/fonts/Roboto_Slab/static/RobotoSlab-Bold.ttf"),
    roboto_slab_light: require("./assets/fonts/Roboto_Slab/static/RobotoSlab-Light.ttf"),
  });

  NavigationBar.setBackgroundColorAsync(colors.themeBackground);

  /*
  @TODO: 
  [] Animate onboarding buttons
  [] show more details during onboarding process

  [] Style 0 users & 0 connections tabs

  */

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SafeAreaProvider>
          <AlertNotificationRoot
            dialogConfig={{ autoClose: true }}
            theme="dark"
            colors={[
              { success: colors.green, card: "red" },
              {
                success: colors.green,
                card: colors.primaryBackground,
                label: colors.primaryText,
                danger: colors.red,
              },
            ]}
          >
            <StatusBar backgroundColor={colors.themeBackground} style="light" />

            <MainStack />
          </AlertNotificationRoot>
        </SafeAreaProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
