---
title: "Personal Portfolio"
description: "A premium full-stack portfolio built as a 3-app monorepo — public site, REST API backend, and a private admin dashboard."
date: "2024-08-01"
tags: ["React", "TypeScript", "Node.js", "MongoDB", "Framer Motion", "GSAP"]
github: "https://github.com/simplysandeepp/Portfolio"
live: "https://portfolio-simplysandeepp.vercel.app"
featured: true
priority: 5
---

## Overview

A premium-themed, full-stack personal portfolio built as a 3-app monorepo. It includes a public-facing site, a complete REST API backend, and a private admin dashboard built from scratch — all independently deployable.

## Architecture

**Frontend (Public Site)** — React 18, Vite, Tailwind CSS, Framer Motion, GSAP. Features a particle background, typewriter hero effect, and a floating chatbot (RoboChat) with fuzzy keyword matching.

**Admin Dashboard** — Protected-route React app with the TipTap rich-text editor. Manages all content: projects, blog posts, sessions, experience timeline, and contact submissions.

**Backend API** — Express + TypeScript REST API secured with JWT authentication. Handles CRUD for all content types, contact form validation, and Cloudinary-powered image uploads.

## Key Features

- 8 interactive skill cards covering core competencies
- Slug-based routing with custom SEO metadata per page
- CRUD-managed projects, blogs, and sessions via the admin panel
- Experience timeline and contact form with backend validation
- CI/CD pipeline with automated validation scripts
- Cloudinary media storage

## Status

Ongoing — actively maintained.
