// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { SearchInput } from './SearchInput';

const searchMock = vi.fn();

test('allows the user to enter search text', async () => {
  const user = userEvent.setup();
  render(<SearchInput search={searchMock} />);
  const input = screen.getByRole('searchbox', { name: 'Search for a position' });
  expect(input).toHaveValue('');

  const searchString = 'aapl';
  await user.type(input, searchString);
  expect(input).toHaveValue(searchString);
  expect(searchMock).toHaveBeenCalledWith(searchString);
});
