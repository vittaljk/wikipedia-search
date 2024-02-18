// SearchResult.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import SearchResult from './SearchResult';

describe('SearchResult component', () => {
  test('renders search result', () => {
    const result = {
      title: 'Result Title',
      snippet: 'Result Snippet',
      wordcount: 10,
      timestamp: '2024-02-16T22:50:19Z',
    };
    const { getByText } = render(<SearchResult result={result} />);
    expect(getByText('Result Title')).toBeInTheDocument();
    expect(getByText('Result Snippet')).toBeInTheDocument();
    expect(getByText('(10 words)')).toBeInTheDocument();
  });
});
