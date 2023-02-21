const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// const { v1: uuid } = require("uuid");

// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ];

// let books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "The Demon ",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"],
//   },
// ];

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
