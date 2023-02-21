import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query AllAuthors {
    allBooks {
      title
      published
      id
      author {
        name
      }
    }
  }
`;
export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;
