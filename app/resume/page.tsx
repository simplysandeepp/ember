import Link from 'next/link';
import PrintButton from './print-button';
import {
  getAllExperience,
  getAllProjects,
  getCertifications,
  formatDate,
} from '@/lib/content';
import {
  buildMetadata,
  siteConfig,
  personJsonLd,
  breadcrumbJsonLd,
} from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Resume',
  description:
    'Full resume of Sandeep Prajapati — Full-Stack Engineer building AI Products & Agentic Systems in New Delhi. Experience at DrCode, Google, Infosys Springboard, and GDG on Campus. Skills in multi-agent RAG systems, AI automation, Next.js, Python, and more.',
  path: '/resume',
  keywords: [
    'Sandeep Prajapati resume',
    'Sandeep Prajapati CV',
    'Sandeep Prajapati AI Engineer resume',
    'Sandeep Prajapati Full-Stack Developer CV',
    'Sandeep Prajapati DrCode',
    'Sandeep Prajapati New Delhi',
  ],
});

const skills: Record<string, string[]> = {
  'AI Systems & Agents': [
    'Multi-Agent RAG Systems',
    'AI Agents',
    'AI Automation',
    'Monitoring & Evaluation',
    'Prompt Engineering',
    'Vector Databases',
    'Groq',
    'OpenAI API',
    'Anthropic Claude',
  ],
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  Backend: ['Node.js', 'FastAPI', 'Python', 'Express', 'REST APIs'],
  Database: ['PostgreSQL', 'MongoDB', 'Redis', 'Vector DBs'],
  DevOps: ['Docker', 'AWS', 'Vercel', 'Render', 'GitHub Actions', 'n8n'],
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'],
};

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Resume', path: '/resume' },
]);

const resumeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${siteConfig.url}/resume`,
  name: 'Resume — Sandeep Prajapati',
  description:
    'Full resume and CV for Sandeep Prajapati, Full-Stack Engineer building AI Products & Agentic Systems.',
  mainEntity: personJsonLd,
};

export default function ResumePage() {
  const experience = getAllExperience();
  const projects = getAllProjects();
  const certifications = getCertifications();
  const topProjects = projects.slice(0, 6);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 print:py-6 print:max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Sandeep Prajapati
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Full-Stack Engineer — AI Products &amp; Agentic Systems · New Delhi, India
        </p>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Sandeep Prajapati builds full-stack, scalable AI products —
          multi-agent RAG systems, AI agents, and automation pipelines, with
          production monitoring, evaluation, and DevOps. Currently an AI
          Software Developer Intern at DrCode, working on production AI
          features used by real developers.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-xs text-neutral-500">
          <a
            href={siteConfig.url}
            className="underline-link"
            rel="canonical"
          >
            sandeepp.in
          </a>
          <span aria-hidden>·</span>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            GitHub
          </a>
          <span aria-hidden>·</span>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            LinkedIn
          </a>
          <span aria-hidden>·</span>
          <a href={siteConfig.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            LeetCode
          </a>
          <span aria-hidden>·</span>
          <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-5 print:hidden">
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-2 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors"
          >
            Download PDF ↗
          </a>
          <span aria-hidden className="text-neutral-300 dark:text-neutral-600">·</span>
          <PrintButton />
        </div>
      </header>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mt-12 print:mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-5">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.slug} className="flex gap-4 sm:gap-8">
                <div className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500 pt-0.5 leading-5 w-24">
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
      <section className="mt-12 print:mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-5">
          Education
        </h2>
        <div className="flex gap-4 sm:gap-8">
          <div className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500 pt-0.5 leading-5 w-24">
            2023 – 2027
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              B.Tech, Computer Science &amp; Engineering
            </p>
            <p className="text-sm text-neutral-500 mt-0.5">
              Galgotias University, Greater Noida, India
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-12 print:mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-5">
          Skills
        </h2>
        <div className="space-y-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-4 sm:gap-8">
              <div className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500 pt-0.5 w-24">
                {category}
              </div>
              <p className="flex-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {items.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected projects */}
      {topProjects.length > 0 && (
        <section className="mt-12 print:mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-5">
            Selected Projects
          </h2>
          <div className="space-y-4">
            {topProjects.map((p) => (
              <div key={p.slug} className="flex gap-4 sm:gap-8">
                <div className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500 pt-0.5 leading-5 w-24">
                  {formatDate(p.frontmatter.date)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="underline-link"
                    >
                      {p.frontmatter.title}
                    </Link>
                  </p>
                  <p className="text-sm text-neutral-500 mt-1 leading-relaxed">
                    {p.frontmatter.description}
                  </p>
                  {p.frontmatter.tags?.length > 0 && (
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1.5">
                      {p.frontmatter.tags.slice(0, 6).join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
            Full list at{' '}
            <Link href="/projects" className="underline-link">
              sandeepp.in/projects
            </Link>
            .
          </p>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mt-12 print:mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-5">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.title} className="flex gap-4 sm:gap-8">
                <div className="flex-shrink-0 text-xs text-neutral-400 dark:text-neutral-500 pt-0.5 leading-5 w-24">
                  {cert.issued}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {cert.title}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 print:mt-8">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Open to full-stack AI engineering roles and collaborations.{' '}
          <Link href="/contact" className="underline-link">
            Get in touch →
          </Link>
        </p>
      </section>
    </div>
  );
}
