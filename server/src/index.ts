import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import compression from 'compression';

const app = express();

// Use process.env as default
const PORT = process.env.PORT || 3333;

// Whitelist all routes with cors
app.use(cors());

// Use express json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make sure no responses are getting cached
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// Enable gzip compression
app.use(compression());

// Define our routes
app.get('/', (req, res) => {
  res.status(200).json({ hello: 'world' });
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
