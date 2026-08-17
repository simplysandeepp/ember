import { BLUR_DATA_URL } from '@/lib/blur';

describe('BLUR_DATA_URL', () => {
  it('is a valid data URI', () => {
    expect(BLUR_DATA_URL).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it('is a non-empty string', () => {
    expect(BLUR_DATA_URL.length).toBeGreaterThan(0);
  });

  it('contains base64-encoded SVG data', () => {
    const base64Part = BLUR_DATA_URL.split(',')[1];
    expect(base64Part).toBeTruthy();
    const decoded = atob(base64Part);
    expect(decoded).toContain('<svg');
  });

  it('decodes to a valid SVG with dimensions', () => {
    const base64Part = BLUR_DATA_URL.split(',')[1];
    const decoded = atob(base64Part);
    expect(decoded).toContain('viewBox');
    expect(decoded).toContain('rect');
  });
});
