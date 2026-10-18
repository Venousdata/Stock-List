// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { AAPL, AMZN, DIS, WMT } from '../__test__/fixtures';
import { Widget } from './Widget';
import { Position } from '../types';

const searchMock = vi.fn();
const mockSearchInput = vi.fn();
const mockPositionGrid = vi.fn();
const mockPositions: Array<Position> = [AAPL, AMZN, DIS, WMT];

vi.mock('../hooks/usePositionSearch', () => ({
  usePositionSearch: (initialPositions: Array<Position>) => ({
    search: searchMock,
    filteredPositions: initialPositions,
  }),
}));

vi.mock('./SearchInput', () => ({
  SearchInput: (props: { search: Function }) => {
    mockSearchInput(props);
    return <div data-testid="mock-search-input" />;
  },
}));

vi.mock('./PositionGrid', () => ({
  PositionGrid: (props: { positions: Array<Position> }) => {
    mockPositionGrid(props);
    return <div data-testid="mock-position-grid" />;
  },
}));

test('renders SearchInput, passing correct props', async () => {
  render(<Widget positions={mockPositions} />);

  expect(screen.getByTestId('mock-search-input')).toBeTruthy();
  expect(mockSearchInput).toHaveBeenCalledWith({ search: searchMock });
});

test('renders PositionGrid, passing correct props', async () => {
  render(<Widget positions={mockPositions} />);

  expect(screen.getByTestId('mock-position-grid')).toBeTruthy();
  expect(mockPositionGrid).toHaveBeenCalledWith({ positions: mockPositions });
});
