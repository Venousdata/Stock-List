// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { AAPL, AMZN, DIS, WMT } from '../__test__/fixtures';
import type { Position } from '../types';
import { usePositionSearch } from './usePositionSearch';

const mockCreateTransform = vi.fn((_query: string) => (positions: Array<Position>) => positions);
const mockPositions: Array<Position> = [AAPL, AMZN, DIS, WMT];

vi.mock('../utils/transform', () => ({
  createTransform: vi.fn((query: string) => mockCreateTransform(query)),
}));

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

test('debounces search by 200ms', () => {
  vi.useFakeTimers();

  const searchQuery = 'AAPL';
  const { result } = renderHook(() => usePositionSearch(mockPositions));

  act(() => {
    result.current.search(searchQuery);
    vi.advanceTimersByTime(199);
  });

  expect(mockCreateTransform).not.toHaveBeenCalledWith(searchQuery);

  act(() => {
    vi.advanceTimersByTime(1);
  });

  expect(mockCreateTransform).toHaveBeenCalledWith(searchQuery);
});
