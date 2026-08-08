import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeToggle from '@/components/theme-toggle';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    resolvedTheme: 'light',
    setTheme: jest.fn(),
  })),
}));

describe('ThemeToggle', () => {
  it('renders a button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has accessible aria-label for light mode', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('renders moon icon in light mode', () => {
    const { container } = render(<ThemeToggle />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct button styling', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('rounded-md');
    expect(button.className).toContain('w-8');
    expect(button.className).toContain('h-8');
  });
});
