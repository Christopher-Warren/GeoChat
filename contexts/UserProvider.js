import { getAuth, onAuthStateChanged } from "firebase/auth/react-native";
import { createContext, useState } from "react";
import axios from "axios";

import { Loader } from "../components/loaders/Loader";
import { Button, Text, View } from "react-native";

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser && !user && !error) {
      try {
        const { data } = await axios.post(
          "/api/verifyUid",
          {
            firebaseUid: currentUser.uid,
            phoneNumber: currentUser.phoneNumber,
          },
          { timeout: 2000 }
        );
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        setError("Internal server error, please try again later");
        setLoading(false);
      }
    }
  });
  //
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {loading && <Loader />}
        {error && (
          <View>
            <Text>{error}</Text>
            <Button
              title="Try again"
              onPress={(e) => {
                setError(null);
                setLoading(true);
              }}
            />
          </View>
        )}
        {user && children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
