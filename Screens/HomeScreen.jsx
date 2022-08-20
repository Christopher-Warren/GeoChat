import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAuth } from "firebase/auth/react-native";
import { useCallback, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { useLocation } from "../hooks/useLocation";

const HomeScreen = ({ route }) => {
  const auth = getAuth();

  const [localUsers, setLocalUsers] = useState([]);

  const location = useLocation();

  const pollLocation = async (auth, location) => {
    if (!location || !auth) return;
    const uid = auth.currentUser.uid;
    const coords = location.coords;

    const coordinates = [coords.longitude, coords.latitude];

    const geoJSON = {
      type: "Point",
      coordinates,
    };

    try {
      const { data } = await axios.post(
        "http://192.168.1.61:8000/api/pollLocation",
        { uid, location: geoJSON }
      );
    } catch (error) {
      console.log("location poll", error);
    }
  };
  pollLocation(auth, location);

  const getLocalUsers = async (location) => {
    if (!location) return;

    const uid = auth.currentUser.uid;
    const coords = location.coords;

    const coordinates = [coords.longitude, coords.latitude];

    const geoJSON = {
      type: "Point",
      coordinates,
    };

    try {
      const { data } = await axios.post(
        "http://192.168.1.61:8000/api/getLocalUsers",
        { location: geoJSON }
      );
      if (data)
        setLocalUsers(
          data.usersNearBy.filter((user) => user.firebaseUid !== uid)
        );

      // if (data) setLocalUsers(data.usersNearBy);
    } catch (error) {
      console.log("localusers", error);
    }
  };
  getLocalUsers(location);

  return (
    <View>
      {localUsers.map((user) => {
        return <Button title={user._id} key={user._id} />;
      })}

      <Button
        title="Clear storage"
        onPress={async () => {
          AsyncStorage.clear();
        }}
      />
    </View>
  );
};

export default HomeScreen;
