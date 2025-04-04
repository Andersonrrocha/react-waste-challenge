import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { Skip } from '../hooks/useSkips';
import { SelectedSkipProvider } from '../contexts/SelectedSkipContext';

const mockSkip: Skip = {
  id: '1',
  size: 4,
  price_before_vat: 277.95,
  hire_period_days: 14,
  allowed_on_road: true,
  allows_heavy_waste: true,
  transport_cost: 50,
  per_tonne_cost: 25,
  vat: 20,
  postcode: 'SW1A 1AA',
  area: 'London',
  forbidden: false,
  created_at: '2024-03-19T12:00:00Z',
  updated_at: '2024-03-19T12:00:00Z',
};

const mockDisabledSkip: Skip = {
  ...mockSkip,
  allowed_on_road: false,
  allows_heavy_waste: false,
};

const renderWithProvider = (component: React.ReactNode) => {
  return render(<SelectedSkipProvider>{component}</SelectedSkipProvider>);
};

describe('Card', () => {
  beforeEach(() => {
    // Mock the image to prevent loading errors
    // @ts-expect-error - Intentionally providing minimal Image mock
    global.Image = function () {
      return {
        onload: () => {},
        src: '',
      };
    };
  });

  it('renders skip information correctly', () => {
    renderWithProvider(<Card skip={mockSkip} />);

    expect(screen.getByText(`${mockSkip.size} yard skip`)).toBeInTheDocument();
    expect(screen.getByText(`£${mockSkip.price_before_vat}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockSkip.hire_period_days} day hire period`)).toBeInTheDocument();
  });

  it('shows disabled state when skip is not allowed on road', () => {
    renderWithProvider(<Card skip={mockDisabledSkip} />);

    expect(screen.getByText('Private Property Only')).toBeInTheDocument();
    expect(screen.getByText('Not Suitable for Heavy Waste')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Not available' })).toBeDisabled();
  });

  it('handles selection correctly', () => {
    renderWithProvider(<Card skip={mockSkip} />);
    const selectButton = screen.getByRole('button', { name: 'Select this skip' });

    // Initial state
    expect(selectButton).toHaveTextContent('SELECT THIS SKIP');

    // Click to select
    fireEvent.click(selectButton);
    expect(screen.getByRole('button', { name: 'Skip selected' })).toHaveTextContent(
      'SKIP SELECTED'
    );
  });

  it('is keyboard accessible', () => {
    renderWithProvider(<Card skip={mockSkip} />);
    const card = screen.getByRole('button', { name: 'Select this skip' });
    const cardContainer = card.closest('.skip-card');

    expect(cardContainer).toHaveAttribute('tabIndex', '0');
    expect(cardContainer).toHaveAttribute('role', 'button');

    // Test keyboard interaction
    fireEvent.keyDown(cardContainer!, { key: 'Enter' });
    expect(cardContainer).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(cardContainer!, { key: ' ' });
    expect(cardContainer).toHaveAttribute('aria-selected', 'false');
  });
});
