import { getServerTypeName } from '..';

export const logInfo = (message: string, sourse?: unknown) => console.log(`[\x1b[32mINFO${sourse ? ` ${getServerTypeName(sourse)}` : ''}\x1b[0m] ${message}`);

export const logError = (error?: Error | null, sourse?: unknown) => error
  && console.log(`[\x1b[31mERROR${sourse ? ` ${getServerTypeName(sourse)}` : ''}\x1b[0m] ${error}`);
