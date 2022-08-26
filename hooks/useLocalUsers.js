import { useEffect, useRef, useState } from "react";
import { useLocation } from "./useLocation";

import axios from "axios";

import { useQueryClient, useQuery, useMutation } from "react-query";

export const useLocalUsers = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["localUsers"], async () => {
    if (!location) {
      throw new Error("Location not provided");
    }
    const geoJSON = {
      type: "Point",
      coordinates: [location.coords.longitude, location.coords.latitude],
    };

    const { data, request } = await axios.post("/api/getLocalUsers", {
      location: geoJSON,
      userId: "62f81cdf38105464afc49014",
    });
    return data;
  });
  // console.log("uselocalusers: ", data);

  return { data };
};
