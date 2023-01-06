import { render, screen } from '@testing-library/react';
import Weather from './Weather';
import location from '../models/location';

test('renders intro page', () => {
  render(<Weather location=""/>);
  const introElement = screen.getByText(/to get started/i);
  const currentLocationButton = screen.getByText(/Current location/i);
  expect(introElement).toBeInTheDocument();;
  expect(currentLocationButton).toBeInTheDocument();
});
