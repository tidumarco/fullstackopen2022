import React from "react";
import { View, Image, Pressable } from "react-native";
import Text from "./Text";
import styles from "../styles";

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
