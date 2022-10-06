import firebaseInit from "./firebaseInit";
import MainScreen from "./Screens/MainScreen";
import axios from "axios";
import { UserProvider } from "./contexts/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { colors } from "./styles/styles";
import { StatusBar } from "expo-status-bar";

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

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SafeAreaProvider>
          <StatusBar backgroundColor={colors.themeBackground} style="light" />

          <MainScreen />
        </SafeAreaProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
