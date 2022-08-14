import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAuth } from "firebase/auth/react-native";
import { useCallback, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { useLocation } from "../hooks/useLocation";

const HomeScreen = ({ route }) => {
  const auth = getAuth();

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
      console.log(error);
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

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  getLocalUsers(location);

  return (
    <View>
      <Text>HOME</Text>
      <Text>Lon: {location && location.coords.longitude}</Text>
      <Text>Lat: {location && location.coords.latitude}</Text>

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
