import 'reflect-metadata';

import app from './app';
import { logger } from './common/logger';
import { ws } from './service/middleware/socket';

const bootstrapAsync = async () => {
  try {
    const server = await app.init();

    // Initialisation socket à supprimer si non utilisé
    ws.init(server);
  } catch (error) {
    logger.error(error);
  }
};

bootstrapAsync();
