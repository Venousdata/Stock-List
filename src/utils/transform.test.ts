import { expect, test } from 'vitest';
import { createTransform } from './transform';
import { createNamedPosition, AAPL, AMZN, DIS, WMT } from '../__test__/fixtures';

test('exports a createTransform function', () => {
  expect(createTransform).toBeInstanceOf(Function);
});

test('returns a function', () => {
  expect(createTransform('')).toBeInstanceOf(Function);
});

test('returns original positions when search string is empty', () => {
  const search = '';
  const transformPositions = createTransform(search);
  const positions = [AAPL, AMZN, DIS, WMT];
  expect(transformPositions(positions)).toBe(positions);
});

test('does not sort two positions with the same priority', () => {
  const search = AAPL.ticker;
  const transformPositions = createTransform(search);
  const positions = [DIS, WMT, AAPL, AAPL];
  expect(transformPositions(positions)[0]).toStrictEqual(AAPL);
  expect(transformPositions(positions)[1]).toStrictEqual(AAPL);
});

test('performs a case insensitive search', () => {
  const search = 'GME';
  const positions = [createNamedPosition(search.toLowerCase(), 'GameStop Corp.', 100)];
  const transformPositions = createTransform(search);
  expect(transformPositions(positions)[0]).toStrictEqual(positions[0]);
});

test('pushes exact matches to top of returned positions. startsWith ticker matches appear next', () => {
  const search = 'GME';
  const positions = [
    createNamedPosition('GME1fdhgedthg', 'GameStop Corp.', 100),
    createNamedPosition(search, 'GameStop Corp.', 100),
  ];
  const transformPositions = createTransform(search);
  expect(transformPositions(positions)[0]).toStrictEqual(positions[1]);
});

test('follows sorting rules when search returns both ticker and name matches.', () => {
  const search = 'test';
  const positions = [
    createNamedPosition('BBVA', 'Stop Corp is test in progress.', 100), // 3
    createNamedPosition(search, 'Stop Corp.', 100), // 0
    createNamedPosition('testSearchStartsWith', 'Game Corp.', 100), //1
    createNamedPosition('RNDM', 'test Corp.', 100), // 2
  ];
  const transformPositions = createTransform(search);
  expect(transformPositions(positions)[0]).toStrictEqual(positions[1]);
  expect(transformPositions(positions)[1]).toStrictEqual(positions[2]);
  expect(transformPositions(positions)[2]).toStrictEqual(positions[3]);
  expect(transformPositions(positions)[3]).toStrictEqual(positions[0]);
});
