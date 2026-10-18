import type { Position } from '../types';

export function createTransform(
  _searchText: string,
): (positions: Array<Position>) => Array<Position> {
  const searchText = _searchText.toLowerCase();

  const getPriority = (position: Position): number => {
    const ticker = position.ticker.toLowerCase();
    const name = position.name.toLowerCase();

    if (ticker === searchText) return 0;
    if (ticker.startsWith(searchText)) return 1;
    if (name.startsWith(searchText)) return 2;
    return 3;
  };

  function transformPositions(positions: Array<Position>): Array<Position> {
    if (!searchText) {
      return positions;
    }

    return positions
      .map((position, index) => ({ ...position, index }))
      .filter((position) => {
        const ticker = position.ticker.toLowerCase();
        const name = position.name.toLowerCase();

        return ticker.startsWith(searchText) || name.includes(searchText);
      })
      .sort((a, b) => {
        const priorityDiff = getPriority(a) - getPriority(b);

        return priorityDiff !== 0 ? priorityDiff : a.index - b.index;
      })
      .map(({ index, ...position }) => ({ ...position }));
  }

  return transformPositions;
}
