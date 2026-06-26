---
title: "Production RAG Pipeline"
description: "A retrieval-augmented generation system built for DrCode — handles multi-turn conversations over large codebases."
date: "2024-11-01"
tags: ["RAG", "LangGraph", "Python", "FastAPI", "PostgreSQL"]
github: "https://github.com/simplysandeepp"
featured: true
---

## Overview

A production-grade RAG system built at DrCode that enables developers to query large codebases in natural language. The system handles multi-turn conversations, maintains context across sessions, and retrieves from a hybrid vector + keyword index.

## What I built

- Chunking and embedding pipeline that processes entire repositories (Python, TypeScript, Java) into a searchable vector store
- Hybrid retrieval layer combining semantic search (pgvector) with BM25 keyword matching — improved recall by ~30% over pure semantic search
- LangGraph-based conversation flow with tool-calling for code navigation
- FastAPI backend with streaming responses for real-time output
- Session memory management to handle multi-turn context without blowing up the context window

## Technical decisions

**Why LangGraph over a simple chain**: The retrieval flow needed branching logic — sometimes rerouting to a different retriever, sometimes asking for clarification. LangGraph made the control flow explicit and testable.

**Hybrid retrieval**: Pure semantic search failed on specific identifiers (function names, config keys). Adding BM25 as a second ranker and using RRF (Reciprocal Rank Fusion) to merge results fixed most of these cases.

## Outcome

Deployed to production at DrCode. Handles hundreds of queries per day across multiple customer codebases.
