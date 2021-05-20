import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import mysql from 'mysql';

import getUsers from './routes/users/get';
import postUser from './routes/users/post';

const { DATABASE_URL } = process.env;

// Ensure we have a url to connect to
if (!DATABASE_URL) throw new Error('Missing DATABASE_URL');

// Establish the connection
const connection = mysql.createConnection(DATABASE_URL);
connection.connect();

// Create express app
const app = express();

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

// Attach db connection
app.use((req: Request, res: Response, next: NextFunction) => {
  req.ctx = {
    db: connection,
  };

  next();
});

// Define our routes
app.get('/', (req, res) => {
  res.status(200).json({ hello: 'world' });
});

app.get('/users', getUsers);
app.post('/user', postUser);

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
