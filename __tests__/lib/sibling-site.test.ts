import { SIBLING_SITE, THIS_SITE, SWITCH_HASH, siblingHref } from '@/lib/sibling-site';

describe('sibling site', () => {
  it('points at the beta host', () => {
    expect(SIBLING_SITE.url).toBe('https://beta.sandeepp.in');
  });

  it('points somewhere other than this host, which would be a loop', () => {
    expect(SIBLING_SITE.url).toContain('beta.');
  });

  it('labels the two designs distinctly', () => {
    expect(SIBLING_SITE.label).not.toBe(THIS_SITE.label);
  });

  // A hash never reaches the server and is never indexed as its own URL,
  // which a query parameter would risk.
  it('marks the arrival with a hash, not a query parameter', () => {
    expect(SWITCH_HASH.startsWith('#')).toBe(true);
    expect(SWITCH_HASH).not.toContain('?');
  });
});

describe('siblingHref', () => {
  it('carries the current path across', () => {
    expect(siblingHref('/projects/aegis')).toBe(
      `https://beta.sandeepp.in/projects/aegis${SWITCH_HASH}`
    );
  });

  it('does not append a redundant slash on the home page', () => {
    expect(siblingHref('/')).toBe(`https://beta.sandeepp.in${SWITCH_HASH}`);
  });

  it('always ends with the arrival marker', () => {
    ['/', '/about', '/blog/some-post'].forEach((path) => {
      expect(siblingHref(path).endsWith(SWITCH_HASH)).toBe(true);
    });
  });

  it('produces an absolute cross-origin URL', () => {
    expect(siblingHref('/about')).toMatch(/^https:\/\//);
  });
});
