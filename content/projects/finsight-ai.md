---
title: "FinSight AI"
description: "An AI-powered financial intelligence platform — four parallel agents deliver revenue forecasts, buy/sell signals, and peer benchmarks in under 10 seconds."
date: "2025-03-01"
tags: ["Python", "FastAPI", "React", "XGBoost", "Groq LLaMA", "Gemini 2.0", "Docker"]
github: "https://github.com/simplysandeepp/finSight-AI"
featured: true
priority: 2
---

## Overview

FinSight AI automates financial analysis that traditionally takes analysts hours. Enter a ticker and a date — get a revenue forecast, buy/sell signal, peer benchmarks, and a full audit trail in under 10 seconds.

## The Problem

Traditional financial analysis means reading earnings transcripts manually, building Excel models, monitoring news, and running competitive comparisons. FinSight AI integrates all of it into a single, fast pipeline.

## Architecture

Four specialized AI agents run concurrently via Python `asyncio`:

**Transcript NLP Agent** — Extracts and summarizes key financial drivers from earnings call transcripts using Groq LLaMA / Gemini 2.0.

**Financial Model Agent** — Performs quantitative forecasting using an XGBoost ML model trained on historical financials.

**News Macro Agent** — Aggregates, classifies, and scores macro news sentiment relevant to the target company.

**Competitor Agent** — Pulls and analyzes data to benchmark against industry peers.

A final **Ensembler (CIO Agent)** fuses all four outputs into one calibrated investment signal.

## Key Outputs

- Revenue and EBITDA forecasts with confidence intervals
- Buy / Hold / Sell / Monitor recommendation with AI-generated reasoning
- Ensemble confidence score (0–100%) aggregating all four agents
- Key sentence extraction from earnings transcripts
- Full prediction log in SQLite

## Status

Ongoing — actively in development.
