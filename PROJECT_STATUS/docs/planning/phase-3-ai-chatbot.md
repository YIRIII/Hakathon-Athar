# Phase 3: AI Heritage Chatbot

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Research Links
- **Business Research:** BR-4 (AI Chatbot Text) — Score 4.60 → [04-ai-chatbot.md](../../project_documents/BUSINESS_RESEARCH/04-ai-chatbot.md)
- **Technical Options:** TC-3 (AI Heritage Chatbot RAG) → [03-ai-heritage-chatbot.md](../../project_documents/TECHNICAL_OPTIONS/03-ai-heritage-chatbot.md)
- **PRD:** F3 (AI Heritage Chatbot — Text-Based)

## Recommended Tech Stack
- **LLM:** Gemini 2.5 Flash-Lite via Vercel AI SDK
- **RAG:** Supabase pgvector + Gemini text-embedding-004
- **Tracing:** Langfuse (free tier)
- **Streaming:** Vercel AI SDK useChat hook

## Estimated Cost
$0 cash (Gemini free tier: 1M+ tokens/day for Flash-Lite)

## Budget Context
- **Active tier:** Bootstrap
- **Phase cost vs. budget:** $0
- **Sanity check:** PASS

## Prerequisites
- Phase 0 must be complete (Supabase with pgvector extension)
- Phase 1 should be complete (heritage content needed for knowledge base)

## Implementation Steps
- [ ] **3.1:** Enable pgvector extension in Supabase and create embeddings table — heritage_embeddings with vector(768) column
- [ ] **3.2:** Build heritage knowledge base ingestion pipeline — chunk site narratives, historical facts, visitor info into embeddings using Gemini text-embedding-004
- [ ] **3.3:** Set up Vercel AI SDK with Gemini Flash-Lite — API route for chat completions with streaming
- [ ] **3.4:** Implement RAG retrieval — query pgvector for relevant heritage context, inject into LLM prompt with source attribution
- [ ] **3.5:** Build chat UI component — streaming messages, heritage-themed styling, Arabic/English support, source citations displayed
- [ ] **3.6:** Create system prompt with Islamic cultural guardrails — no prophet voice impersonation, respectful tone for sacred sites, source attribution required, scholarly third-person voice
- [ ] **3.7:** Implement usage limits — free tier: 3 questions per site visit, premium: unlimited (limit tracking in Supabase)
- [ ] **3.8:** Set up Langfuse tracing — track all LLM calls, measure latency, detect hallucination patterns
- [ ] **3.9:** Add contextual awareness — chatbot knows which site the user is viewing, personalizes responses to current location

## Key Decisions (from research)
- Gemini Flash-Lite over GPT-4.1/Claude — free tier is extremely generous (1M+ tokens/day), sufficient for MVP scale
- Vercel AI SDK over direct API — provides useChat hook, streaming, and provider abstraction (can swap to Claude/GPT later)
- pgvector over Pinecone/Weaviate — already using Supabase, no additional service, free
- RAG over fine-tuning — heritage content changes (new sites added), RAG updates without retraining
- Hybrid Dialogue + RAG over pure RAG — some questions need conversational context, not just retrieval

## Acceptance Criteria
- Chatbot responds in <5s first token (NFR-3) with streaming
- Responses include source attribution (which heritage document/site)
- No prophet voice impersonation or disrespectful content about sacred sites
- Arabic and English conversations supported
- Free tier limit enforced (3 questions/site visit)
- Langfuse traces all conversations for quality monitoring
- Knowledge base covers all 10-12 seeded heritage sites

## Competitive Context
- No AI chatbot combines heritage domain knowledge with Islamic cultural guardrails for Makkah/Madinah
- 17 competitors identified but none with RAG-based heritage Q&A for Saudi holy sites

## Research Gaps
- No PRICING_STRATEGY: Free tier limit (3 questions) based on PRD spec, not WTP research
- No CONSTRAINT_VALIDATION: Gemini free tier rate limits under concurrent usage not formally tested
- No RISK_ASSESSMENT: AI hallucination risk for Islamic heritage content not formally assessed — Langfuse monitoring is the mitigation
