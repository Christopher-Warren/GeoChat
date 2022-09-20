import firebaseInit from "./firebaseInit";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./Screens/MainScreen";
import axios from "axios";
import { UserProvider } from "./contexts/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
// Initialize Axios
if (__DEV__) axios.defaults.baseURL = "http://192.168.0.105:8000";
if (!__DEV__) axios.defaults.baseURL = "http://192.168.0.105:8000";

// Initialize Firebase
firebaseInit();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                options={{ headerShown: false }}
                component={MainScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
