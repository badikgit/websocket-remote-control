import { Server } from 'http';
import { WebSocketServer } from 'ws';
import { isHttpServer, getServerTypeName } from '..';
import { logInfo } from '../messages';

export const serverListening = (server: Server | WebSocketServer) => {
  const address = server.address();
  if (!address) return;

  const serverTypeName = getServerTypeName(server);
  let url: URL | null = null;

  if (isHttpServer(server)) {
    url = new URL(typeof address === 'string' ? address : `http://localhost:${address.port}`);
  }

  const binding = typeof address === 'string' ? `pipe/socket ${address}` : `port ${address.port}`;

  logInfo(`The ${serverTypeName} Server is running on ${binding}`, server);
  if (url) logInfo(`Open \x1b[32m${url}\x1b[0m to establish connection.`, server);
};
