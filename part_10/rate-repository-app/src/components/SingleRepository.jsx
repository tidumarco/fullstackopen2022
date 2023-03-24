import React from "react";
import {
  Linking,
  Image,
  Pressable,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import useReviews from "../hooks/useReviews";
import theme from "../theme";

const size = 50;
const borderRadius = size / 2;

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
  githubContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  githubText: {
    color: "white",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: "center",
  },
  ratingContainer: {
    width: size,
    height: size,
    borderRadius: borderRadius,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 10,
  },
  reviewContainer: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryInfo = ({ repository }) => {
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
    <View style={styles.container}>
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
      </View>
      <Pressable style={styles.githubContainer} onPress={handleOpenInGitHub}>
        <Text style={styles.githubText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text
          fontWeight={styles.reviewContainer.fontWeight}
          fontSize={styles.reviewContainer.fontSize}
          font
        >
          {review.user.username}
        </Text>
        <Text>{review.createdAt}</Text>
        <Text color="textSecondary" numberOfLines={3}>
          {review.text}
        </Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading: repositoryLoading } = useRepository(id);
  const { reviews, loading: reviewsLoading } = useReviews(id);

  if (repositoryLoading || reviewsLoading) {
    return <p>Loading...</p>;
  }

  if (!repository) {
    return <p>Repository or reviews not found</p>;
  }

  const reviewsNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <>
      <FlatList
        data={reviewsNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <>
            <RepositoryInfo repository={repository} />
            <View style={styles.separator} />
          </>
        )}
      />
    </>
  );
};

export default SingleRepository;
