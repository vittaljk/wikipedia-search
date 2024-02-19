import React, { useState, useEffect } from 'react';
import * as Molecules from '@/components/Molecules';
import { useDebounce } from 'usehooks-ts';
import { getWikiSearchData } from '@/services';

function SearchPanel() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [total, setSearchTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(100);
  const [searchHistory, setSearchHistory] = useState([]);

  const debouncedSearchTextValue = useDebounce<string>(searchText, 500);

  function updateSearchText(value: string) {
    setSearchText(value);
  }

  function addToSearchHistory(searchQuery: string) {
    setSearchHistory(prevHistory => [...prevHistory, searchQuery]);
  };

  async function submitSearch(offset = 0, recordsPerPage = 100) {
    try {
      const response = await getWikiSearchData(
        searchText,
        offset,
        recordsPerPage,
      );
      if (response && response.data && response.data.query) {
        setSearchResults(response.data.query.search);
        setSearchTotal(response.data.query.searchinfo.totalhits);
        addToSearchHistory(searchText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchText && searchText.length >= 3) {
      submitSearch();
    }
  }, [debouncedSearchTextValue]);

  function handleOnPageChange(page: number) {
    setCurrentPage(page);
    submitSearch((page - 1) * recordsPerPage);
  }

  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = parseInt(e.target.value, 10);
    setRecordsPerPage(selectedValue);
    submitSearch((currentPage - 1) * recordsPerPage, selectedValue);
  };

  return (
    <div>
      <Molecules.SearchForm
        value={searchText}
        onChange={updateSearchText}
        onSubmit={submitSearch}
      />
      <div className="my-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        Sorting by relevance
      </div>
      {searchResults.length > 0 ? (
        <>
          <div className="my-2">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
          <Molecules.Pagination
            currentPage={currentPage}
            totalResults={total}
            recordsPerPage={recordsPerPage}
            onPageChange={handleOnPageChange}
          />
          <Molecules.SearchResults results={searchResults} />
          <Molecules.Pagination
            currentPage={currentPage}
            totalResults={total}
            recordsPerPage={recordsPerPage}
            onPageChange={handleOnPageChange}
          />
        </>
      ) : null}
    </div>
  );
}

export default SearchPanel;
