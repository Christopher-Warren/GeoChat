import { useEffect, useRef, useState } from "react";
import { useLocation } from "./useLocation";

import axios from "axios";

export const useLocalUsers2 = () => {
  const location = useLocation();

  const [localUsers, setLocalUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const count = useRef(0);
  // console.log("                         USER UPDATE:", count.current++);

  // console.log(
  //   localUsers.length,
  //   "loading-----",
  //   loading,
  //   // "refreshing-----",
  //   // refreshing,
  //   location?.coords.latitude
  // );
  useEffect(() => {
    if (!location) {
      return;
    }

    const geoJSON = {
      type: "Point",
      coordinates: [location.coords.longitude, location.coords.latitude],
    };

    (async () => {
      // setLoading(true);
      const { data, request } = await axios.post("/api/getLocalUsers", {
        location: geoJSON,
        userId: "62f81cdf38105464afc49014",
      });

      const newUsers = data.usersNearBy;

      if (newUsers) {
        console.log("changing state"); // <---first
        setRefreshing(false);

        setLoading(false);
      }

      if (localUsers.length === newUsers.length) {
        console.log("do nothing");
        const usersSame = localUsers.every((v, i) => v._id === newUsers[i]._id);
        if (!usersSame) {
          console.log("            changing state 2");
          setLocalUsers(newUsers);
        }
      } else {
        console.log("                                      changing state 3"); // <--- second
        setLocalUsers(newUsers);
      }
    })();
  }, [location, refreshing]);

  // console.log(renderCount.current, renderCount2.current);
  return { localUsers, loading, refreshing, setRefreshing };
};
