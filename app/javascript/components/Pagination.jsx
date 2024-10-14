import React from 'react';

export default ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [1];
    const pageRange = 2;

    if (currentPage > pageRange + 2) {
      pages.push('...');
    }

    for (let i = Math.max(2, currentPage - pageRange); i <= Math.min(totalPages - 1, currentPage + pageRange); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - pageRange - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = generatePageNumbers();

  return <>
    <button onClick={handlePrevious} disabled={currentPage === 1}>
      Previous
    </button>
    {pageNumbers.map((page, index) =>
      page === '...' ? (
        <span key={index}>...</span>
      ) : (
        <button
          key={index}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      )
    )}
    <button onClick={handleNext} disabled={currentPage === totalPages}>
      Next
    </button>
  </>
};
