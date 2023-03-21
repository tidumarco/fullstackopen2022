import Constants from "expo-constants";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  //   uri: "http://192.168.101.101:4000/graphql",
  uri: Constants.manifest.extra.env,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
