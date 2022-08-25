import { getAuth, onAuthStateChanged } from "firebase/auth/react-native";
import { createContext, useState } from "react";
import axios from "axios";
import { ActivityIndicator, View } from "react-native";

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

const LoadingScreen = ({ route }) => {
  return (
    <View style={{ height: "100%" }}>
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", alignContent: "center", flex: 1 }}
      />
    </View>
  );
};

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser && !user) {
      try {
        const { data } = await axios.post(
          "http://192.168.1.61:8000/api/verifyUid",
          {
            firebaseUid: currentUser.uid,
            phoneNumber: currentUser.phoneNumber,
          }
        );

        setUser(data.user);
      } catch (error) {
        console.log("User Provider Error: ", error);
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  });

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
