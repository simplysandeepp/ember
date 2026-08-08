jest.mock('github-slugger', () => {
  let counter: Record<string, number> = {};
  return {
    __esModule: true,
    default: function () {
      return {
        slug: (text: string) => {
          const base = text
            .toLowerCase()
            .replace(/<[^>]+>/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
          if (!(base in counter)) {
            counter[base] = 0;
            return base;
          }
          counter[base]++;
          return `${base}-${counter[base]}`;
        },
        reset: () => { counter = {}; },
      };
    },
  };
});

import { extractHeadings } from '@/lib/toc';

describe('extractHeadings', () => {
  it('extracts h2 headings', () => {
    const md = '## First Heading\n\nSome content\n\n## Second Heading\n\nMore content';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(2);
    expect(headings[0].level).toBe(2);
    expect(headings[0].text).toBe('First Heading');
    expect(headings[0].slug).toBe('first-heading');
    expect(headings[1].text).toBe('Second Heading');
  });

  it('extracts h3 headings', () => {
    const md = '### Sub Heading\n\nContent here';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(1);
    expect(headings[0].level).toBe(3);
    expect(headings[0].text).toBe('Sub Heading');
    expect(headings[0].slug).toBe('sub-heading');
  });

  it('extracts mixed h2 and h3 headings', () => {
    const md = [
      '## Section One',
      '',
      'Content',
      '',
      '### Sub Section',
      '',
      'More content',
      '',
      '## Section Two',
    ].join('\n');

    const headings = extractHeadings(md);
    expect(headings).toHaveLength(3);
    expect(headings[0]).toEqual({ level: 2, text: 'Section One', slug: 'section-one' });
    expect(headings[1]).toEqual({ level: 3, text: 'Sub Section', slug: 'sub-section' });
    expect(headings[2]).toEqual({ level: 2, text: 'Section Two', slug: 'section-two' });
  });

  it('skips h1 headings', () => {
    const md = '# Main Title\n\n## Actual Heading\n\nContent';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Actual Heading');
  });

  it('skips h4, h5, h6 headings', () => {
    const md = '#### Deep Heading\n##### Deeper\n###### Deepest\n## Normal';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Normal');
  });

  it('skips headings inside fenced code blocks', () => {
    const md = [
      '## Real Heading',
      '',
      '```',
      '## Fake Heading',
      '```',
      '',
      '## Another Real Heading',
    ].join('\n');

    const headings = extractHeadings(md);
    expect(headings).toHaveLength(2);
    expect(headings[0].text).toBe('Real Heading');
    expect(headings[1].text).toBe('Another Real Heading');
  });

  it('handles headings with trailing # characters', () => {
    const md = '## Heading with trailing ##';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Heading with trailing');
  });

  it('strips markdown links from heading text', () => {
    const md = '## [Link Text](https://example.com) Heading';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Link Text Heading');
  });

  it('strips emphasis markers from heading text', () => {
    const md = '## **Bold** and *Italic* Heading';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Bold and Italic Heading');
  });

  it('strips inline code from heading text', () => {
    const md = '## Use `useState` for state';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Use useState for state');
  });

  it('returns empty array for markdown with no headings', () => {
    const md = 'Just some regular paragraph text.\n\nMore text here.';
    const headings = extractHeadings(md);
    expect(headings).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(extractHeadings('')).toEqual([]);
  });

  it('generates unique slugs for duplicate headings', () => {
    const md = '## Duplicate\n\nContent\n\n## Duplicate\n\nMore';
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(2);
    expect(headings[0].slug).toBe('duplicate');
    expect(headings[1].slug).toBe('duplicate-1');
  });

  it('generates proper slugs with special characters', () => {
    const md = '## Hello World! (with) [brackets]';
    const headings = extractHeadings(md);
    expect(headings[0].slug).toBe('hello-world-with-brackets');
  });

  it('handles multiple fenced code blocks', () => {
    const md = [
      '## Heading 1',
      '```js',
      '## Code Heading',
      '```',
      '## Heading 2',
      '```',
      '## Also Code',
      '```',
      '## Heading 3',
    ].join('\n');

    const headings = extractHeadings(md);
    expect(headings).toHaveLength(3);
    expect(headings.map((h) => h.text)).toEqual(['Heading 1', 'Heading 2', 'Heading 3']);
  });
});
