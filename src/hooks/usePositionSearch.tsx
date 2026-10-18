import { useCallback, useMemo, useRef, useState } from 'react';
import { Position } from '../types';
import { createTransform } from '../utils/transform';

type PositionSearch = {
  search: Function;
  filteredPositions: Array<Position>;
};

export function usePositionSearch(initialPositions: Array<Position>): PositionSearch {
  const [query, setQuery] = useState('');
  const timeout = useRef<number | undefined>(undefined);

  // Performing a search is expensive, so we wait until 200ms after the user stops typing to execute the search to avoid unnecessary rerenders
  const debouncedSearch = useCallback((value: string) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setQuery(value), 200);
  }, []);

  const filteredPositions = useMemo(() => {
    const transformPositions: (positions: Array<Position>) => Array<Position> =
      createTransform(query);

    return transformPositions(initialPositions);
  }, [query, initialPositions]);

  return { search: debouncedSearch, filteredPositions };
}
