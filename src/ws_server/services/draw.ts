import {
  mouse, Button, Point, left, right, down, up,
} from '@nut-tree/nut-js';
import { DRAWING } from './constants';

const { CIRCLE, RECTANGLE, SQUARE } = DRAWING;

const drawRectangle = async (height: number, width: number) => {
  const { x, y } = await mouse.getPosition();
  await mouse.pressButton(Button.LEFT);
  const topLine = await right(width);
  const rightLine = (await down(height)).map((point) => new Point(point.x + width, point.y));
  const bottomLine = (await left(width))
    .map((point) => new Point(point.x + width, point.y + height));
  const leftLine = (await up(height))
    .map((point) => new Point(point.x, point.y + height));
  const steps = [...topLine, ...rightLine, ...bottomLine, ...leftLine];
  await mouse.move(steps);
  await mouse.releaseButton(Button.LEFT);
  await mouse.setPosition(new Point(x + 1, y + 1));
};

const curryCircleCoordinates = async (radius: number) => {
  const { x, y } = await mouse.getPosition();
  const h = x - radius * Math.cos(0);
  const k = y - radius * Math.sin(0);

  return (theta: number) => {
    const rad = (theta * Math.PI) / 180;
    const nextX = h + radius * Math.cos(rad);
    const nextY = k + radius * Math.sin(rad);
    return [nextX, nextY];
  };
};

const drawCircle = async (radius: number) => {
  await mouse.pressButton(Button.LEFT);

  const getCircleCoordinate = curryCircleCoordinates(radius);
  let theta = 0;

  while (theta <= 360) {
    // eslint-disable-next-line no-await-in-loop
    const [nextX, nextY] = (await getCircleCoordinate)(theta);
    // eslint-disable-next-line no-await-in-loop
    await mouse.move([new Point(nextX, nextY)]);
    theta += 0.5;
  }

  await mouse.releaseButton(Button.LEFT);
};

export const draw = (data: string) => {
  const [command, width, height] = data.split(' ');

  if (!command) {
    return;
  }

  mouse.config.mouseSpeed = 500;

  switch (command) {
    case CIRCLE:
      drawCircle(+width);
      break;
    case RECTANGLE:
      drawRectangle(+width, +height);
      break;
    case SQUARE:
      drawRectangle(+width, +width);
      break;
    default:
      break;
  }
};
