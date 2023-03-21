import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NativeRouter } from "react-router-native";
import font from "./font";
import { ApolloProvider } from "@apollo/client";
import Constants from "expo-constants";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

const apolloClient = createApolloClient();

const styles = StyleSheet.create({
  text: {
    ...font,
    fontSize: 16,
    color: "#000",
  },
});
function App() {
  console.log(Constants.manifest.extra.env);
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main style={styles.text} />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}

export default App;
