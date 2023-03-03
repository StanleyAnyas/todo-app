import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import React from 'react';
import AddTodo from './AddTodo';

test('renders todotable', () => {
  const row = [
    {description: "Go to coffee", date: "11.3.2023", time: "08:12", done: false}
  ]
  render(<AddTodo row={row} />);
  const todotableElement = screen.getByText(/Got to coffee/i);
  expect(todotableElement).toBeInTheDocument();
});
