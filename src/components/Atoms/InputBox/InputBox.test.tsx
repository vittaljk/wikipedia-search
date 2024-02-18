// InputBox.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputBox from './InputBox';

describe('InputBox component', () => {
  test('renders input box with placeholder', () => {
    const { getByPlaceholderText } = render(<InputBox value="" onChange={() => {}} />);
    const inputElement = getByPlaceholderText('Enter search text...');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange callback with sanitized value when input value changes', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<InputBox value="" onChange={onChangeMock} />);
    const inputElement = getByPlaceholderText('Enter search text...');
    fireEvent.change(inputElement, { target: { value: '<script>alert("test")</script>' } });
    expect(onChangeMock).toHaveBeenCalledWith('');
  });
});
