const {ApolloServer, UserInputError, AuthenticationError, gql} = require('apollo-server');
const {v1: uuid} = require('uuid');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

require('dotenv').config();

mongoose.set('useFindAndModify', false);

console.log('conneting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('🦸 connected to MongoDB');
  })
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

const typeDefs = gql`
  type Books {
    title: String!
    published: Int
    author: Author!
    genres: [String]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenres: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]!
    ): Books
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!,
      favoriteGenres: String!
    ): User
    login(
      username: String!,
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      // TODO filtri rifattorizzati per MongoDb
      // if (!args.author && args.genre) {
      //   return books.filter((book) => book.genres.includes(args.genre));
      // } else if (!args.genre && args.author) {
      //   return books.filter((book) => book.author === args.author);
      // } else if (args.author && args.genre) {
      //   const authorFiltered = books.filter(
      //     (book) => book.author === args.author
      //   );
      //   return authorFiltered.filter((book) =>
      //     book.genres.includes(args.genre)
      //   );
      // }
      if (!args.author && args.genre) {
        return Book.find({genres: args.genre}).populate('author');
      } else if (!args.genre && args.author) {
        return Book.find({author: args.author}).populate('author');
      } else if (args.author && args.genre) {
        console.log('marameo')
        return Book.find({genres: args.genre, author: args.author}).populate('author');
      }
      return Book.find({}).populate('author');
    },
    allAuthors: () => Author.find({}),
    me: async (root, args, context) => {
      return await context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const bookByAuthor = await Book.find({
        author: {
          $in: [root._id]
        }
      });

      return bookByAuthor.length;
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = {};
      const checkAuthor = await Author.find({
        name: {
          $in: [args.author]
        }
      });

      if (!checkAuthor[0]) {
        author = new Author({name: args.author});
      } else {
        author = checkAuthor[0];
      }

      const newBook = {
        ...args,
        author: author._id
      };

      const book = new Book(newBook);

      try {
        await author.save();
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      return book;
    },

    editAuthor: async (root, args, {currentUser}) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({name: args.name});

      if (!author) {
        throw new UserInputError("Author doesn't exist");
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      return author;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenres: args.favoriteGenres
      });

      return user.save()
        .catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
});

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});

