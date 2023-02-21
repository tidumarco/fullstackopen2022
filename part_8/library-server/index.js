const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Query {
    bookCount: Int!
	authorCount: Int!
	allBooks(author: String, genre: String): [Book!]!
	allAuthors: [Author!]!
  }

  type Author {
	name: String!
	born: Int
	id: ID!
	bookCount: Int!
 }

  type Book {
	title: String!
	published: Int!
	author: Author!
	id: ID!
	genres: [String!]!
}

type Mutation {
	addBook(
	  title: String!
	  author: String!
	  published: Int!
	  genres: [String!]!
	): Book!
	editAuthor(name: String!, setBornTo: Int!): Author
  }
	  
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      //   if (args.author && args.genre) {
      //     return books.filter(
      //       (book) =>
      //         book.author === args.author && book.genres.includes(args.genre)
      //     );
      //   } else if (args.author) {
      //     return books.filter((book) => book.author === args.author);
      //   } else if (args.genre) {
      //     return books.filter((book) => book.genres.includes(args.genre));
      //   }
      //   return books;
      return Book.find({});
    },
    allAuthors: async (root, args) => {
      //   return authors.map((author) => ({
      //     ...author,
      //     bookCount: books.filter((book) => book.author === author.name).length,
      //   }));
      return Author.find({});
    },
  },
  //   Book: {
  //     author: async (root) => {
  //       return Author.findOne((author) => author.name === root.author);
  //     },
  //   },
  Mutation: {
    addBook: (root, args) => {
      const author = authors.find((a) => a.name === args.author);
      if (!author) {
        const newAuthor = { name: args.author, id: uuid() };
        authors.push(newAuthor);
        const newBookAuthor = { name: newAuthor.name };
        const newBook = { ...args, id: uuid(), author: newBookAuthor.name };
        books.push(newBook);

        console.log(newBookAuthor);
        return newBook;
      }

      const newBook = { ...args, id: uuid(), author };
      books.push(newBook);

      return newBook;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );

      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
