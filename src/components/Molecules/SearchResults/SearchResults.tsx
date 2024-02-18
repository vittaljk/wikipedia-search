import React, { useRef } from 'react';
import { ISearchResult } from '@/components/Atoms/SearchResult/SearchResult';
import * as Atoms from '@/components/Atoms';
import { useVirtual } from 'react-virtual';

interface SearchResultsProps {
  results: ISearchResult[];
}

const getVirtualRowStyles = ({ size, start }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: size,
  transform: `translateY(${start}px)`,
});

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const listRef = useRef();

  const rowVirtualizer = useVirtual({
    size: results.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 100, []),
    overscan: 10,
  });

  return (
    <div className="grid gap-3 md:gap-5 my-5 relative" ref={listRef}>
      {/* {results.map((result, index) => (
          <Atoms.SearchResult key={result.timestamp + index} result={result} />
        ))} */}
      <div style={{ height: rowVirtualizer.totalSize }}>
        {rowVirtualizer.virtualItems.map(({ index, size, start }) => {
          const item = results[index];
          if (!item) return null;
          return (
            <div
              style={getVirtualRowStyles({ size, start })}
              key={item.timestamp + index}
            >
              <Atoms.SearchResult result={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
