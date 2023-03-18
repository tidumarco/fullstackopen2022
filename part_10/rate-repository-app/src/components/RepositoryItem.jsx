import React from "react";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "gray",
  },
  language: {
    backgroundColor: "#0366d6",
    color: "white",
    borderRadius: 4,
    padding: 4,
    marginTop: 6,
    alignSelf: "flex-start",
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.fullName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.language}>{item.language}</Text>
      <Text>{`Stars: ${item.stargazersCount}`}</Text>
      <Text>{`Forks: ${item.forksCount}`}</Text>
      <Text>{`Reviews: ${item.reviewCount}`}</Text>
      <Text>{`Rating: ${item.ratingAverage}`}</Text>
    </View>
  );
};

export default RepositoryItem;