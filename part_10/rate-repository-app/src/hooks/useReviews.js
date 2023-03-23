import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (id) => {
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(false);

  const {
    data,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_REVIEWS, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    setLoading(queryLoading);
    if (data) {
      setReviews(data.repository.reviews);
    }
  }, [data, queryLoading]);

  return { reviews, loading, refetch };
};

export default useReviews;
