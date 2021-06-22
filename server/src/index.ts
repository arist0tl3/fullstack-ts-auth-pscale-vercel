import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import createKnex from 'knex';
import { Model } from 'objection';

import schema from 'data/schema';

import getUser from 'utils/getUser';
import stripBearerFromAuthHeader from 'utils/stripBearerFromAuthHeader';

const { DATABASE_URL, DEBUG = false } = process.env;

// Create express app
const app = express();

// Ensure we have a url to connect to
if (!DATABASE_URL) throw new Error('Missing DATABASE_URL');

export const knex = createKnex({
  client: 'mysql2',
  connection: DATABASE_URL,
});

Model.knex(knex);

const init = async () => {
  try {
    if (DEBUG) {
      knex.on('query', (query) => {
        console.log(`Executed a query: ${query.sql}`);
      });
    }

    const server = new ApolloServer({
      context: async ({ req }) => {
        const authHeader = req?.headers?.authorization || '';
        const token = stripBearerFromAuthHeader(authHeader);

        if (!token) {
          return {
            ...req,
            knex,
          };
        }

        const currentUser = await getUser(token);

        return {
          ...req,
          knex,
          currentUser,
        };
      },
      playground: true,
      schema,
    });

    await server.start();

    // Use process.env as default
    const PORT = process.env.PORT || 3333;

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
  } catch (err) {
    console.log('Error initializing server: ', err.toString());
  }
};

init();

export default app;
