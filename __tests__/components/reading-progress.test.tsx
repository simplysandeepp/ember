import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import ReadingProgress from '@/components/reading-progress';

describe('ReadingProgress', () => {
  it('renders a progress bar container', () => {
    const { container } = render(<ReadingProgress />);
    const outer = container.firstChild as HTMLElement;
    expect(outer).toBeInTheDocument();
    expect(outer.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders inner progress bar', () => {
    const { container } = render(<ReadingProgress />);
    const inner = container.querySelector('[class*="bg-neutral"]');
    expect(inner).toBeInTheDocument();
  });

  it('starts with 0% width', () => {
    const { container } = render(<ReadingProgress />);
    const bar = container.querySelector('[style]');
    expect(bar?.getAttribute('style')).toContain('width: 0%');
  });

  it('has fixed positioning classes', () => {
    const { container } = render(<ReadingProgress />);
    const outer = container.firstChild as HTMLElement;
    expect(outer.className).toContain('fixed');
    expect(outer.className).toContain('top-0');
    expect(outer.className).toContain('left-0');
    expect(outer.className).toContain('right-0');
  });

  it('is hidden from screen readers', () => {
    const { container } = render(<ReadingProgress />);
    const outer = container.firstChild as HTMLElement;
    expect(outer.getAttribute('aria-hidden')).toBe('true');
  });
});
