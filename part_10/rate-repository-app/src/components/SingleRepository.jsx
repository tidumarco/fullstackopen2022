import React from "react";
import { Linking, Image, Pressable, Text, View } from "react-native";
import { useParams } from "react-router-native";
import styles from "../styles";
import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, refetch } = useRepository(id);
  console.log("id from component: ", id);

  console.log("repository from component: ", repository);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!repository) {
    return <p>No repository found</p>;
  }
  const handleOpenInGitHub = () => {
    Linking.openURL(repository.url);
  };

  const formatCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.columnContainer}>
          <Text testID="name" fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>

          <Text testID="description" color="textSecondary" numberOfLines={3}>
            {repository.description}
          </Text>

          <View style={styles.languageContainer}>
            <Text testID="language" style={styles.languageText}>
              {repository.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.columnContainer}>
          <Text testID="stars" style={styles.countText} fontWeight="bold">
            {formatCount(repository.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text testID="forks" style={styles.countText} fontWeight="bold">
            {formatCount(repository.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text testID="rating" style={styles.countText} fontWeight="bold">
            {repository.ratingAverage}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text testID="reviews" style={styles.countText} fontWeight="bold">
            {repository.reviewCount}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <Pressable style={styles.githubContainer} onPress={handleOpenInGitHub}>
          <Text style={styles.githubText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SingleRepository;
