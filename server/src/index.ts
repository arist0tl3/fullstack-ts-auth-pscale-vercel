import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import mysql, { Connection } from 'mysql2/promise';
import { ApolloServer } from 'apollo-server-express';
import knex from 'knex';

import schema from 'data/schema';
import { DbQuery } from 'types/db';

import getUser from './utils/getUser';
import stripBearerFromAuthHeader from './utils/stripBearerFromAuthHeader';

const { DATABASE_URL } = process.env;

// Create express app
const app = express();

// Placeholder for our db connection
let connection: Connection;

const init = async () => {
  console.log('init');
  try {
    // Ensure we have a url to connect to
    if (!DATABASE_URL) throw new Error('Missing DATABASE_URL');

    const kdb = knex({
      client: 'mysql2',
      connection: DATABASE_URL,
    });

    // Establish the connection
    if (!connection) {
      connection = await mysql.createConnection({
        connectTimeout: 30000,
        uri: DATABASE_URL,
      });
      await connection.connect();
    }

    // Create a specific exec that allows for typing
    const db = {
      execute: async <T>(query: string, params?: Array<any>): Promise<[T, any]> => connection.execute<DbQuery<T>>(query, params),
    };

    const server = new ApolloServer({
      context: async ({ req }) => {
        const authHeader = req?.headers?.authorization || '';
        const token = stripBearerFromAuthHeader(authHeader);

        if (!token) {
          return {
            ...req,
            db,
            kdb,
          };
        }

        const currentUser = await getUser(token, kdb);

        return {
          ...req,
          db,
          kdb,
          currentUser,
        };
      },
      playground: true,
      schema,
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
  } catch (err) {
    console.log('Error initializing server: ', err.toString());
  }
};

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');

  if (connection) {
    connection.destroy();
    process.kill(process.pid, 'SIGUSR2');
    process.exit(0);
  }

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.kill(process.pid, 'SIGUSR2');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.once('SIGUSR2', shutDown);

init();

export default app;
