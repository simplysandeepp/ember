import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '@/components/logo';

describe('Logo', () => {
  it('renders the S mark', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders wordmark by default', () => {
    render(<Logo />);
    expect(screen.getByText('sp.')).toBeInTheDocument();
  });

  it('hides wordmark when wordmark=false', () => {
    render(<Logo wordmark={false} />);
    expect(screen.queryByText('sp.')).not.toBeInTheDocument();
  });

  it('applies small size classes by default', () => {
    const { container } = render(<Logo />);
    const mark = container.querySelector('svg');
    expect(mark?.className.baseVal).toContain('h-7');
  });

  it('applies large size classes when size=lg', () => {
    const { container } = render(<Logo size="lg" />);
    const mark = container.querySelector('svg');
    expect(mark?.className.baseVal).toContain('h-14');
  });

  it('large logo hides wordmark', () => {
    render(<Logo size="lg" />);
    expect(screen.queryByText('sp.')).not.toBeInTheDocument();
  });

  it('has aria-hidden on SVG', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
