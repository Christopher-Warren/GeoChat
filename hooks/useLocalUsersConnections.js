import { useContext } from "react";

import axios from "axios";

import { useInfiniteQuery } from "react-query";
import { UserContext } from "../contexts/UserProvider";

export const useLocalUsersConnections = () => {
  const user = useContext(UserContext);

  // react query is handling these args
  const fetchLocalUsers = async ({ pageParam = 0 }) => {
    const { data } = await axios.post("/api/getLocalUsers/connections", {
      userId: user._id,
      page: pageParam,
    });

    return data;
  };

  const { data, isLoading, refetch, fetchNextPage, isRefetching, hasNextPage } =
    useInfiniteQuery([`localUsersConnections`], fetchLocalUsers, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 10) return;
        return pages.length;
      },
      // refetchInterval: 100000,
    });

  return {
    data,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  };
};
