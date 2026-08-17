import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/project-card';
import type { ProjectFrontmatter } from '@/lib/content-types';

jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock('next/image', () => {
  return (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt as string} src={props.src as string} />;
  };
});

const defaultFrontmatter: ProjectFrontmatter = {
  title: 'Test Project',
  description: 'A test project description',
  date: '2024-01-01',
  tags: ['React', 'TypeScript', 'Next.js'],
};

describe('ProjectCard', () => {
  it('renders the title', () => {
    render(<ProjectCard slug="test-project" frontmatter={defaultFrontmatter} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ProjectCard slug="test-project" frontmatter={defaultFrontmatter} />);
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('links to the correct project URL', () => {
    render(<ProjectCard slug="my-project" frontmatter={defaultFrontmatter} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/projects/my-project');
  });

  it('renders tags when present', () => {
    render(<ProjectCard slug="test" frontmatter={defaultFrontmatter} />);
    expect(screen.getByText('React · TypeScript · Next.js')).toBeInTheDocument();
  });

  it('limits displayed tags to 4', () => {
    const fm: ProjectFrontmatter = {
      ...defaultFrontmatter,
      tags: ['A', 'B', 'C', 'D', 'E', 'F'],
    };
    render(<ProjectCard slug="test" frontmatter={fm} />);
    expect(screen.getByText('A · B · C · D')).toBeInTheDocument();
    expect(screen.queryByText(/E/)).not.toBeInTheDocument();
  });

  it('does not render tags when empty', () => {
    const fm: ProjectFrontmatter = {
      ...defaultFrontmatter,
      tags: [],
    };
    const { container } = render(<ProjectCard slug="test" frontmatter={fm} />);
    expect(container.textContent).not.toContain('·');
  });

  it('renders arrow indicator', () => {
    render(<ProjectCard slug="test" frontmatter={defaultFrontmatter} />);
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('renders image when image URL provided', () => {
    const fm: ProjectFrontmatter = {
      ...defaultFrontmatter,
      image: '/projects/test.png',
    };
    render(<ProjectCard slug="test" frontmatter={fm} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Test Project — project by Sandeep Prajapati');
  });

  it('does not render image when no image URL', () => {
    render(<ProjectCard slug="test" frontmatter={defaultFrontmatter} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
