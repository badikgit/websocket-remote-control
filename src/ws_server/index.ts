import * as dotenv from 'dotenv';
import { WebSocketServer, createWebSocketStream, WebSocket } from 'ws';
import { logError, logInfo } from '../utils/messages';
import { messageHandler } from './handlers';

dotenv.config();

const WS_PORT = Number(process.env.WS_PORT) || 8080;

export const wsServer = new WebSocketServer({ port: WS_PORT })
  .on('connection', (webSocket: WebSocket) => {
    const id = Math.random().toString().slice(2);
    wsServer.clients.add(webSocket);
    logInfo(`New WebSocket connection: ${id}`, webSocket);

    const wsStream: ReturnType<typeof createWebSocketStream> = createWebSocketStream(webSocket, {
      decodeStrings: false,
    });
    wsStream.on('data', async (data) => wsStream.write(await messageHandler(data, id), (err) => logError(err, id)));

    webSocket.on('close', () => {
      logInfo(`WebSocket connection is closed: ${id}`, webSocket);
      wsServer.clients.delete(webSocket);
    });

    webSocket.on('error', (err) => logError(err, id));
  })
  .on('close', () => {
    logInfo('Closing the Web Socket Server.');
  });
