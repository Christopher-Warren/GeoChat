import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAuth } from "firebase/auth/react-native";
import { useState } from "react";
import { View, Button, StyleSheet, StatusBar } from "react-native";
import LocalUsers from "../components/LocalUsers";

import { useLocation } from "../hooks/useLocation";

const HomeScreen = ({ route }) => {
  console.log(route);
  const auth = getAuth();

  const [localUsers, setLocalUsers] = useState([]);

  // const location = useLocation();

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
      // change uid to mongo user id
      const { data } = await axios.post(
        "http://192.168.1.61:8000/api/pollLocation",
        {
          uid,
          location: geoJSON,
        }
      );
    } catch (error) {
      console.log("location poll", error);
    }
  };
  // pollLocation(auth, location);

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

      console.log(data.usersNearBy.length);

      // console.log(data.usersNearBy.length);
      // if (data) setLocalUsers(data.usersNearBy);

      // if (data) setLocalUsers(data.usersNearBy);
    } catch (error) {
      console.log("localusers", error);
    }
  };
  // getLocalUsers(location);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#120041"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <Button
        color="#281B54"
        title="Clear storage"
        onPress={async () => {
          AsyncStorage.clear();
        }}
      />
      <LocalUsers />
    </View>
  );
};

// #281B54

//

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#120041",
    height: "100%",
    marginTop: 0,
  },
});

export default HomeScreen;
