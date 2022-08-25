import { getAuth, onAuthStateChanged } from "firebase/auth/react-native";
import { createContext, useState } from "react";
import axios from "axios";
import { ActivityIndicator, View } from "react-native";
import { Loader } from "../components/loaders/Loader";

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser && !user) {
      try {
        const { data } = await axios.post("/api/verifyUid", {
          firebaseUid: currentUser.uid,
          phoneNumber: currentUser.phoneNumber,
        });

        setUser(data.user);
      } catch (error) {
        console.log("User Provider Error: ", error);
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  });

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {loading ? <Loader /> : children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
