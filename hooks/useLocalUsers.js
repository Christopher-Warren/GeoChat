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

    const geoJSON = {
      type: "Point",
      coordinates: [location.coords.longitude, location.coords.latitude],
    };

    (async () => {
      setLoading(true);
      const { data, request } = await axios.post("/api/getLocalUsers", {
        location: geoJSON,
        userId: "62f81cdf38105464afc49014",
      });

      console.log(request._url);

      const newUsers = data.usersNearBy;

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
