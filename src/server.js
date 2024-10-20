import express from 'express';
import cors from 'cors';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';

import contactRouter from './routers/contacts.js';
import { env } from './utils/env.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  // app.use(logger);

  app.use(express.json());

  app.use('/contacts', contactRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
