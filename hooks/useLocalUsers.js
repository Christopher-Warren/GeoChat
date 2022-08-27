import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "./useLocation";

import axios from "axios";

import { useQueryClient, useQuery, useMutation } from "react-query";
import { UserContext } from "../contexts/UserProvider";

export const useLocalUsers = () => {
  const user = useContext(UserContext);

  const { data, isLoading, refetch, isRefetching } = useQuery(
    ["localUsers"],
    async () => {
      const { data, request } = await axios.post("/api/getLocalUsers", {
        userId: user._id,
      });
      return data;
    }
  );

  return { data, refetch, isRefetching };
};
