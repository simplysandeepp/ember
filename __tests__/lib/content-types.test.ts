import { formatDate } from '@/lib/content-types';
import type {
  ProjectFrontmatter,
  BlogFrontmatter,
  ExperienceFrontmatter,
  Certification,
} from '@/lib/content-types';

describe('formatDate', () => {
  it('formats a standard date string', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBe('January 15, 2024');
  });

  it('formats a date with time component', () => {
    const result = formatDate('2024-06-30T12:00:00');
    expect(result).toBe('June 30, 2024');
  });

  it('formats a full ISO date', () => {
    const result = formatDate('2023-12-25T00:00:00.000Z');
    expect(result).toBe('December 25, 2023');
  });

  it('returns a string containing month, day, and year', () => {
    const result = formatDate('2024-03-01');
    expect(result).toContain('March');
    expect(result).toContain('1');
    expect(result).toContain('2024');
  });
});

describe('TypeScript types', () => {
  it('ProjectFrontmatter has required fields', () => {
    const project: ProjectFrontmatter = {
      title: 'Test',
      description: 'Desc',
      date: '2024-01-01',
      tags: ['ts'],
    };
    expect(project.title).toBe('Test');
    expect(project.tags).toEqual(['ts']);
  });

  it('ProjectFrontmatter has optional fields', () => {
    const project: ProjectFrontmatter = {
      title: 'Test',
      description: 'Desc',
      date: '2024-01-01',
      tags: [],
      featured: true,
      priority: 1,
      pinned: true,
      github: 'https://github.com/test',
      live: 'https://test.com',
      demo: 'https://demo.com',
      image: '/img.png',
      metaDescription: 'Meta',
    };
    expect(project.featured).toBe(true);
    expect(project.priority).toBe(1);
  });

  it('BlogFrontmatter has required fields', () => {
    const blog: BlogFrontmatter = {
      title: 'Blog Post',
      description: 'A post',
      date: '2024-01-01',
    };
    expect(blog.title).toBe('Blog Post');
  });

  it('BlogFrontmatter has optional fields', () => {
    const blog: BlogFrontmatter = {
      title: 'Blog Post',
      description: 'A post',
      date: '2024-01-01',
      tags: ['javascript'],
      published: false,
      metaDescription: 'SEO desc',
    };
    expect(blog.published).toBe(false);
    expect(blog.tags).toEqual(['javascript']);
  });

  it('ExperienceFrontmatter has required fields', () => {
    const exp: ExperienceFrontmatter = {
      company: 'DrCode',
      role: 'Developer',
      start: '2024-01',
      end: 'Present',
    };
    expect(exp.company).toBe('DrCode');
  });

  it('ExperienceFrontmatter has optional order', () => {
    const exp: ExperienceFrontmatter = {
      company: 'DrCode',
      role: 'Developer',
      start: '2024-01',
      end: 'Present',
      order: 1,
    };
    expect(exp.order).toBe(1);
  });

  it('Certification has required fields', () => {
    const cert: Certification = {
      title: 'AWS Certified',
      issuer: 'Amazon',
      issued: '2024-01-01',
    };
    expect(cert.title).toBe('AWS Certified');
  });

  it('Certification has optional fields', () => {
    const cert: Certification = {
      title: 'AWS Certified',
      issuer: 'Amazon',
      issued: '2024-01-01',
      link: 'https://aws.com',
      logo: '/aws.png',
      details: 'Cloud practitioner',
    };
    expect(cert.link).toBe('https://aws.com');
  });
});
