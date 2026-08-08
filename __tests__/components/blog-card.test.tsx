import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogCard from '@/components/blog-card';
import type { BlogFrontmatter } from '@/lib/content-types';

const defaultFrontmatter: BlogFrontmatter = {
  title: 'Test Blog Post',
  description: 'A test blog post description',
  date: '2024-06-15',
};

describe('BlogCard', () => {
  it('renders the title', () => {
    render(<BlogCard slug="test-post" frontmatter={defaultFrontmatter} />);
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<BlogCard slug="test-post" frontmatter={defaultFrontmatter} />);
    expect(screen.getByText('A test blog post description')).toBeInTheDocument();
  });

  it('renders the formatted date', () => {
    render(<BlogCard slug="test-post" frontmatter={defaultFrontmatter} />);
    expect(screen.getByText('June 15, 2024')).toBeInTheDocument();
  });

  it('links to the correct blog post URL', () => {
    render(<BlogCard slug="my-post" frontmatter={defaultFrontmatter} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/my-post');
  });

  it('has correct time element', () => {
    render(<BlogCard slug="test" frontmatter={defaultFrontmatter} />);
    const time = screen.getByRole('time');
    expect(time).toBeInTheDocument();
  });

  it('renders with tags in frontmatter (does not display them)', () => {
    const fm: BlogFrontmatter = {
      ...defaultFrontmatter,
      tags: ['react', 'nextjs'],
    };
    render(<BlogCard slug="test" frontmatter={fm} />);
    expect(screen.queryByText('react')).not.toBeInTheDocument();
  });
});
