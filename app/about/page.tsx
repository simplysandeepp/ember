import { getAllExperience, getCertifications } from '@/lib/content';
import {
  buildMetadata,
  siteConfig,
  personJsonLd,
  breadcrumbJsonLd,
} from '@/lib/metadata';
import Logo from '@/components/logo';
import GitHubStats from '@/components/github-stats';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'About — Sandeep Prajapati',
  description:
    'About Sandeep Prajapati — AI Engineer & Full-Stack Developer from New Delhi, India. Experience at DrCode, GDG on Campus, Google, and Infosys Springboard, plus skills in RAG, LangGraph, Next.js, and Python.',
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
  url: `${siteConfig.url}/about`,
  mainEntity: personJsonLd,
};

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]);

const skills: Record<string, string[]> = {
  'AI / ML': [
    'RAG Pipelines',
    'LangGraph',
    'LangChain',
    'AI Agents',
    'CrewAI',
    'Pydantic AI',
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

      {/* Page header */}
      <div className="flex items-start gap-5">
        <Logo size="lg" />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Sandeep Prajapati
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            AI Software Intern · New Delhi
          </p>
          <div className="flex items-center gap-4 mt-2">
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
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-2 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 flex-shrink-0"
            >
              Download CV
            </a>
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
          My focus is on delivering AI-powered full-stack solutions — systems
          that combine RAG pipelines, agentic workflows, and clean product
          interfaces into something that works end to end, not just in a demo.
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
              <div key={exp.slug} className="flex gap-8">
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
        <div className="flex gap-8">
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
            <div key={category} className="flex gap-8">
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
          <div className="space-y-5">
            {certifications.map((cert) => (
              <div key={cert.title} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  {cert.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
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
                        className="flex-shrink-0 text-xs font-normal text-neutral-400 dark:text-neutral-500 underline underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
                      >
                        Verify
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {cert.issuer} · {cert.issued}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="mt-14 pt-10 border-t border-neutral-100 dark:border-neutral-800">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Open to AI engineering roles, interesting projects, and good
          conversations.{' '}
          <a href="/contact" className="underline-link">
            Get in touch →
          </a>
        </p>
      </section>
    </div>
  );
}
