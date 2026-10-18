Questions you may have on my implementation:

- Why a hook?
  I thought this was the easiest/quickest way to share functionality across SearchInput and PositionGrid. SearchInput needed to execute the search, with the results updating PositionGrid, so it made sense to create a hook that returns a search fn and filteredPositions and call it in the shared parent Widget and pass search/filteredPositions down as props

- Why did I prop-drill instead of using context?
  The props are being accessed and used one level down, so that does not warrant creating context/provider.
  If I needed to pass filteredPositions down to a child of PositionGrid, then I'd consider creating a context provider to avoid multi-level prop-drilling.

- Why didn't I test the filter functionality in usePositionSearch?
  Separation of concerns. I already added 100% coverage for the transform util. usePositionSearch's only responsibility is to call the transform function (debounced).. so I only tested that.

- Why didn't I test the filter functionality in SearchInput?
  Again, separation of concerns. SearchInput's only responsibility is to call the search prop when the user types in to the field.

- Was mocking SearchInput/PositionGrid necessary in the Widget tests?
  No, but it's good practice - I only wanted to verify that the components are rendered with the correct props passed. If SearchInput/PositionGrid contained a useEffect that did some action, I wouldn't want to trigger that in the Widget unit test.

- Why the debounce?
  Without the debounce, each keypress triggers a rerender. In practice, we do not want this - you'd typically want the search to execute once you're done typing. I landed on 200ms because I think 500ms is a bit excessive, whereas less than 200ms runs the risk of executing the search before the user is done typing (slow typers).

- Is the transform util as performant as it could be?
  No, it could be improved by:
  1 - Removing the duplicate toLowerCase calls - each call is O(N) where N is the length of ticker/name - could add unnecessary overhead on larger positions lists.

2. Avoid spreading each position in to a new object - just preserve the entire position by adding it as a property instead.
   Although, the final map (line 36) could be seen as optional, since it's only purpose is to remove the index property I added on line 24 - the functionality would still work if I left the index property on the Position.
3. Calculate priority once per position instead of twice per comparison - negligible on smaller arrays, but exponential improvements on larger arrays.
   i.e. expand the map iterator on line 24 with logic to calculate priority so I don't have to do it in the sort on line 31.

- Anything I'd add?
  Besides aforementioned performance improvements..

1. I'd add functionality to enable searching Exposure. At that point, I'd consider turning the transform util in to a Super Search (search query would be matched across all columns/rows dynamically).
2. Adding wildcard functionality, i.e. A?PL and A*L would match the AAPL ticker.
3. Adding numeric operators, i.e. typing >50000 would return results where Exposure is > 50000.
