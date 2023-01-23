import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

export function isHttpServer(sourse: unknown) {
  return sourse instanceof Server;
}

export function isWebSocketServer(sourse: unknown) {
  return sourse instanceof WebSocketServer || sourse instanceof WebSocket;
}

export const getServerTypeName = (source: unknown): string => {
  if (!source) return '';
  if (isHttpServer(source)) return 'HTTP';
  if (isWebSocketServer(source)) return 'WebSocket';
  if (typeof source === 'string') return `WebSocket ${source}`;
  return '';
};
