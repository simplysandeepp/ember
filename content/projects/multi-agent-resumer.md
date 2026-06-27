---
title: "MultiAgent Resumer"
description: "An agentic resume builder — specialized AI agents handle JD analysis, content rewriting, ATS scoring, and formatting in concert."
date: "2025-04-01"
tags: ["Python", "FastAPI", "LangChain", "Groq LLM", "React", "TypeScript"]
github: "https://github.com/simplysandeepp/Multi-Agent-Resumer"
featured: false
---

## Overview

An **agentic resume builder** where specialized AI agents collaborate to tailor a resume to a specific job — analyzing the job description, rewriting content, scoring against ATS, and formatting the result, each handled by a focused agent rather than one monolithic prompt.

## The Problem

Generic resumes get filtered out by ATS and don't speak to a specific role. Manually tailoring a resume per application is tedious. This system automates the tailoring while keeping the reasoning transparent and modular.

## What I Built

A multi-agent pipeline where each agent owns one job:

- **JD analysis agent** — extracts key requirements, skills, and keywords from the job description
- **Content rewriting agent** — rewrites resume sections to match the target role
- **ATS scoring agent** — evaluates the resume against ATS criteria and surfaces gaps
- **Formatting agent** — produces a clean, structured final document

## Tech Stack

**Backend / Agents:** Python, FastAPI, LangChain, Groq LLM

**Frontend:** React, TypeScript

## Use Case

Job seekers who want a resume tailored and ATS-optimized for a specific posting — automatically, with each step (analysis → rewrite → score → format) handled by a dedicated agent.
