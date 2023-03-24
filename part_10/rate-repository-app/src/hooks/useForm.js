import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { SINGLE_REPOSITORY } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useForm = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const createReview = async ({
    ownerName,
    repositoryName,
    rating,
    text,
    repositoryId,
  }) => {
    const { data } = await mutate({
      variables: {
        review: { repositoryName, ownerName, rating: Number(rating), text },
      },
      refetchQueries: [
        { query: SINGLE_REPOSITORY, variables: { id: repositoryId } },
      ],
    });
    await authStorage.setAccessToken(data.createReview.accessToken);
    apolloClient.resetStore();
    console.log("DATA FROM createReview", data);

    return data;
  };

  return [createReview, result];
};

export default useForm;
