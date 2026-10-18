import type { Position } from '../types';
import { PositionGrid } from './PositionGrid';
import { SearchInput } from './SearchInput';
import { usePositionSearch } from '../hooks/usePositionSearch';

import './Widget.css';

export interface WidgetProps {
  positions: Array<Position>;
}

export function Widget(props: WidgetProps) {
  const { positions } = props;
  const { search, filteredPositions } = usePositionSearch(positions);

  return (
    <div className="Widget">
      <SearchInput search={search} />
      <PositionGrid positions={filteredPositions} />
    </div>
  );
}
