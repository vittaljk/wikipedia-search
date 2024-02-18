// Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders button with children', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick callback when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  test('disables button when disabled prop is true', () => {
    const { getByText } = render(<Button onClick={() => {}} disabled>Click me</Button>);
    const buttonElement = getByText('Click me') as HTMLButtonElement;
    expect(buttonElement).toBeDisabled();
  });

  test('does not disable button when disabled prop is false', () => {
    const { getByText } = render(<Button onClick={() => {}} disabled={false}>Click me</Button>);
    const buttonElement = getByText('Click me') as HTMLButtonElement;
    expect(buttonElement).toBeEnabled();
  });
});
