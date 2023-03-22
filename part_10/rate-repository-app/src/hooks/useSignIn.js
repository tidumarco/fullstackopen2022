import { useMutation } from "@apollo/client";
import { useContext } from "react";

import { AUTHENTICATE } from "../graphql/mutations";

import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
