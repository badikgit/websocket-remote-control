import { RawData } from 'ws';
import { logError, logInfo } from '../../utils/messages';
import { navigation, draw } from '../services';
// import { printScreenService } from '../../services/printScreenService';

export const messageHandler = async (data: RawData, id: string) => {
  logInfo(`<- ${data}`, id);

  const command = data.toString();

  try {
    if (command.startsWith('mouse')) {
      const res = await navigation(command);
      if (res) logInfo(`-> ${res}`, id);
      return `${(res || command).replace(' ', ' ')}`;
    }

    if (command.startsWith('draw')) {
      draw(command);
      return `${command.replace(' ', '')}`;
    }

    if (command.startsWith('prnt_scrn')) {
      logError(new Error('Service prnt_scrn is not implemented.'), id);
    }
  } catch {
    throw Error('Message handler error.');
  }
  return command.replace(' ', ' ');
};
