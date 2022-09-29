import firebaseInit from "./firebaseInit";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./Screens/MainScreen";
import axios from "axios";
import { UserProvider } from "./contexts/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { colors } from "./styles/styles";
import { StatusBar } from "expo-status-bar";
import { BodyText } from "./components/text/TextStyles";

const Stack = createNativeStackNavigator();
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
    roboto_slab: require("./assets/fonts/Roboto_Slab/RobotoSlab-VariableFont_wght.ttf"),
  });
  /* <NavigationContainer theme={MyTheme}>
            <StatusBar backgroundColor={colors.themeBackground} style="light" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={MainScreen} />
            </Stack.Navigator>
          </NavigationContainer> */
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
