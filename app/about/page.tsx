import { getAllExperience } from '@/lib/content';
import { buildMetadata, siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'AI Engineer and Full-Stack Developer from New Delhi. My story, experience, skills, and education.',
  path: '/about',
});

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

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">

      {/* Page header */}
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center text-white text-base font-semibold flex-shrink-0 select-none ring-2 ring-neutral-100">
          SP
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
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
              className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-10 space-y-4 text-base text-neutral-600 leading-relaxed">
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
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.slug} className="flex gap-8">
                <div className="flex-shrink-0 text-xs text-neutral-400 pt-0.5 leading-5 w-20">
                  {exp.frontmatter.start} – {exp.frontmatter.end}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900">
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
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6">
          Education
        </h2>
        <div className="flex gap-8">
          <div className="flex-shrink-0 text-xs text-neutral-400 pt-0.5 leading-5 w-20">
            2022 – 2026
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">
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
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6">
          Skills
        </h2>
        <div className="space-y-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-8">
              <div className="flex-shrink-0 text-xs text-neutral-400 pt-0.5 w-20">
                {category}
              </div>
              <p className="flex-1 text-sm text-neutral-600 leading-relaxed">
                {items.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-14 pt-10 border-t border-neutral-100">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Open to AI engineering roles, interesting projects, and good
          conversations.{' '}
          <a
            href={`mailto:${siteConfig.email}`}
            className="underline-link"
          >
            {siteConfig.email}
          </a>
        </p>
      </section>
    </div>
  );
}
