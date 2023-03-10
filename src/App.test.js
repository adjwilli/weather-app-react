import { render, screen } from '@testing-library/react';
import App from './App';

test('renders intro page', () => {
  render(<App />);
  const introElement = screen.getByText(/to get started/i);
  const currentLocationButton = screen.getByText(/Current location/i);
  expect(introElement).toBeInTheDocument();;
  expect(currentLocationButton).toBeInTheDocument();
});
