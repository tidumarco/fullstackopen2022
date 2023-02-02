const ApolloServer = require("apollo-server").ApolloServer;
const gql = require("apollo-server").gql;
const UserInputError = require("apollo-server").UserInputError;

const { v1: uuid } = require("uuid");

let books = [
  {
    title: "Mr. Deeds",
    author: "Rocky Van der Beek",
    published: 2002,
    genres: "Comedy|Romance",
  },
  {
    title: "Goofy Movies Number One",
    author: "Curr Handscomb",
    published: 1996,
    genres: "Comedy",
  },
  {
    title: "In Enemy Hands",
    author: "Buiron Boar",
    published: 2004,
    genres: "War",
  },
  {
    title: "Carmen",
    author: "Easter Thornthwaite",
    published: 2004,
    genres: "Drama",
  },
  {
    title: "Breaking Point",
    author: "Amargo Delleschi",
    published: 2001,
    genres: "Thriller",
  },
  {
    title: "Mahoney's Last Stand",
    author: "Delphinia Malsher",
    published: 2010,
    genres: "Drama",
  },
  {
    title: "Candidate, The",
    author: "Delphinia Malsher",
    published: 2005,
    genres: "Drama",
  },
  {
    title: "Alvin and the Chipmunks: The Squeakquel",
    author: "Jillian Wadeling",
    published: 1985,
    genres: "Animation|Children|Comedy|Musical",
  },
  {
    title: "Becket",
    author: "Jillian Wadeling",
    published: 2012,
    genres: "Drama",
  },
  {
    title: "A Kind of America 2",
    author: "Jillian Wadeling",
    published: 2013,
    genres: "Comedy",
  },
];

let authors = [
  {
    name: "Rocky Van der Beek",
  },
  {
    name: "Curr Handscomb",
  },
  {
    name: "Buiron Boar",
  },
  {
    name: "Easter Thornthwaite",
  },
  {
    name: "Amargo Delleschi",
  },
  {
    name: "Mack Cornillot",
  },
  {
    name: "Delphinia Malsher",
  },
  {
    name: "Shanan Ryott",
  },
  {
    name: "Gael Maior",
  },
  {
    name: "Jillian Wadeling",
  },
];

const typeDefs = gql`
  type Book {
    title: String!
    author: String
    published: Int!
    genres: String!
  }
  type Author {
    name: String!
  }

  type Query {
    bookCount: Int!
    allBooks: [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
    allAuthors: () => authors,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
