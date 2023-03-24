import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Pressable, ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-native";
import React from "react";
import { ME } from "../graphql/queries";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

async function clearAsyncStorage() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log("Failed to clear AsyncStorage:", e);
  }
}
clearAsyncStorage();

const AppBar = () => {
  const { data, loading } = useQuery(ME);

  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("auth:accessToken");
    apolloClient.resetStore();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable style={{ paddingHorizontal: 10 }}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        {data && data.me ? (
          <>
            <Pressable
              style={{ paddingHorizontal: 10 }}
              onPress={handleSignOut}
            >
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
            <Pressable style={{ paddingHorizontal: 10 }}>
              <Link to="/review">
                <Text style={styles.text}>Create a review</Text>
              </Link>
            </Pressable>
          </>
        ) : (
          <Pressable style={{ paddingHorizontal: 10 }}>
            <Link to="/signin">
              <Text style={styles.text}>Sign in</Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
