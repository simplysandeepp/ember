---
title: "Beacon"
description: "An AI platform that converts unstructured project data — Slack threads, emails, meeting notes — into validated BRD drafts automatically."
date: "2025-02-01"
tags: ["Next.js 14", "FastAPI", "Python", "Groq LLM", "PostgreSQL", "Firebase"]
github: "https://github.com/simplysandeepp/Beacon"
live: "https://brd-agent-xi.vercel.app"
featured: true
priority: 1
---

## Overview

Built at **HackFest 2.0** with a team of four. Beacon dramatically accelerates Business Requirements Document creation by ingesting scattered, unstructured data and converting it into structured, semantically validated BRD drafts.

## How It Works

1. **Ingest** — Accepts Slack threads, emails, meeting notes, and file uploads
2. **Filter** — Hybrid heuristics + LLM classification suppresses noise and irrelevant content
3. **Generate** — Produces a structured BRD across 7 standardized sections using Groq LLM
4. **Validate** — AI detects contradictions, ambiguities, and requirement gaps in the draft
5. **Export** — Supports Markdown, HTML, and DOCX output with collaborative sharing

## Architecture

**Frontend** — Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand, Framer Motion

**Backend** — FastAPI, Python 3.9+, Groq LLM for fast inference

**Database** — PostgreSQL (SQLite fallback locally), Firebase Firestore for document storage, Firebase Auth
