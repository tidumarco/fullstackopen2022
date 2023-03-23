import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  columnContainer: {
    flexDirection: "column",
    flexGrow: 1,
    paddingLeft: 15,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  languageText: {
    color: "white",
  },
  countText: {
    marginTop: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = item;

  const formatCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexContainer}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.columnContainer}>
          <Text testID="name" fontWeight="bold" fontSize="subheading">
            {fullName}
          </Text>

          <Text testID="description" color="textSecondary" numberOfLines={3}>
            {description}
          </Text>

          <View style={styles.languageContainer}>
            <Text testID="language" style={styles.languageText}>
              {language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.columnContainer}>
          <Text testID="stars" style={styles.countText} fontWeight="bold">
            {formatCount(stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text testID="forks" style={styles.countText} fontWeight="bold">
            {formatCount(forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text testID="rating" style={styles.countText} fontWeight="bold">
            {ratingAverage}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text testID="reviews" style={styles.countText} fontWeight="bold">
            {reviewCount}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
