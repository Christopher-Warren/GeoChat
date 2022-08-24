import { useEffect, useState } from "react";
import { useLocation } from "./useLocation";

import axios from "axios";

export const useLocalUsers = () => {
  const location = useLocation();

  const [localUsers, setLocalUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) {
      return;
    }
    const coords = location.coords;

    const coordinates = [coords.longitude, coords.latitude];

    const geoJSON = {
      type: "Point",
      coordinates,
    };

    (async () => {
      setLoading(true);
      const { data } = await axios.post(
        "http://192.168.1.61:8000/api/getLocalUsers",
        { location: geoJSON }
      );

      const newUsers = data.usersNearBy.sort((a, b) => a._id > b._id);

      if (data.usersNearBy) setLoading(false);

      if (localUsers.length === newUsers.length) {
        const usersSame = localUsers.every((v, i) => v._id === newUsers[i]._id);
        if (!usersSame) {
          setLocalUsers(newUsers);
        }
      } else {
        {
          setLocalUsers(newUsers);
        }
      }
    })();
  }, [location]);
  return { localUsers, loading };
};
