import {
  siteConfig,
  siteKeywords,
  buildMetadata,
  personJsonLd,
  personJsonLdWith,
  websiteJsonLd,
  profilePageJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from '@/lib/metadata';

describe('siteConfig', () => {
  it('has required fields', () => {
    expect(siteConfig.name).toBe('Sandeep Prajapati');
    expect(siteConfig.firstName).toBe('Sandeep');
    expect(siteConfig.lastName).toBe('Prajapati');
    expect(siteConfig.url).toBe('https://beta.sandeepp.in');
  });

  it('has social links', () => {
    expect(siteConfig.github).toContain('github.com');
    expect(siteConfig.linkedin).toContain('linkedin.com');
    expect(siteConfig.instagram).toContain('instagram.com');
    expect(siteConfig.leetcode).toContain('leetcode.com');
  });

  it('has giscus config', () => {
    expect(siteConfig.giscus.repo).toBeTruthy();
    expect(siteConfig.giscus.repoId).toBeTruthy();
    expect(siteConfig.giscus.category).toBeTruthy();
    expect(siteConfig.giscus.categoryId).toBeTruthy();
  });

  it('has job title', () => {
    expect(siteConfig.jobTitle).toContain('Full-Stack Engineer');
  });

  it('has descriptions', () => {
    expect(siteConfig.description.length).toBeGreaterThan(0);
    expect(siteConfig.longDescription.length).toBeGreaterThan(siteConfig.description.length);
    expect(siteConfig.shortDescription.length).toBeGreaterThan(0);
  });

  it('has usernames', () => {
    expect(siteConfig.githubUsername).toBeTruthy();
    expect(siteConfig.leetcodeUsername).toBeTruthy();
    expect(siteConfig.buttondownUsername).toBeTruthy();
  });

  it('has resume URL', () => {
    expect(siteConfig.resumeUrl).toContain('drive.google.com');
  });

  it('has tally URL', () => {
    expect(siteConfig.tallyUrl).toContain('tally.so');
  });
});

describe('siteKeywords', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(siteKeywords)).toBe(true);
    expect(siteKeywords.length).toBeGreaterThan(0);
  });

  it('includes the site owner name', () => {
    expect(siteKeywords).toContain('Sandeep Prajapati');
  });

  it('includes relevant keywords', () => {
    expect(siteKeywords).toContain('AI Engineer');
    expect(siteKeywords).toContain('Full-Stack Developer');
    expect(siteKeywords).toContain('Next.js developer');
  });

  it('contains only strings', () => {
    siteKeywords.forEach((kw) => {
      expect(typeof kw).toBe('string');
    });
  });
});

describe('buildMetadata', () => {
  it('returns basic metadata', () => {
    const meta = buildMetadata({
      title: 'About',
      description: 'About page',
    });
    expect(meta.title).toBe('About');
    expect(meta.description).toBe('About page');
  });

  it('sets canonical URL with path', () => {
    const meta = buildMetadata({
      title: 'Projects',
      description: 'My projects',
      path: '/projects',
    });
    expect(meta.alternates?.canonical).toBe('https://beta.sandeepp.in/projects');
  });

  it('defaults path to empty string', () => {
    const meta = buildMetadata({
      title: 'Home',
      description: 'Home page',
    });
    expect(meta.alternates?.canonical).toBe('https://beta.sandeepp.in');
  });

  it('includes RSS alternate', () => {
    const meta = buildMetadata({ title: 'Test', description: 'Test' });
    expect(meta.alternates?.types).toHaveProperty('application/rss+xml');
  });

  it('merges custom keywords with site keywords', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test',
      keywords: ['custom-keyword'],
    });
    expect(meta.keywords).toContain('custom-keyword');
    expect(meta.keywords).toContain('Sandeep Prajapati');
  });

  it('uses site keywords when no custom keywords provided', () => {
    const meta = buildMetadata({ title: 'Test', description: 'Test' });
    expect(meta.keywords).toEqual(siteKeywords);
  });

  it('sets Open Graph data', () => {
    const meta = buildMetadata({
      title: 'Page Title',
      description: 'Page desc',
      path: '/page',
    });
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.title).toBe('Page Title');
    expect(og.description).toBe('Page desc');
    expect(og.url).toBe('https://beta.sandeepp.in/page');
    expect(og.type).toBe('website');
  });

  it('sets Twitter card data', () => {
    const meta = buildMetadata({ title: 'Tweet', description: 'Card' });
    const tw = meta.twitter as Record<string, unknown>;
    expect(tw.card).toBe('summary_large_image');
    expect(tw.creator).toBe('@simplysandeepp');
  });

  it('allows custom image', () => {
    const meta = buildMetadata({
      title: 'Test',
      description: 'Test',
      image: '/custom-og.png',
    });
    const og = meta.openGraph as Record<string, unknown>;
    const images = og.images as { url: string }[];
    expect(images[0].url).toBe('/custom-og.png');
  });

  it('defaults to site OG image', () => {
    const meta = buildMetadata({ title: 'Test', description: 'Test' });
    const og = meta.openGraph as Record<string, unknown>;
    const images = og.images as { url: string }[];
    expect(images[0].url).toContain('opengraph-image');
  });

  it('sets robots config', () => {
    const meta = buildMetadata({ title: 'Test', description: 'Test' });
    expect(meta.robots?.index).toBe(true);
    expect(meta.robots?.follow).toBe(true);
  });

  it('sets metadataBase', () => {
    const meta = buildMetadata({ title: 'Test', description: 'Test' });
    expect(meta.metadataBase?.toString()).toBe('https://beta.sandeepp.in/');
  });
});

