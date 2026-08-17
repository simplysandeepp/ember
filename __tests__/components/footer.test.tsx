import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/footer';

jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('Footer', () => {
  it('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Sandeep Prajapati`)).toBeInTheDocument();
  });

  it('renders Resume link', () => {
    render(<Footer />);
    const resumeLink = screen.getByText('Resume');
    expect(resumeLink).toHaveAttribute('href', '/resume');
  });

  it('renders Contact link', () => {
    render(<Footer />);
    const contactLink = screen.getByText('Contact');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders GitHub link with correct href', () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/simplysandeepp');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders LinkedIn link with correct href', () => {
    render(<Footer />);
    const linkedinLink = screen.getByLabelText('LinkedIn');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/simplysandeepp');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  it('renders Instagram link with correct href', () => {
    render(<Footer />);
    const instagramLink = screen.getByLabelText('Instagram');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/simplysandeepp');
    expect(instagramLink).toHaveAttribute('target', '_blank');
  });

  it('renders keyboard shortcut hint', () => {
    render(<Footer />);
    expect(screen.getByText('⌘K')).toBeInTheDocument();
    expect(screen.getByText('to search')).toBeInTheDocument();
  });

  it('external links have noopener noreferrer', () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveAttribute('rel', 'me noopener noreferrer');
  });

  it('renders SVG icons for social links', () => {
    const { container } = render(<Footer />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });
});
