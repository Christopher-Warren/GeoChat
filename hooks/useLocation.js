import { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { UserContext } from "../contexts/UserProvider";
import axios from "axios";

export const useLocation = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    let subscribe;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      subscribe = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        async (location) => {
          const geoJSON = {
            type: "Point",
            coordinates: [location.coords.longitude, location.coords.latitude],
          };

          try {
            const res = await axios.post("/api/pollLocation", {
              location: geoJSON,
              userId: user._id,
            });
          } catch (error) {
            setErrorMsg("Network error, please try again later");
          }
        }
      );
    })();

    return () => {
      if (!subscribe) return;
      subscribe.remove();
    };
  }, []);

  return { errorMsg };
};
