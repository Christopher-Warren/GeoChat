import { useState, useEffect, useCallback, useContext } from "react";
import * as Location from "expo-location";
import { UserContext } from "../contexts/UserProvider";

export function useLocation() {
  const [location, setLocation] = useState(null);
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
        (location) => {
          setLocation(location);
        }
      );
    })();

    return () => {
      if (!subscribe) return;
      subscribe.remove();
    };
  }, []);

  return location;
}
