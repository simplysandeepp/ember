---
title: "MultiAgent Resumer"
description: "An agentic resume builder — specialized AI agents handle JD analysis, content rewriting, ATS scoring, and formatting in concert."
date: "2025-04-01"
tags: ["Python", "FastAPI", "LangChain", "Groq LLM", "React", "TypeScript"]
github: "https://github.com/simplysandeepp/Multi-Agent-Resumer"
featured: false
---

## Overview

Instead of one AI prompt generating a resume, MultiAgent Resumer uses a pipeline of four specialized agents that each own a specific responsibility — resulting in a more tailored, ATS-optimized, and professionally formatted output.

## Agent Architecture

**JD Analyzer Agent** — Extracts skills, keywords, and explicit/implicit requirements from a job posting.

**Content Agent** — Rewrites and tailors the user's experience bullets to semantically match what the JD Analyzer found.

**ATS Scorer Agent** — Evaluates the generated resume for Applicant Tracking System compatibility and suggests improvements in keyword density and formatting.

**Formatter Agent** — Assembles the optimized content into clean, export-ready resume layouts.

## Status

Early stage — architecture defined, agents in development.
