import { render, screen } from '@testing-library/react';
import App from './App';

test('renders inital page succesfully', () => {
  render(<App />);
  const emptyStateElement = screen.getByText(/Draw a card to start the game/i);
  const ctaElement = screen.getByText(/Draw card/i);
  expect(emptyStateElement).toBeInTheDocument();
  expect(ctaElement).toBeInTheDocument();
});
