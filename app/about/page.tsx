import Link from 'next/link';
import { getAllExperience, getCertifications } from '@/lib/content';
import {
  buildMetadata,
  siteConfig,
  personJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from '@/lib/metadata';
import Logo from '@/components/logo';
import GitHubStats from '@/components/github-stats';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'Sandeep Prajapati — Full-Stack Engineer in New Delhi. Experience at DrCode, GDG on Campus, Google, and Infosys Springboard, plus skills and certifications.',
  path: '/about',
  keywords: [
    'Sandeep Prajapati about',
    'Sandeep Prajapati experience',
    'Sandeep Prajapati resume',
    'Sandeep Prajapati skills',
    'Infosys Springboard AI Intern',
    'Google Student Ambassador',
  ],
});

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteConfig.url}/about#profile`,
  url: `${siteConfig.url}/about`,
  name: 'About Sandeep Prajapati',
  description:
    'Background, experience at DrCode, and skills across multi-agent RAG systems, AI automation, Next.js, and Python.',
  inLanguage: 'en',
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  mainEntity: personJsonLd,
  about: { '@id': `${siteConfig.url}/#person` },
  significantLink: [
    { '@type': 'WebPage', name: 'Projects', url: `${siteConfig.url}/projects` },
    { '@type': 'WebPage', name: 'Writing', url: `${siteConfig.url}/blog` },
    { '@type': 'WebPage', name: 'Resume', url: `${siteConfig.url}/resume` },
    { '@type': 'WebPage', name: 'Contact', url: `${siteConfig.url}/contact` },
  ],
};

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]);

const skills: Record<string, string[]> = {
  'AI Systems & Agents': [
    'Multi-Agent RAG Systems',
    'AI Agents',
    'AI Automation',
    'Monitoring & Evaluation',
    'Prompt Engineering',
    'Vector Databases',
  ],
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  Backend: ['Node.js', 'FastAPI', 'Python', 'Express'],
  Database: ['PostgreSQL', 'MongoDB'],
  Tools: ['Docker', 'Git', 'n8n', 'Vercel'],
};

export default function AboutPage() {
  const experience = getAllExperience();
  const certifications = getCertifications();

  const certsByYear = certifications.reduce<
    Record<string, typeof certifications>
  >((acc, cert) => {
    const year = String(new Date(cert.issued).getFullYear() || 'Undated');
    (acc[year] ??= []).push(cert);
    return acc;
  }, {});
  const certYears = Object.keys(certsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Page header */}
      <div className="flex items-start gap-5">
        <Logo size="lg" />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Sandeep Prajapati
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Full-Stack Engineer — AI Products & Agentic Systems · New Delhi
          </p>
          <a
            href="/contact"
            className="inline-block mt-2 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
          >
            Find Sandeep across the internet →
          </a>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="/contact"
              className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            >
              Contact
            </a>
            <Link
              href="/resume"
              className="sm:ml-auto text-xs font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-2 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 flex-shrink-0"
            >
              Full resume →
            </Link>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-10 space-y-4 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <p>
          I&apos;m Sandeep — an AI Software Developer Intern at{' '}
          <a
            href="https://drcode.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-link"
          >
            DrCode
          </a>
          , where I work on building AI-powered features that developers actually
          use in production.
        </p>
        <p>
          My focus is on delivering full-stack, scalable AI products —
          multi-agent RAG systems, AI agents, and automation pipelines, backed
          by production monitoring, evaluation, and DevOps — into something
          that works end to end, not just in a demo.
        </p>
        <p>
          I explore new and upcoming tech stacks daily, always looking for
          better ways to build and ship intelligent products.
        </p>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.slug} className="flex gap-4 sm:gap-8">
                <div className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500 pt-0.5 leading-5 w-20">
                  {exp.frontmatter.start} – {exp.frontmatter.end}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {exp.frontmatter.role}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    {exp.frontmatter.company}
                  </p>
                  {exp.content.trim() && (
                    <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                      {exp.content.trim()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section className="mt-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
          Education
        </h2>
        <div className="flex gap-4 sm:gap-8">
          <div className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500 pt-0.5 leading-5 w-20">
            2023 – 2027
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              B.Tech, Computer Science
            </p>
            <p className="text-sm text-neutral-500 mt-0.5">
              Galgotias University, Greater Noida
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
          Skills
        </h2>
        <div className="space-y-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-4 sm:gap-8">
              <div className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500 pt-0.5 w-20">
                {category}
              </div>
              <p className="flex-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {items.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub & LeetCode stats */}
      <GitHubStats />

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
            Certifications
          </h2>
          <div className="space-y-3">
            {certYears.map((year, yearIndex) => (
              <details
                key={year}
                open={yearIndex === 0}
                className="group border-b border-neutral-100 dark:border-neutral-800 last:border-0 pb-4"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none marker:hidden py-2 -mx-2 px-2 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors">
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {year}
                    <span className="ml-2 text-xs font-normal text-neutral-400 dark:text-neutral-500">
                      {certsByYear[year].length} {certsByYear[year].length === 1 ? 'cert' : 'certs'}
                    </span>
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500 group-open:rotate-90 transition-transform duration-200" aria-hidden="true">›</span>
                </summary>
                <div className="space-y-5 pt-4">
                  {certsByYear[year].map((cert) => (
                    <div key={cert.title} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-md overflow-hidden bg-white dark:bg-neutral-100 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center p-1.5">
                  {cert.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.logo}
                      alt={`${cert.issuer} logo`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-neutral-500">
                      {cert.issuer.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {cert.title}
                    </p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center min-h-[44px] px-2 -mx-2 text-xs font-normal text-neutral-400 dark:text-neutral-500 underline underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
                      >
                        Verify
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {cert.issuer} · {cert.issued}
                  </p>
                  {cert.details && (
                    <details className="group/details mt-1.5">
                      <summary className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer list-none transition-colors duration-200 marker:hidden">
                        <span className="group-open/details:hidden">Details +</span>
                        <span className="hidden group-open/details:inline">Details −</span>
                      </summary>
                      <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed">
                        {cert.details}
                      </p>
                    </details>
                  )}
                </div>
              </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* FAQ — mirrors the FAQPage JSON-LD so the schema is backed
          by visible, crawlable content. */}
      <section className="mt-14" aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6"
        >
          Frequently asked
        </h2>
        <div className="space-y-5">
          {faqJsonLd.mainEntity.map((qa) => (
            <details
              key={qa.name}
              className="group border-b border-neutral-100 dark:border-neutral-800 pb-4"
            >
              <summary className="text-sm font-medium text-neutral-900 dark:text-neutral-100 cursor-pointer list-none flex items-start justify-between gap-4">
                <span>{qa.name}</span>
                <span
                  aria-hidden
                  className="text-neutral-300 dark:text-neutral-600 group-open:rotate-45 transition-transform duration-200 flex-shrink-0"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                {qa.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-14 pt-10 border-t border-neutral-100 dark:border-neutral-800">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Open to full-stack AI engineering roles, interesting projects, and
          good conversations.{' '}
          <a href="/contact" className="underline-link">
            Get in touch →
          </a>
        </p>
      </section>
    </div>
  );
}
