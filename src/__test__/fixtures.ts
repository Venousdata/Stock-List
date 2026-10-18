import { v4 as uuidv4 } from 'uuid';
import type { Position } from '../types';

// Generate some dummy data
export const AAPL: Position = createNamedPosition('AAPL', 'Apple Inc', 8135012);
export const AMZN: Position = createNamedPosition('AMZN', 'Amazon.com Inc', 4205831);
export const DIS: Position = createNamedPosition('DIS', 'Walt Disney Co', 6156238);
export const WMT: Position = createNamedPosition('WMT', 'Walmart Inc', -7152924);

export function createNamedPosition(
  ticker: string,
  name: string,
  exposure: number = getRandomInteger({ min: -10000000, max: 10000000 }),
): Position {
  return {
    id: uuidv4(),
    ticker,
    name,
    exposure,
  };
}

function getRandomInteger(options: { min: number; max: number }): number {
  const { min, max } = options;
  return Math.round(min + Math.random() * (max - min));
}
