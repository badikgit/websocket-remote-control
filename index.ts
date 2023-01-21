// import { mouse } from '@nut-tree/nut-js';
import * as dotenv from 'dotenv';
import { httpServer } from './src/http_server';

dotenv.config();

const HTTP_PORT = process.env.HTTP_PORT || 8181;

httpServer.listen(HTTP_PORT, () => {
  const address = httpServer.address();
  const binding = typeof address === 'string' ? `pipe/socket ${address}` : `port ${address?.port}`;
  const url = new URL(typeof address === 'string' ? address : `http://localhost:${address?.port}`);
  console.log(`[\x1b[32mINFO\x1b[0m] The frontend is running on ${binding}.\n[\x1b[32mINFO\x1b[0m] Check ${url}`);
});
