import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import React from 'react';

test('heading display', () => {
  render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
  );
  const linkElement = screen.getByText(/Pet My Dog/i);
  expect(linkElement).toBeInTheDocument();
});
