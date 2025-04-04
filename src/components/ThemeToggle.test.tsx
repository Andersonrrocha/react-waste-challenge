import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('renders correctly', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles theme on click', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Initial state (light mode)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to toggle to dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Click to toggle back to light mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('shows correct aria-label', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Initial state
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');

    // After toggle
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});
