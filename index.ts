// import { mouse } from '@nut-tree/nut-js';
import * as dotenv from 'dotenv';
import { serverListening } from './src/utils/handlers';
import { httpServer } from './src/http_server';
import { wsServer } from './src/ws_server';

dotenv.config();

const HTTP_PORT = process.env.HTTP_PORT || 8181;

httpServer.listen(HTTP_PORT, () => serverListening(httpServer));

wsServer.on('listening', () => serverListening(wsServer));

process.on('SIGINT', () => {
  wsServer.clients.forEach((ws) => ws.close());
  wsServer.close();
  httpServer.close();
  process.exit();
});
