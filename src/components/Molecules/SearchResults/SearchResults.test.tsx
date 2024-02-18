// SearchResults.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import SearchResults from '@/components/Molecules/SearchResults';

describe('SearchResults component', () => {
    test('renders search results', () => {
        const mockResults = [
            { title: 'Result 1', snippet: 'Snippet 1', timestamp: '2024-02-16T22:50:19Z' },
            { title: 'Result 2', snippet: 'Snippet 2', timestamp: '2024-02-16T22:50:20Z' },
            { title: 'Result 3', snippet: 'Snippet 3', timestamp: '2024-02-16T22:50:21Z' },
        ];
        const { getAllByTestId } = render(<SearchResults results={mockResults} />);
        const searchResultElements = getAllByTestId('search-result');
        expect(searchResultElements.length).toBe(mockResults.length);
    });
});
