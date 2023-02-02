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
    born: 1970,
  },
  {
    name: "Curr Handscomb",
    born: 1978,
  },
  {
    name: "Buiron Boar",
    born: 1980,
  },
  {
    name: "Easter Thornthwaite",
    born: 1985,
  },
  {
    name: "Amargo Delleschi",
    born: 1989,
  },
  {
    name: "Mack Cornillot",
    born: 1990,
  },
  {
    name: "Delphinia Malsher",
    born: 1991,
  },
  {
    name: "Shanan Ryott",
    born: 1992,
  },
  {
    name: "Gael Maior",
    born: 1993,
  },
  {
    name: "Jillian Wadeling",
    born: 1994,
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
    bookCount: Int!
    born: Int!
  }
  type Query {
    bookCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: String!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genres) {
        return books;
      }
      if (args.author && args.genres) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genres)
        );
      }
    },
    allAuthors: () => {
      return authors.map((author) => {
        return {
          ...author,
          bookCount: books.filter((book) => book.author === author.name).length,
        };
      });
    },
  },
  Mutation: {
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      return author;
    },
    addBook: (root, args) => {
      const authorExists = authors.some(
        (author) => author.name === args.author
      );
      if (!authorExists) {
        authors.push({ name: args.author });
      }
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
