import React from "react";
import { screen, render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      const name = screen.getAllByTestId("name");
      const description = screen.getAllByTestId("description");
      const language = screen.getAllByTestId("language");
      const stars = screen.getAllByTestId("stars");
      const forks = screen.getAllByTestId("forks");
      const rating = screen.getAllByTestId("rating");
      const reviews = screen.getAllByTestId("reviews");
      const [firstRepositoryName, secondRepositoryName] = name;
      const [firstRepositoryDescription, secondRepositoryDescription] =
        description;
      const [firstRepositoryLanguage, secondRepositoryLanguage] = language;
      const [firstRepositoryStars, secondRepositoryStars] = stars;
      const [firstRepositoryForks, secondRepositoryForks] = forks;
      const [firstRepositoryRating, secondRepositoryRating] = rating;

      const [firstRepositoryReviews, secondRepositoryReviews] = reviews;

      expect(firstRepositoryItem).toBeDefined();
      expect(secondRepositoryItem).toBeDefined();
      expect(firstRepositoryName).toHaveTextContent("jaredpalmer/formik");
      expect(secondRepositoryName).toHaveTextContent(
        "async-library/react-async"
      );
      expect(firstRepositoryDescription).toHaveTextContent(
        "Build forms in React, without the tears"
      );
      expect(secondRepositoryDescription).toHaveTextContent(
        "Flexible promise-based React data loader"
      );
      expect(firstRepositoryLanguage).toHaveTextContent("TypeScript");
      expect(secondRepositoryLanguage).toHaveTextContent("JavaScript");
      expect(firstRepositoryStars).toHaveTextContent("21.9k");
      expect(secondRepositoryStars).toHaveTextContent("1.8k");
      expect(firstRepositoryForks).toHaveTextContent("1.6k");
      expect(secondRepositoryForks).toHaveTextContent("69");
      expect(firstRepositoryRating).toHaveTextContent("88");
      expect(secondRepositoryRating).toHaveTextContent("72");
      expect(firstRepositoryReviews).toHaveTextContent("3");
      expect(secondRepositoryReviews).toHaveTextContent("3");
    });
  });
});
