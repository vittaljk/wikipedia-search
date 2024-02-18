import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  recordsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalResults,
  onPageChange,
  recordsPerPage,
}) => {
  const totalPages = Math.ceil(totalResults / recordsPerPage);

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const calculateStartIndex = () => (currentPage - 1) * recordsPerPage + 1;

  const calculateEndIndex = () => {
    const endIndex = currentPage * recordsPerPage;
    return Math.min(endIndex, totalResults);
  };

  const calculateOffset = () => (currentPage - 1) * recordsPerPage;

  return (
    <div className="pagination flex gap-3 items-center">
      <button
        className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        onClick={handlePrevPage}
        disabled={isPrevDisabled}
      >
        Previous
      </button>
      <span className="text-xs">
        Results {calculateStartIndex()} – {calculateEndIndex()} of{' '}
        {totalResults}
      </span>
      <button
        className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        onClick={handleNextPage}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
