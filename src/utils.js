import {
  GRID_SIZE,
  GRID_GAP,
  OBJECT_SIZE,
  GRID_WIDTH,
  GRID_HEIGHT
} from './constants';

export const calculateCoordinates = (pos) => {
  const centerValue = (GRID_SIZE - GRID_GAP - OBJECT_SIZE) / 2;
  return GRID_SIZE * pos + GRID_GAP + centerValue;
}

const randomNumber = (maxNumber) => {
  return Math.floor(Math.random() * Math.floor(maxNumber));
}

export const getRandomY = () => {
  return randomNumber(GRID_HEIGHT);
}

export const getRandomX = () => {
  return randomNumber(GRID_WIDTH);
}
