import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Genre {
    name: String!
  }

  type Studio {
    name: String!
  }

  type Movie {
    name: String!
    duration: String
    studio: Studio
    genres: [Genre]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    movies: [Movie]
    genres: [Genre]
    studios: [Studio]
  }
`;

const suspense = {
  name: 'Suspense',
};
const horror = {
  name: 'Horror',
};
const drama = {
  name: 'Drama',
};
const comedy = {
  name: 'Comedy',
};
const fantasy = {
  name: 'Fantasy',
};
const superhero = {
  name: 'Superhero',
};
const action = {
  name: 'Action',
};
const scyFi = {
  name: 'Scy-fi',
};

const marvel = {
  name: 'Marvel Studios',
};
const warner = {
  name: 'Warner Bros',
};
const twentyCentury = {
  name: '20th Century Studios',
};

export const studios = [
  marvel,
  warner,
  twentyCentury,
];

export const genres = [
  suspense,
  horror,
  drama,
  comedy,
  fantasy,
  superhero,
];

export const movies = [
  {
    name: 'The Avengers',
    duration: '120 minutes',
    studio: marvel,
    genres: [fantasy, drama, superhero]
  },
  {
    name: 'Barbie',
    duration: '133 minutes',
    studio: warner,
    genres: [comedy, drama]
  },
  {
    name: 'The Creator',
    duration: '127 minutes',
    studio: twentyCentury,
    genres: [action, scyFi]
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    movies: () => movies,
    genres: () => genres,
    studios: () => studios,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
