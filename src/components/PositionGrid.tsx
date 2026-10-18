import type { Position } from '../types';

import './PositionGrid.css';

export interface PositionGridProps {
  positions: Array<Position>;
}

export function PositionGrid(props: PositionGridProps) {
  const { positions } = props;
  return (
    <table className="PositionGrid">
      <thead>
        <tr>
          <th className="PositionGrid-ticker">Ticker</th>
          <th className="PositionGrid-name">Name</th>
          <th className="PositionGrid-exposure">Exposure</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => (
          <tr key={position.id}>
            <td className="PositionGrid-ticker">{position.ticker}</td>
            <td className="PositionGrid-name">{position.name}</td>
            <td
              className={`PositionGrid-exposure ${position.exposure < 0 ? 'negative' : 'positive'}`}
            >
              {position.exposure.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
