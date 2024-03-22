import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home'; // Replace with your path to Home.js
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Home component', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  it('should update name state when user types in name input', () => {
    render(<Home />);
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(screen.getByTestId('name')).toHaveValue('John Doe'); // Assuming you add data-testid="name" to the name input
  });

  it('should update room code state when user types in room code input', () => {
    render(<Home />);
    const roomCodeInput = screen.getByLabelText(/Enter lobby Code/i);
    fireEvent.change(roomCodeInput, { target: { value: '123456' } });
    expect(screen.getByTestId('roomCode')).toHaveValue('123456'); // Assuming you add data-testid="roomCode" to the room code input
  });

  it('should disable submit button when name is empty', () => {
    render(<Home />);
    const submitButton = screen.getByText(/Join Lobby/i);
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button when room code is empty', () => {
    render(<Home />);
    const nameInput = screen.getByLabelText(/Name/i);
    userEvent.type(nameInput, 'John Doe');
    const submitButton = screen.getByText(/Join Lobby/i);
    expect(submitButton).toBeDisabled();
  });

  it('should call navigate with correct path and state on submit', () => {
    render(<Home />);
    const nameInput = screen.getByLabelText(/Name/i);
    const roomCodeInput = screen.getByLabelText(/Enter lobby Code/i);
    const submitButton = screen.getByText(/Join Lobby/i);

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(roomCodeInput, '123456');
    fireEvent.click(submitButton);

    expect(navigate).toHaveBeenCalledWith('/room/123456', { state: { name: 'John Doe' } });
  });
});
