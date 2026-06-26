---
title: "What I learned building RAG pipelines in production"
description: "Moving from RAG demos to something that actually works at scale — chunking strategies, hybrid retrieval, and the failures nobody talks about."
date: "2025-01-10"
tags: ["RAG", "LangChain", "AI Engineering"]
published: true
---

Retrieval-Augmented Generation looks simple in tutorials. You embed some documents, store them in a vector database, retrieve the top-k chunks, and stuff them into a prompt. Done.

Production is different.

## The chunking problem nobody tells you about

Fixed-size chunking (e.g. 500 tokens, 50 token overlap) works for demos. It falls apart when your documents have structure — code files, markdown with headers, API documentation.

The problem: a fixed chunk boundary cuts right through a function definition or splits a table in half. The retrieved chunk is syntactically incomplete, and the LLM either ignores it or hallucinates the missing part.

**What actually helped**: semantic chunking based on structure. For code, chunk by function/class boundaries. For markdown, chunk by heading hierarchy. For plain text, use a sentence splitter that respects paragraph boundaries. The chunks are less uniform in size but dramatically more useful.

## Pure semantic search has a vocabulary problem

Semantic search (cosine similarity over embeddings) is great at finding conceptually similar content. It's terrible when the user is searching for a specific identifier: a function name, a config key, a variable.

Example: searching for `useAuthContext` in a React codebase. The embedding model has no idea this is a specific function — it just sees tokens that look like camelCase. Semantic search returns vaguely "auth" and "context" related chunks, not the one that defines `useAuthContext`.

Adding BM25 as a second retriever and combining results with Reciprocal Rank Fusion (RRF) fixed this. The hybrid approach gets the best of both: semantic similarity AND exact lexical matching.

Recall improved by roughly 30% on our internal eval set.

## LangGraph was the right call for complex flows

For simple Q&A over documents, a chain is fine. Once you need branching — reroute to a different retriever if the first fails, ask a clarifying question if the query is ambiguous, run a self-critique step before returning — you need something more structured.

LangGraph makes the state machine explicit. Each node is a function, each edge is a condition. You can debug exactly where a conversation went wrong. You can add retry logic at specific nodes without making the whole graph messy.

The initial setup cost is higher than a simple chain. It's worth it once you have more than 3-4 distinct steps in your flow.

## Failure modes to watch for

**Silent hallucination on empty retrieval**: if the retriever returns nothing relevant, the LLM doesn't say "I couldn't find anything" — it makes something up that sounds plausible. Add an explicit step that checks retrieval quality before generating.

**Context window stuffing**: retrieving 10 chunks to be safe sounds reasonable until your users ask follow-up questions and the conversation history is eating 60% of your context budget. Be deliberate about how much retrieved context you use.

**Embedding model drift**: if you retrain or swap your embedding model, re-embed everything. Mixing embeddings from different models in the same vector store produces garbage retrieval.

---

These aren't novel insights — everyone working in this space runs into the same walls. But they took me longer to internalize than they should have, and I don't see them covered clearly in most RAG tutorials.
