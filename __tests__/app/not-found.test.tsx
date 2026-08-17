import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('NotFound', () => {
  it('renders 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
  });

  it('renders error description', () => {
    render(<NotFound />);
    expect(screen.getByText(/You are trying to access a page that does not exist/)).toBeInTheDocument();
  });

  it('renders go home link', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: /Go home/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('go home link has arrow', () => {
    render(<NotFound />);
    expect(screen.getByText(/← Go home/)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
