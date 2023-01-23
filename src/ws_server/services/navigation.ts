import {
  mouse, left, right, up, down,
} from '@nut-tree/nut-js';
import { NAVIGATION } from './constants';

const {
  LEFT, RIGHT, UP, DOWN, POSITION,
} = NAVIGATION;

export const navigation = async (data: string) => {
  const [command, px] = data.split(' ');
  const numPx = Number(px);

  if (!command) {
    return null;
  }

  let response = null;

  switch (command) {
    case LEFT: {
      await mouse.move(await left(numPx));
      break;
    }
    case RIGHT: {
      await mouse.move(await right(numPx));
      break;
    }
    case UP: {
      await mouse.move(await up(numPx));
      break;
    }
    case DOWN: {
      await mouse.move(await down(numPx));
      break;
    }
    default: {
      const { x, y } = await mouse.getPosition();
      response = `${POSITION} ${x},${y}`;
      break;
    }
  }

  return response;
};
