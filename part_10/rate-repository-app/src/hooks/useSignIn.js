import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    console.log("DATA FROM signIng", data);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
