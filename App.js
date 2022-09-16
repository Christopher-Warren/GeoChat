import firebaseInit from "./firebaseInit";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import axios from "axios";
import { UserProvider } from "./contexts/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";

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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </QueryClientProvider>
  );
}
