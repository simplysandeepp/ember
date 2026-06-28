# sandeepp.in

My personal portfolio → **[sandeepp.in](https://sandeepp.in)**

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and deployed on **Vercel**.
Uses the **San Francisco** system font. No database, no CMS — everything is just Markdown files.

---

## How it works (in simple words)

All my content (projects, blog posts, experience, certifications) lives as plain
Markdown files inside the `content/` folder. To add something new, I just create a
file and push to GitHub — Vercel rebuilds the site automatically.

```
content/
  projects/        → each .md becomes /projects/<name>
  blog/            → each .md becomes /blog/<name>
  experience/      → shown on the About page
  certifications.md → the Certifications list on About
public/projects/   → screenshots/GIFs (named after the project)
```

---

## Add a project

Create `content/projects/my-project.md`:

```md
---
title: "My Project"
description: "One short line about it."
date: "2025-01-01"
tags: ["Next.js", "TypeScript"]
github: "https://github.com/..."
live: "https://..."        # optional
featured: true             # optional
priority: 1                # optional — order in selected/pinned lists
pinned: true               # optional — pins it to the top of /projects
---

Write the project details here in Markdown.
```

**Add an image:** drop a file in `public/projects/` named exactly like the project
(e.g. `my-project.png`). It's picked up automatically — no extra config. `.png`,
`.jpg`, and `.gif` all work. To use a GIF later, just replace the `.png` with a `.gif`.

The home page "Selected Work" shows the **4 most recent projects** by date.

---

## Add a blog post

Create `content/blog/my-post.md`:

```md
---
title: "Post Title"
description: "One short line."
date: "2025-01-01"
tags: ["AI", "Engineering"]
published: true
---

Write the post here in Markdown.
```

Long posts automatically get a table of contents, reading time, and prev/next links.
New posts also appear in the RSS feed (`/rss.xml`) and can email newsletter subscribers.

---

## Features

- 📝 Markdown-based projects, blog, experience, and certifications
- 🖼️ Auto-detected project images (just drop a file named after the project)
- 🌗 Dark / light mode with a smooth reveal animation
- ⌘K command palette for quick navigation
- 💬 Blog comments (GitHub Discussions via Giscus)
- 📬 Newsletter signup + RSS feed (no backend)
- 📊 GitHub & LeetCode stat cards on the About page
- 🔍 SEO: per-page Open Graph images, sitemap, structured data

---

## Run it locally

```bash
bun install      # install dependencies
bun run dev      # start dev server → http://localhost:3000
bun run build    # production build
```

> Note: this project uses **bun**, not npm.
