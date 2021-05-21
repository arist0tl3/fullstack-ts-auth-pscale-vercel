import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import mysql from 'mysql2/promise';
import { ApolloServer } from 'apollo-server-express';

import resolvers from './data/resolvers';
import typeDefs from './data/typeDefs';

const { DATABASE_URL } = process.env;

// Create express app
const app = express();

const init = async () => {
  // Ensure we have a url to connect to
  if (!DATABASE_URL) throw new Error('Missing DATABASE_URL');

  // Establish the connection
  const connection = await mysql.createConnection(DATABASE_URL);
  await connection.connect();

  const server = new ApolloServer({
    context: { db: connection },
    playground: true,
    typeDefs,
    resolvers,
  });

  await server.start();

  // Use process.env as default
  const PORT = process.env.PORT || 3000;

  // Whitelist all routes with cors
  app.use(cors());

  // Use express json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Make sure no responses are getting cached
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  });

  // Enable gzip compression
  app.use(compression());

  server.applyMiddleware({ app });

  // Start server
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port ${PORT}`);
  });
};

init();

export default app;