describe('personJsonLd', () => {
  it('has correct @type', () => {
    expect(personJsonLd['@type']).toBe('Person');
  });

  it('has correct name', () => {
    expect(personJsonLd.name).toBe('Sandeep Prajapati');
  });

  it('has URL', () => {
    expect(personJsonLd.url).toBe('https://beta.sandeepp.in');
  });

  it('has job title', () => {
    expect(personJsonLd.jobTitle).toContain('Full-Stack Engineer');
  });

  it('has worksFor', () => {
    expect(personJsonLd.worksFor['@type']).toBe('Organization');
    expect(personJsonLd.worksFor.name).toBe('DrCode');
  });

  it('has alumniOf', () => {
    expect(personJsonLd.alumniOf.name).toBe('Galgotias University');
  });

  it('has sameAs array with social links', () => {
    expect(Array.isArray(personJsonLd.sameAs)).toBe(true);
    expect(personJsonLd.sameAs.length).toBeGreaterThanOrEqual(4);
  });

  it('has address in India', () => {
    expect(personJsonLd.address.addressCountry).toBe('IN');
  });

  it('has knowsAbout array', () => {
    expect(Array.isArray(personJsonLd.knowsAbout)).toBe(true);
    expect(personJsonLd.knowsAbout).toContain('Artificial Intelligence');
  });

  it('has identifier array', () => {
    expect(Array.isArray(personJsonLd.identifier)).toBe(true);
    expect(personJsonLd.identifier.length).toBeGreaterThanOrEqual(2);
  });
});

describe('personJsonLdWith', () => {
  it('adds mentions from project data', () => {
    const result = personJsonLdWith([
      { title: 'Project A', slug: 'project-a' },
      { title: 'Project B', slug: 'project-b' },
    ]);
    expect(result.mentions).toHaveLength(2);
    expect(result.mentions[0].name).toBe('Project A');
    expect(result.mentions[0].url).toBe('https://beta.sandeepp.in/projects/project-a');
    expect(result.mentions[1].name).toBe('Project B');
  });

  it('returns empty mentions for empty array', () => {
    const result = personJsonLdWith([]);
    expect(result.mentions).toEqual([]);
  });

  it('preserves base person data', () => {
    const result = personJsonLdWith([{ title: 'Test', slug: 'test' }]);
    expect(result.name).toBe('Sandeep Prajapati');
    expect(result['@type']).toBe('Person');
  });
});

describe('websiteJsonLd', () => {
  it('has correct @type', () => {
    expect(websiteJsonLd['@type']).toBe('WebSite');
  });

  it('has correct URL', () => {
    expect(websiteJsonLd.url).toBe('https://beta.sandeepp.in');
  });

  it('has search action', () => {
    expect(websiteJsonLd.potentialAction['@type']).toBe('SearchAction');
    expect(websiteJsonLd.potentialAction.target.urlTemplate).toContain('blog?q=');
  });

  it('has publisher reference', () => {
    expect(websiteJsonLd.publisher['@id']).toContain('#person');
  });
});

describe('profilePageJsonLd', () => {
  it('has correct @type', () => {
    const result = profilePageJsonLd();
    expect(result['@type']).toBe('ProfilePage');
  });

  it('has mainEntity reference to person', () => {
    const result = profilePageJsonLd();
    expect(result.mainEntity['@id']).toContain('#person');
  });

  it('includes mentions when provided', () => {
    const result = profilePageJsonLd([
      { title: 'My App', slug: 'my-app' },
    ]);
    expect(result.mentions).toHaveLength(1);
    expect(result.mentions[0].name).toBe('My App');
  });

  it('has no mentions when empty', () => {
    const result = profilePageJsonLd([]);
    expect(result).not.toHaveProperty('mentions');
  });

  it('has breadcrumb', () => {
    const result = profilePageJsonLd();
    expect(result.breadcrumb['@type']).toBe('BreadcrumbList');
  });
});

describe('faqJsonLd', () => {
  it('has correct @type', () => {
    expect(faqJsonLd['@type']).toBe('FAQPage');
  });

  it('has multiple questions', () => {
    expect(faqJsonLd.mainEntity.length).toBeGreaterThanOrEqual(5);
  });

  it('each question has acceptedAnswer', () => {
    faqJsonLd.mainEntity.forEach((q) => {
      expect(q['@type']).toBe('Question');
      expect(q.acceptedAnswer['@type']).toBe('Answer');
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(0);
    });
  });

  it('includes Sandeep Prajapati name in answers', () => {
    const combinedText = faqJsonLd.mainEntity
      .map((q) => q.acceptedAnswer.text)
      .join(' ');
    expect(combinedText).toContain('Sandeep Prajapati');
  });
});

describe('breadcrumbJsonLd', () => {
  it('creates breadcrumb from items', () => {
    const result = breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'My Project', path: '/projects/my-project' },
    ]);
    expect(result['@type']).toBe('BreadcrumbList');
    expect(result.itemListElement).toHaveLength(3);
  });

  it('assigns correct positions', () => {
    const result = breadcrumbJsonLd([
      { name: 'A', path: '/a' },
      { name: 'B', path: '/b' },
    ]);
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[1].position).toBe(2);
  });

  it('constructs full URLs', () => {
    const result = breadcrumbJsonLd([
      { name: 'Test', path: '/test' },
    ]);
    expect(result.itemListElement[0].item).toBe('https://beta.sandeepp.in/test');
  });

  it('handles empty array', () => {
    const result = breadcrumbJsonLd([]);
    expect(result.itemListElement).toEqual([]);
  });
});
