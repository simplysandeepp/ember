import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsletterSignup from '@/components/newsletter-signup';

jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('NewsletterSignup', () => {
  it('renders the subscribe heading', () => {
    render(<NewsletterSignup />);
    expect(screen.getByRole('heading', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<NewsletterSignup />);
    expect(screen.getByText(/Want an email when I publish/)).toBeInTheDocument();
  });

  it('renders subscribe button linking to tally URL', () => {
    render(<NewsletterSignup />);
    const link = screen.getByRole('link', { name: /Subscribe/i });
    expect(link).toHaveAttribute('href', 'https://tally.so/r/rjpAAl');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders arrow icon', () => {
    render(<NewsletterSignup />);
    expect(screen.getByText('→')).toBeInTheDocument();
  });
});
