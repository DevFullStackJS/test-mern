import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as cron from 'node-cron';
import { createConnection } from 'typeorm';

import { configs } from './data/constants/configs';
import { logger } from './common/logger';
import { exceptionHandler } from './service/middleware/exception-handler';
import swaggerMiddleware from './service/middleware/swagger';
import { responseFormatter } from './service/middleware/response-formatter';

/**
 * Initialisation du serveur express
 */
class App {
  private app = express();

  public init = async () => {
    try {
      await createConnection();
      await this.initMiddlewares();
      await this.initRoutes();
      this.initCron();
      return this.app.listen(configs.port, () => logger.info(`Listening on ${configs.port}`));
    } catch (error) {
      return Promise.reject(error);
    }
  };

  private initMiddlewares = async () => {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    // this.app.use(helmet());
    swaggerMiddleware.init(this.app);

    const { default: passport } = await import('./service/middleware/passport');
    this.app.use(passport.initialize());
  };

  private initRoutes = async () => {
    const { appRouter } = await import('./infrastructure/route/app.route');
    this.app.use('/api', appRouter, responseFormatter);
    // this.app.use(express.static(path.resolve(__dirname, '../public/')));
    this.app.use(express.static(path.resolve(__dirname, '../bo/')));
    this.app.use('/public', express.static(path.resolve(__dirname, '../public')));

    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../', '/bo/index.html'));
    });

    // Doit être le dernier à être appelé
    this.app.use(exceptionHandler);
  };

  /**
   * Initialiser les CRONs
   */
  private initCron() {
  }
}

export default new App();
