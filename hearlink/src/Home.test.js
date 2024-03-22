import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './Home'; // Replace with the correct path to your Home component

describe('Home component', () => {
  it('should navigate to the room page when submit button is clicked with values in the text boxes', () => {
    // Mocking the useNavigate function
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(<Home />);
    const nameInput = screen.getByPlaceholderText('Enter Name');
    const roomCodeInput = screen.getByPlaceholderText('Enter Room Code');
    const submitButton = screen.getByText('Join Lobby');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(roomCodeInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    // Assert that the navigate function is called with the correct path and state
    expect(mockNavigate).toHaveBeenCalledWith('/room/123456', { state: { name: 'John Doe' } });
  });
});
