import { Server } from 'socket.io';

import { logger } from '../../common/logger';
import { configs } from '../../data/constants/configs';

class WebSocket {
  private static io = new Server();

  init(server) {
    WebSocket.io.listen(server, { cors: { origin: '*' } });
    this.setOnConnectionHandler();
  }

  get socket() {
    return WebSocket.io;
  }

  private setOnConnectionHandler = () => {
    logger.info('WS initialized');
    WebSocket.io.on('connection', async (socket) => {
      const { token } = socket.handshake.query;

      try {
        const { verifyToken } = await import('./passport/passport-local');
        const { utilisateurSA } = await import('../applicatif/utilisateur/utilisateur.sa');
        const { id: utilisateurId } = await verifyToken(`${token}`, configs.jwtSecret);

        await utilisateurSA.updateSocketId(utilisateurId, socket.id);
      } catch (error) {
        socket.disconnect();
      }
      logger.info(`New user: ${socket.id}`);
    });
  };
}

export const ws = new WebSocket();
