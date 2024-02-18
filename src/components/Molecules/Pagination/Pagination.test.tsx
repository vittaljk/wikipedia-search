// Pagination.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const onPageChangeMock = jest.fn();

  afterEach(() => {
    onPageChangeMock.mockClear();
  });

  test('renders with correct start and end indices', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalResults={100}
        recordsPerPage={10}
        onPageChange={onPageChangeMock}
      />
    );

    const resultsText = getByText('Results 1 – 10 of 100');
    expect(resultsText).toBeInTheDocument();
  });

  test('disables previous button on first page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalResults={100}
        recordsPerPage={10}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = getByText('Previous');
    fireEvent.click(prevButton);
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  test('disables next button on last page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={10}
        totalResults={100}
        recordsPerPage={10}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  test('calls onPageChange with correct page number when next button is clicked', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalResults={100}
        recordsPerPage={10}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with correct page number when previous button is clicked', () => {
    const { getByText } = render(
      <Pagination
        currentPage={2}
        totalResults={100}
        recordsPerPage={10}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = getByText('Previous');
    fireEvent.click(prevButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });
});
