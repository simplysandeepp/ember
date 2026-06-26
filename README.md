# sandeepp.in

Personal portfolio — [sandeepp.in](https://sandeepp.in)

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Vercel

## Content system

All content lives as Markdown files in `/content`. No CMS, no database.

```
content/
  projects/   → /projects/[slug]
  blog/        → /blog/[slug]
  experience/ → loaded on /about
```

**To add a project**: create `content/projects/my-project.md` with this frontmatter:

```md
---
title: "Project Title"
description: "One-line description."
date: "2025-01-01"
tags: ["Next.js", "TypeScript"]
github: "https://github.com/..."
live: "https://..."
featured: true
---

Your markdown content here.
```

**To add a blog post**: create `content/blog/my-post.md`:

```md
---
title: "Post Title"
description: "One-line description."
date: "2025-01-01"
tags: ["AI", "Engineering"]
published: true
---

Your markdown content here.
```

Push to GitHub → Vercel builds automatically.

## Dev

```bash
npm run dev     # localhost:3000
npm run build   # production static build
```
