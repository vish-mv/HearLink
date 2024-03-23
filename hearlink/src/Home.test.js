import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // or whichever router you are using
import Home from './Home'; // Adjust the path as per your project structure

test('renders Home component without crashing', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
});
