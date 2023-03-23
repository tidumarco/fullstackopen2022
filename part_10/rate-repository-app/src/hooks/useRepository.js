import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SINGLE_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const [repository, setRepository] = useState();
  const [loading, setLoading] = useState(false);

  const {
    data,
    loading: queryLoading,
    error,
    refetch,
  } = useQuery(SINGLE_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    setLoading(queryLoading);
    if (data) {
      console.log("data from useRepository: ", data); // log data to console
      setRepository(data.repository); // make sure the key used here matches the key in the query result
    }
  }, [data, queryLoading]);

  if (error) {
    console.log("Error in useRepository: ", error);
  }

  console.log("loading from useRepository: ", loading); // log loading to console

  return { repository, loading, refetch };
};

export default useRepository;
