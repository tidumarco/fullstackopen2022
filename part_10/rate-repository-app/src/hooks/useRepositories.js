import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const {
    data,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    setLoading(queryLoading);
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data, queryLoading]);

  return { repositories, loading, refetch };
};

export default useRepositories;
