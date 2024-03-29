import { useContext } from "react";

import axios from "axios";

import { useInfiniteQuery } from "react-query";
import { UserContext } from "../contexts/UserProvider";

export const useLocalUsers = () => {
  const user = useContext(UserContext);

  // react query is handling these args
  const fetchLocalUsers = async ({ pageParam = 0 }) => {
    try {
      const { data } = await axios.post("/api/getLocalUsers", {
        userId: user._id,
        page: pageParam,
      });

      return data;
    } catch (error) {
      const arr = [];
      return arr;
    }
  };

  const { data, isLoading, refetch, fetchNextPage, isRefetching, hasNextPage } =
    useInfiniteQuery([`localUsers`], fetchLocalUsers, {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage) return;
        if (lastPage.length < 10) return;
        return pages.length;
      },
      refetchInterval: 5000,
    });

  return {
    data,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  };
};
