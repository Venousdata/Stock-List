import { ChangeEvent, useCallback } from 'react';
import './SearchInput.css';

export interface SearchInputProps {
  search: Function;
}

export function SearchInput(_props: SearchInputProps) {
  const { search } = _props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => search(event.target.value),
    [search],
  );

  return (
    <label className="SearchInputLabel">
      <input
        data-testid="search-input"
        className="SearchInput"
        type="search"
        aria-label="Search for a position"
        placeholder="Search"
        role="searchbox"
        name="Search for a position"
        onChange={handleChange}
      />
    </label>
  );
}
