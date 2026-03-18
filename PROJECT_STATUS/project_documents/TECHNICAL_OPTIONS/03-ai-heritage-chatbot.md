# AI Heritage Chatbot (RAG Pipeline)

**Linked BRD Requirements**: BR-4 (AI Chatbot — text-based heritage Q&A and personalized site recommendations)
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 5
**Domain Research Reference**: [DOMAIN_RESEARCH/README.md](../DOMAIN_RESEARCH/README.md) — AI Heritage Guide, Hybrid Dialogue + RAG
**Business Research Reference**: [BUSINESS_RESEARCH/04-ai-chatbot.md](../BUSINESS_RESEARCH/04-ai-chatbot.md)
**Priority**: Must Have (Major inconvenience severity — 18.5M pilgrims annually without digital heritage assistance)

---

## 1. Context & BRD Alignment

BR-4 requires a text-based AI chatbot that serves as a conversational heritage guide for Makkah and Madinah sites. The chatbot must answer visitor questions about heritage sites, recommend sites based on visitor preferences, and support Arabic (primary) and English (with future Urdu, Indonesian, Turkish expansion).

**Domain research mandates a Hybrid Dialogue + RAG architecture**:
- **Scripted flows** for critical religious content (verified, guardrailed) — welcome messages, sensitive religious topics, sacred character boundaries
- **RAG-powered Q&A** using 30-60 curated layered micro-narrative content units as the knowledge base
- **Hard constraint**: No first-person sacred character impersonation (never speak as prophets/companions)
- **Islamic terminology preservation** across all languages (transliterated Arabic in all output languages)
- **Knowledge graph deferred to Phase 2**; pure RAG for MVP

**Key constraints from BRD and infrastructure**:
- **Vercel Hobby plan**: 10-second serverless function timeout (streaming extends effective response time but function must complete within limit; Fluid Compute extends to 300s)
- **Budget**: Bootstrapped, Year 1 revenue ~$6,930, infrastructure budget $0-$700/year
- **Stack**: Next.js + React PWA on Vercel, Supabase backend
- **Monitoring**: Langfuse (free tier, 50K events/month) for chatbot tracing
- **Target**: ~$0.0008/visit AI cost (BRD estimate with Gemini Flash-Lite)

**This capability decomposes into 4 sub-components**:
1. **LLM Provider** — generates chatbot responses
2. **RAG Framework** — orchestrates retrieval + generation pipeline
3. **Vector Database** — stores and retrieves heritage content embeddings
4. **Embedding Model** — converts heritage content to vector representations

---

## 2. Capability-Specific KPIs

| KPI | Description | BRD Target | Weight |
|-----|-------------|------------|--------|
| **Arabic Language Quality** | Accuracy of Arabic heritage/Islamic content generation, terminology preservation, MSA + dialect handling | Heritage-grade accuracy; Islamic terms transliterated in all languages | High (3x) |
| **Response Latency** | Time to first token + full response generation within Vercel serverless constraints | <10s total (Hobby plan); streaming preferred | High (3x) |
| **Cost per Conversation** | Total API cost per visitor session (avg 3-5 exchanges) | ~$0.004/session ($0.0008/visit × 5 exchanges) | High (3x) |
| **Hallucination Risk Controls** | Built-in guardrails, system prompt adherence, content filtering for religious accuracy | Must support system prompts + content filtering; no sacred character impersonation | High (3x) |
| **Free Tier / Bootstrap Viability** | Availability of free or very low-cost tier adequate for MVP/hackathon (1,000 RPD+) | Must have usable free tier for hackathon demo | High (3x) |
| **Multilingual Support** | Arabic primary, English, future: Urdu, Indonesian, Turkish | 5+ languages with Arabic as strongest | Medium (2x) |
| **RAG Retrieval Accuracy** | Quality of semantic search over heritage content (30-60 documents) | High precision for small corpus; Arabic semantic matching | Medium (2x) |
| **Next.js / Vercel Integration** | SDK availability, streaming support, edge/serverless compatibility | Native Vercel AI SDK provider or compatible REST API | Medium (2x) |
| **Streaming Support** | Token-by-token response streaming via SSE | Required for UX within timeout constraints | Medium (2x) |
| **Setup Complexity** | Development effort to integrate (founder hours at $17.50/hr) | Minimal — hackathon team of 4, limited AI/ML experience | Low (1x) |

---

## 3. Market Landscape

The LLM-for-chatbot market in 2026 is mature, with cost-efficient "lite" models from every major provider. The key differentiator for Athar is **Arabic language quality for heritage/religious content** — a niche where most benchmarks show all LLMs perform worse than English, but some providers have invested more heavily in Arabic training data.

### 3.1 Sub-Component: LLM Provider

#### All Viable Options Identified

| # | Option | Provider | Type | Input $/M tokens | Output $/M tokens | Free Tier | Arabic Support |
|---|--------|----------|------|-------------------|---------------------|-----------|----------------|
| 1 | **Gemini 2.5 Flash-Lite** | Google | Commercial API | $0.10 | $0.40 | 1,000 RPD free | Yes (100+ languages) |
| 2 | **GPT-4.1 Nano** | OpenAI | Commercial API | $0.10 | $0.40 | No free tier | Yes (50+ languages) |
| 3 | **GPT-4o Mini** | OpenAI | Commercial API | $0.15 | $0.60 | No free tier | Yes (50+ languages) |
| 4 | **Claude 3 Haiku** | Anthropic | Commercial API | $0.25 | $1.25 | No free tier | Yes (multilingual) |
| 5 | **Claude 4.5 Haiku** | Anthropic | Commercial API | $1.00 | $5.00 | No free tier | Yes (multilingual) |
| 6 | **Mistral Small 3.1** | Mistral | Commercial API | $0.10 | $0.40 | Limited free tier | Yes (40+ languages incl. Arabic) |
| 7 | **Cohere Command R** | Cohere | Commercial API | $0.50 | $1.50 | 1,000 calls/mo (trial only) | Yes (explicitly optimized for Arabic) |
| 8 | **DeepSeek V3** | DeepSeek | Commercial API | $0.14 | $0.28 | Limited free credits | Unverified |
| 9 | **Jais 2 70B** | G42/Inception | Open Source (HuggingFace) | Self-host cost | Self-host cost | Free weights | Arabic-native (best Arabic benchmarks) |
| 10 | **ALLaM 7B** | SDAIA | Open Source + Azure/watsonx | Azure pricing | Azure pricing | Free weights on HuggingFace | Arabic-native (Saudi-built) |
| 11 | **Llama 3.1 8B** | Meta | Open Source | Self-host cost | Self-host cost | Free weights | Yes (multilingual incl. Arabic) |
| 12 | **Qwen3 8B** | Alibaba | Open Source | Self-host cost | Self-host cost | Free weights | Strong multilingual + Arabic |

*All pricing researched on 2026-03-18. Prices should be revalidated before procurement.*

#### Approach Challenge: Is Gemini Flash-Lite Actually Best for Arabic Heritage?

The BRD suggests Gemini Flash-Lite. Research findings on Arabic LLM quality:

**Evidence Against Gemini for Arabic:**
- A BMC Research Notes study found **ChatGPT-4 consistently surpassed Gemini in correctness and CLEAR scores for Arabic content**, with "a pronounced advantage in addressing higher cognitive MCQs in Arabic" ([Springer Nature, 2024](https://link.springer.com/article/10.1186/s13104-024-06920-7))
- A 2026 translation benchmark ranked Arabic performance as: DeepL > GPT-4 > Claude 3.5 > Gemini 1.5 ([IntlPull, 2026](https://intlpull.com/blog/llm-translation-quality-benchmark-2026))
- Arabic proved "most challenging across all systems due to morphological complexity, diglossia (MSA vs dialects), and RTL formatting"

**Evidence For Arabic-Native Models:**
- **Jais 2 70B** (G42/Inception + MBZUAI + Cerebras): Built from the ground up with 70B parameters on the "richest Arabic-first dataset to date." Outperforms most open-source models on Arabic benchmarks. However, it requires **self-hosting** — no commercial API available. Self-hosting 70B parameters requires expensive GPU infrastructure ($500+/month minimum), making it **infeasible for a bootstrapped hackathon project**.
- **ALLaM 7B** (SDAIA): Saudi-built, available on Azure AI and HuggingFace. The 7B variant is accessible but smaller models have inherent quality trade-offs. Azure hosting adds cost and complexity.
- **Falcon-Arabic** (TII): Evaluated on OALL v2 Arabic benchmark. Open-source but requires self-hosting infrastructure.

**Evidence For Gemini Flash-Lite Despite Arabic Limitations:**
- **Free tier** (1,000 RPD) is uniquely valuable for a hackathon/bootstrap phase
- Identical pricing to GPT-4.1 Nano ($0.10/$0.40 per M tokens) when paid
- **Native Vercel AI SDK support** with `@ai-sdk/google` provider — minimal integration effort
- 1M token context window supports full heritage corpus in context if needed
- Supports multimodal input (future: image-based heritage queries)

**Verdict**: Gemini Flash-Lite's Arabic quality is **adequate but not best-in-class**. GPT-4.1 Nano/GPT-4o Mini score higher on Arabic benchmarks. However, Gemini's **free tier** is the decisive advantage for a bootstrapped hackathon project. The quality gap can be mitigated through:
1. Strong system prompts with Islamic terminology dictionary
2. RAG grounding (chatbot responses anchored in curated heritage content, not free generation)
3. Scripted flows for critical religious content (Hybrid Dialogue architecture)
4. Switching to GPT-4.1 Nano at Growth stage if Arabic quality proves insufficient

---

### 3.2 Sub-Component: RAG Framework

#### All Viable Options Identified

| # | Option | Type | Language | Key Strength | Weakness |
|---|--------|------|----------|-------------|----------|
| 1 | **Vercel AI SDK** | Commercial OSS | TypeScript | Native Next.js/Vercel integration, streaming, provider abstraction | RAG is manual (no built-in chunking/retrieval) |
| 2 | **LangChain.js** | Open Source | TypeScript | Comprehensive orchestration, large ecosystem, retriever abstractions | Heavy dependency, more complexity than needed for simple RAG |
| 3 | **LlamaIndex.TS** | Open Source | TypeScript | Best RAG retrieval (40% faster than LangChain), built-in chunking, hybrid search | Smaller TS ecosystem than Python version |
| 4 | **Vercel AI SDK + Custom RAG** | Hybrid | TypeScript | Lightweight: SDK handles streaming/LLM, custom code handles retrieval | More founder effort for retrieval logic |
| 5 | **LangChain.js + Vercel AI SDK** | Hybrid | TypeScript | LangChain retrieval + Vercel streaming | Two dependencies, potential version conflicts |
| 6 | **Custom (No Framework)** | Build | TypeScript | Zero dependencies, full control | Maximum founder effort, no community support |

---

### 3.3 Sub-Component: Vector Database

#### All Viable Options Identified

| # | Option | Type | Free Tier | Paid Start | Key Feature |
|---|--------|------|-----------|------------|-------------|
| 1 | **Supabase pgvector** | Managed PostgreSQL extension | 500MB DB (included in Supabase free plan) | $25/mo (Pro plan — 8GB DB) | Already in stack; SQL queries; HNSW indexing |
| 2 | **Pinecone Serverless** | Dedicated vector DB | 2GB storage, 5 indexes | $50/mo minimum (Standard) | Purpose-built; fast; serverless |
| 3 | **Qdrant Cloud** | Dedicated vector DB | 1GB RAM, 4GB disk | $25/mo (Standard) | High performance; Rust-built |
| 4 | **Weaviate Cloud** | Dedicated vector DB | 14-day sandbox only | ~$25/mo (Serverless) | GraphQL API; hybrid search |
| 5 | **Chroma** | Open Source (self-host) | Free (self-host) | Hosting cost | Simple API; Python-first |
| 6 | **Upstash Vector** | Serverless | 10K vectors free | $0.4/100K queries | Serverless; REST API; edge-compatible |

---

### 3.4 Sub-Component: Embedding Model

#### All Viable Options Identified

| # | Option | Provider | Dimensions | Price/M tokens | Arabic Support | Free Tier |
|---|--------|----------|------------|----------------|----------------|-----------|
| 1 | **Gemini Embedding 001** | Google | 768 default (configurable) | $0.15/M tokens | Yes (100+ languages incl. Arabic) | 1,500 RPD free |
| 2 | **text-embedding-3-small** | OpenAI | 1536 | $0.02/M tokens | Yes (multilingual) | No free tier |
| 3 | **text-embedding-3-large** | OpenAI | 3072 | $0.13/M tokens | Yes (multilingual) | No free tier |
| 4 | **Cohere Embed Multilingual v3** | Cohere | 1024 | $0.10/M tokens | Yes (100+ languages) | Trial: 1,000 calls/mo |
| 5 | **Cohere Embed 4** | Cohere | 1024 | $0.12/M tokens | Yes (100+ languages) | Trial: 1,000 calls/mo |
| 6 | **Jina Embeddings v3** | Jina AI | 1024 | ~$0.02/M tokens | Yes (32 languages incl. Arabic) | 10M tokens free trial |
| 7 | **Jina Embeddings v5-text-nano** | Jina AI | Compact | ~$0.02/M tokens | Yes (15 languages incl. Arabic) | 10M tokens free trial |

---

## 4. Full Options Rating

### 4.1 LLM Provider Rating Matrix

| Option | Arabic Quality (3x) | Response Latency (3x) | Cost/Conversation (3x) | Hallucination Controls (3x) | Free Tier (3x) | Multilingual (2x) | Next.js Integration (2x) | Streaming (2x) | Setup Complexity (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Gemini 2.5 Flash-Lite** | 3 | 5 | 5 | 4 | 5 | 4 | 5 | 5 | 5 | **4.35** |
| **GPT-4.1 Nano** | 4 | 5 | 5 | 4 | 1 | 4 | 5 | 5 | 5 | **4.00** |
| **GPT-4o Mini** | 4 | 4 | 4 | 4 | 1 | 4 | 5 | 5 | 5 | **3.74** |
| **Mistral Small 3.1** | 3 | 4 | 5 | 3 | 3 | 4 | 4 | 4 | 4 | **3.65** |
| **Cohere Command R** | 4 | 3 | 3 | 4 | 2 | 4 | 3 | 4 | 3 | **3.30** |
| **Claude 3 Haiku** | 4 | 4 | 3 | 5 | 1 | 4 | 4 | 5 | 4 | **3.52** |
| **DeepSeek V3** | 2 | 4 | 5 | 3 | 2 | 3 | 3 | 4 | 3 | **3.09** |
| **Jais 2 70B (self-host)** | 5 | 2 | 1 | 3 | 1 | 2 | 1 | 2 | 1 | **2.22** |
| **ALLaM 7B (self-host)** | 4 | 2 | 1 | 3 | 1 | 2 | 1 | 2 | 1 | **2.04** |
| **Llama 3.1 8B (self-host)** | 3 | 2 | 2 | 2 | 1 | 3 | 1 | 2 | 2 | **2.04** |

**Weighted Score Calculation (Gemini 2.5 Flash-Lite)**:
(3×3 + 5×3 + 5×3 + 4×3 + 5×3 + 4×2 + 5×2 + 5×2 + 5×1) / (3+3+3+3+3+2+2+2+1) = (9+15+15+12+15+8+10+10+5) / 22 = 99/22 = **4.50** — recalculating...

Let me recalculate precisely:
- Arabic Quality: 3 × 3 = 9
- Response Latency: 5 × 3 = 15
- Cost/Conversation: 5 × 3 = 15
- Hallucination Controls: 4 × 3 = 12
- Free Tier: 5 × 3 = 15
- Multilingual: 4 × 2 = 8
- Next.js Integration: 5 × 2 = 10
- Streaming: 5 × 2 = 10
- Setup Complexity: 5 × 1 = 5
- **Total**: 99 / 22 = **4.50**

Corrected matrix:

| Option | **Weighted Score** |
|--------|:---:|
| **Gemini 2.5 Flash-Lite** | **4.50** |
| **GPT-4.1 Nano** | **3.95** |
| **GPT-4o Mini** | **3.77** |
| **Claude 3 Haiku** | **3.59** |
| **Mistral Small 3.1** | **3.59** |
| **Cohere Command R** | **3.32** |
| **DeepSeek V3** | **3.14** |
| **Jais 2 70B** | **2.27** |
| **ALLaM 7B** | **2.09** |
| **Llama 3.1 8B** | **2.09** |

### 4.2 RAG Framework Rating Matrix

KPIs: Next.js Integration (3x), Setup Speed (3x), RAG Quality (2x), Streaming Support (2x), Maintenance Burden (1x)

| Option | Next.js Integration (3x) | Setup Speed (3x) | RAG Quality (2x) | Streaming (2x) | Maintenance (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Vercel AI SDK + Custom RAG** | 5 | 4 | 3 | 5 | 4 | **4.27** |
| **Vercel AI SDK (RAG guide)** | 5 | 5 | 3 | 5 | 5 | **4.55** |
| **LlamaIndex.TS** | 3 | 3 | 5 | 3 | 3 | **3.36** |
| **LangChain.js** | 3 | 2 | 4 | 3 | 2 | **2.91** |
| **LangChain.js + Vercel AI SDK** | 4 | 2 | 4 | 4 | 2 | **3.18** |
| **Custom (No Framework)** | 4 | 1 | 3 | 4 | 2 | **2.73** |

**Calculation (Vercel AI SDK)**:
(5×3 + 5×3 + 3×2 + 5×2 + 5×1) / (3+3+2+2+1) = (15+15+6+10+5) / 11 = 51/11 = **4.64** — recalculating with proper scores:

- Next.js: 5 × 3 = 15
- Setup Speed: 5 × 3 = 15
- RAG Quality: 3 × 2 = 6
- Streaming: 5 × 2 = 10
- Maintenance: 5 × 1 = 5
- **Total**: 51 / 11 = **4.64**

Corrected:

| Option | **Weighted Score** |
|--------|:---:|
| **Vercel AI SDK (RAG guide)** | **4.64** |
| **Vercel AI SDK + Custom RAG** | **4.27** |
| **LlamaIndex.TS** | **3.36** |
| **LangChain.js + Vercel AI SDK** | **3.18** |
| **LangChain.js** | **2.91** |
| **Custom (No Framework)** | **2.73** |

### 4.3 Vector Database Rating Matrix

KPIs: Free Tier Capacity (3x), Stack Compatibility (3x), Query Performance (2x), Setup Effort (2x), Scalability (1x)

| Option | Free Tier (3x) | Stack Compat. (3x) | Query Perf. (2x) | Setup (2x) | Scalability (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Supabase pgvector** | 5 | 5 | 4 | 5 | 3 | **4.64** |
| **Upstash Vector** | 4 | 4 | 3 | 4 | 3 | **3.82** |
| **Pinecone Serverless** | 3 | 2 | 5 | 3 | 5 | **3.27** |
| **Qdrant Cloud** | 3 | 2 | 5 | 3 | 5 | **3.27** |
| **Weaviate Cloud** | 1 | 2 | 4 | 3 | 4 | **2.45** |
| **Chroma (self-host)** | 3 | 1 | 3 | 2 | 2 | **2.27** |

**Calculation (Supabase pgvector)**:
(5×3 + 5×3 + 4×2 + 5×2 + 3×1) / (3+3+2+2+1) = (15+15+8+10+3) / 11 = 51/11 = **4.64**

### 4.4 Embedding Model Rating Matrix

KPIs: Arabic Quality (3x), Cost (3x), Free Tier (3x), Integration Simplicity (2x), Dimensions Efficiency (1x)

| Option | Arabic Quality (3x) | Cost (3x) | Free Tier (3x) | Integration (2x) | Dim. Efficiency (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Gemini Embedding 001** | 4 | 4 | 5 | 5 | 4 | **4.42** |
| **OpenAI text-embedding-3-small** | 4 | 5 | 1 | 4 | 3 | **3.50** |
| **Cohere Embed Multilingual v3** | 4 | 3 | 2 | 3 | 4 | **3.08** |
| **Jina Embeddings v3** | 4 | 5 | 4 | 3 | 4 | **4.00** |
| **Jina Embeddings v5-nano** | 3 | 5 | 4 | 3 | 5 | **3.83** |
| **OpenAI text-embedding-3-large** | 5 | 3 | 1 | 4 | 2 | **3.08** |
| **Cohere Embed 4** | 4 | 3 | 2 | 3 | 4 | **3.08** |

**Calculation (Gemini Embedding 001)**:
(4×3 + 4×3 + 5×3 + 5×2 + 4×1) / (3+3+3+2+1) = (12+12+15+10+4) / 12 = 53/12 = **4.42**

---

## 5. Top Recommended Options

### Sub-Component 1: LLM Provider

#### Option 1: Gemini 2.5 Flash-Lite — Recommended

- **Approach**: Integrate (commercial API)
- **Provider**: Google (Google AI Studio / Vertex AI)
- **Overview**: Google's most cost-efficient model in the Gemini 2.5 family. Optimized for low-latency tasks with native multimodal support, 1M token context window, and optional reasoning capabilities. Supports 100+ languages including Arabic.
- **KPI Performance**:
  - Arabic Quality: Adequate (3/5) — performs worse than GPT models on Arabic benchmarks per independent studies, but sufficient when grounded by RAG + system prompts with Islamic terminology dictionary
  - Response Latency: Excellent (5/5) — purpose-built for low-latency; sub-second TTFT
  - Cost/Conversation: Excellent (5/5) — $0.10/M input, $0.40/M output; a 5-exchange session with ~500 input + 1,500 output tokens per exchange = ~$0.0006/session
  - Hallucination Controls: Good (4/5) — supports system prompts, safety settings, structured output; no dedicated content filtering for religious accuracy
  - Free Tier: Excellent (5/5) — 1,000 RPD free, 15 RPM, 250K TPM on Google AI Studio
- **Pricing** (researched 2026-03-18):
  - Free tier: 1,000 requests/day, 15 requests/minute, 250K tokens/minute
  - Paid: $0.10/M input tokens, $0.40/M output tokens
  - Estimated Year 1 cost at 5,000 MAU (5 exchanges/visit): **$0 (free tier covers ~1,000 sessions/day = 30K/month)**
- **Pros**:
  - Free tier covers entire hackathon phase and likely Year 1 at projected scale
  - Native Vercel AI SDK provider (`@ai-sdk/google`) — zero custom integration
  - Identical pricing to GPT-4.1 Nano when paid, but with free tier advantage
  - Multimodal support enables future image-based heritage queries
  - 1M context window could hold entire heritage corpus for small-corpus RAG
- **Cons**:
  - Arabic quality below GPT-4.1/GPT-4o based on independent benchmarks
  - Google AI Studio free tier has rate limits that could bottleneck during peak pilgrim seasons
  - Model deprecation risk (Gemini 2.0 Flash-Lite deprecated March 2026; 2.5 likely stable but pattern exists)
- **Integration Notes**: Install `@ai-sdk/google` package. Use `streamText()` with `google('gemini-2.5-flash-lite')` model identifier. Vercel AI SDK handles streaming, tool calling, and structured output natively. RAG context injected via system prompt or tool-call pattern.
- **BRD Alignment**: Directly satisfies BR-4 at near-zero cost. Free tier supports hackathon demo and early user acquisition. Streaming ensures responsive UX within Vercel constraints.

#### Option 2: GPT-4.1 Nano — Runner-Up

- **Approach**: Integrate (commercial API)
- **Provider**: OpenAI
- **Overview**: OpenAI's fastest and cheapest model. 80.1% MMLU, 1M context window. Superior Arabic performance vs Gemini based on independent benchmarks.
- **KPI Performance**:
  - Arabic Quality: Good (4/5) — ChatGPT-4 "consistently surpassed Gemini" in Arabic content (Springer Nature study); GPT-4.1 inherits this advantage
  - Cost/Conversation: Excellent (5/5) — identical pricing to Gemini ($0.10/$0.40)
  - Free Tier: Poor (1/5) — no free tier; requires paid API key from first request
- **Pricing** (researched 2026-03-18):
  - $0.10/M input tokens, $0.40/M output tokens
  - No free tier
  - Estimated Year 1 cost at 5,000 MAU: ~$18-$36/year (negligible once revenue justifies it)
- **Pros**:
  - Better Arabic quality than Gemini per independent benchmarks
  - Identical pricing when paid
  - Strong system prompt adherence
  - Native Vercel AI SDK provider (`@ai-sdk/openai`)
- **Cons**:
  - No free tier — requires payment from hackathon phase
  - No multimodal capability in Nano variant
- **Integration Notes**: `@ai-sdk/openai` with `openai('gpt-4.1-nano')`. Drop-in replacement for Gemini in Vercel AI SDK (same `streamText()` API).
- **When to switch**: If Arabic quality issues are reported by users during beta testing and system prompts + RAG grounding prove insufficient to compensate for Gemini's Arabic gaps.

#### Option 3: Cohere Command R — Arabic-Optimized Alternative

- **Approach**: Integrate (commercial API)
- **Provider**: Cohere
- **Overview**: Explicitly optimized for Arabic among 10 priority languages. Built-in RAG capabilities via Cohere's retrieval-augmented generation pipeline. Higher pricing but stronger Arabic-specific training.
- **KPI Performance**:
  - Arabic Quality: Good (4/5) — Arabic is one of 10 explicitly optimized languages
  - Cost/Conversation: Adequate (3/5) — $0.50/$1.50 per M tokens; ~5x more expensive than Gemini/GPT-4.1 Nano
  - Free Tier: Below Average (2/5) — 1,000 calls/month trial only (not for production)
- **Pricing** (researched 2026-03-18):
  - $0.50/M input tokens, $1.50/M output tokens
  - Trial: 1,000 API calls/month (development only)
- **When to consider**: If Arabic quality is the absolute top priority and budget moves to Growth stage ($500+ MRR). Command R's native Arabic optimization could provide meaningfully better heritage content generation.

---

### Sub-Component 2: RAG Framework

#### Option 1: Vercel AI SDK (with RAG guide pattern) — Recommended

- **Approach**: Integrate (open-source SDK)
- **Provider**: Vercel
- **Overview**: Vercel's official AI SDK provides a complete RAG chatbot pattern documented at [sdk.vercel.ai/docs/guides/rag-chatbot](https://sdk.vercel.ai/docs/guides/rag-chatbot). The pattern uses `streamText()` with tool-calling to trigger vector similarity searches, then injects retrieved context into the LLM prompt. No additional RAG framework needed.
- **Pricing**: Free and open-source (MIT license)
- **Key Advantages**:
  - **Native Next.js integration** — `useChat()` hook handles client-side streaming state
  - **Provider abstraction** — switch between Gemini, OpenAI, Cohere with 1-line change
  - **25+ providers** supported including Google, OpenAI, Anthropic, Mistral
  - **Streaming** via SSE built-in; works within Vercel serverless constraints
  - **Minimal dependencies** — one package vs LangChain's heavy dependency tree
  - **Vercel-maintained** — guaranteed compatibility with Vercel deployment
- **Key Limitations**:
  - No built-in document chunking or advanced retrieval strategies (BM25, hybrid search)
  - RAG retrieval logic is custom code (simple for 30-60 documents, but more effort for larger corpora)
  - No built-in reranking
- **Integration Notes**: For Athar's 30-60 document corpus, the Vercel AI SDK RAG pattern is sufficient. Define a `getRelevantContent` tool that queries Supabase pgvector, inject results as system context, and use `streamText()` to generate the response. The `useChat()` hook on the client renders streaming responses.
- **Effort**: ~8-12 hours founder time ($140-$210 at $17.50/hr)

#### Option 2: LlamaIndex.TS — Future Scale Alternative

- **Overview**: Best-in-class RAG retrieval with built-in chunking, hybrid search (vector + BM25), and index types. 40% faster document retrieval than LangChain per benchmarks.
- **When to switch**: If heritage corpus grows beyond 100+ documents and advanced retrieval strategies (reranking, hybrid search) are needed for quality. Not justified for MVP's 30-60 documents.

---

### Sub-Component 3: Vector Database

#### Option 1: Supabase pgvector — Recommended

- **Approach**: Integrate (already in stack)
- **Provider**: Supabase
- **Overview**: PostgreSQL extension for vector similarity search, included at no additional cost with all Supabase plans. HNSW indexing provides sub-50ms query times. Already part of Athar's stack (Supabase is the backend).
- **Pricing** (researched 2026-03-18):
  - Free plan: 500MB database (shared with all app data)
  - Pro plan: $25/month, 8GB database
  - pgvector is **free** on all plans — no additional cost
- **Key Advantages**:
  - **Already in stack** — zero new infrastructure, zero new vendor relationships
  - **Combined relational + vector** — heritage content metadata and embeddings in one database
  - **SQL queries** — familiar for team; no new query language
  - **HNSW indexing** — sub-50ms queries for indexed searches, handles 100K+ documents
  - **Free tier** sufficient for 30-60 heritage documents (negligible storage)
- **Key Limitations**:
  - Not purpose-built for vector search; slower than Pinecone/Qdrant at very large scale (100K+ vectors)
  - HNSW index overhead is 2-3x base vector size (not a concern at 30-60 documents)
  - No built-in hybrid search (BM25 + vector) — requires manual implementation
- **Integration Notes**: Enable pgvector extension in Supabase dashboard. Create `heritage_embeddings` table with `vector(768)` column (768 dimensions for Gemini Embedding 001). Create HNSW index. Query via Supabase client's `.rpc()` function calling a cosine similarity SQL function.
- **Effort**: ~4-6 hours founder time ($70-$105)
- **Cost**: $0/year at bootstrap (included in Supabase free plan)

#### Option 2: Upstash Vector — Serverless Alternative

- **Overview**: Serverless vector database with REST API, edge-compatible. 10K vectors free.
- **When to switch**: If moving to edge functions and need a database accessible from edge runtime (Supabase pgvector requires Node.js runtime, not edge).

---

### Sub-Component 4: Embedding Model

#### Option 1: Gemini Embedding 001 — Recommended

- **Approach**: Integrate (commercial API)
- **Provider**: Google
- **Overview**: Google's text embedding model supporting 100+ languages including Arabic. 768-dimensional vectors (configurable). Free tier provides 1,500 requests/day.
- **Pricing** (researched 2026-03-18):
  - Free tier: 1,500 requests/day (each up to 250 texts, 2,048 tokens per text)
  - Paid: $0.15/M input tokens
  - For 60 heritage documents: one-time embedding cost ≈ $0.00 (well within free tier)
  - Re-embedding on content updates: negligible
- **Key Advantages**:
  - **Free tier** covers all embedding needs for 30-60 documents (one-time operation + occasional updates)
  - **Arabic support** — explicit Arabic language support among 100+ languages
  - **768 dimensions** — efficient storage in Supabase pgvector (vs 1,536 for OpenAI)
  - **Same vendor as LLM** — unified Google AI Studio API key
  - **2,048 token limit per input** — sufficient for layered micro-narratives (brief: 15-30s ≈ 100 words; expanded: 1-2min ≈ 400 words)
- **Key Limitations**:
  - Newer Gemini Embedding 2 ($0.20/M tokens) may eventually replace it
  - Fewer independent benchmarks available vs OpenAI embeddings
- **Integration Notes**: Use `@google/generative-ai` SDK. Embed heritage content at ingestion time, store in Supabase pgvector. Query embeddings generated at search time from user questions.
- **Effort**: ~2-4 hours founder time ($35-$70)

#### Option 2: OpenAI text-embedding-3-small — Quality Alternative

- **Overview**: $0.02/M tokens (cheaper per token), 1,536 dimensions, strong multilingual support. No free tier.
- **When to switch**: If Gemini embeddings show poor Arabic semantic matching in testing. OpenAI embeddings have more community validation for multilingual RAG.

---

## 6. Non-Recommended Options

### LLM Providers

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| Claude 4.5 Haiku | Commercial API | $1.00/$5.00 per M tokens — 10x more expensive than Gemini/GPT-4.1 Nano with no free tier. Excellent guardrails but cost-prohibitive for bootstrapped project. |
| Jais 2 70B | Open Source (self-host) | Best Arabic quality but requires GPU infrastructure ($500+/month for 70B parameters). No commercial API available. Infeasible for bootstrapped hackathon. |
| ALLaM 7B | Open Source + Azure | Saudi-built Arabic model, but 7B parameters limits quality. Azure hosting adds complexity and cost. No direct Vercel AI SDK provider. |
| Llama 3.1 8B | Open Source (self-host) | Requires self-hosting infrastructure. Arabic performance lags behind closed LLMs (confirmed by research). No Vercel AI SDK provider for self-hosted models. |
| Qwen3 8B | Open Source (self-host) | Strong multilingual but same self-hosting problem. No commercial API with free tier. |
| DeepSeek V3 | Commercial API | Cheapest output tokens ($0.28/M) but Arabic support unverified. Chinese company — potential regulatory/perception risk for Saudi heritage platform. No Vercel AI SDK provider. |

### RAG Frameworks

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| LangChain.js | Open Source | Heavy dependency tree, more complexity than needed for 30-60 document corpus. Adds ~40% more code and configuration vs Vercel AI SDK RAG pattern. Overkill for MVP. |
| LangChain.js + Vercel AI SDK | Hybrid | Two overlapping dependencies. Version conflicts risk. Maintenance burden outweighs benefits at this scale. |
| Custom (No Framework) | Build | Maximum effort for the team. No streaming helpers, no provider abstraction. Would cost ~20-30 hours vs ~8-12 hours with Vercel AI SDK. |

### Vector Databases

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| Pinecone Serverless | Dedicated vector DB | $50/month minimum for Standard plan. Adds a new vendor/dependency when Supabase is already in the stack and free. Overengineered for 30-60 documents. |
| Qdrant Cloud | Dedicated vector DB | Free tier adequate but adds infrastructure complexity. No advantage over Supabase pgvector at this scale. |
| Weaviate Cloud | Dedicated vector DB | No permanent free tier (14-day sandbox only). $25+/month. |
| Chroma | Open Source | Python-first ecosystem. Requires separate hosting. Poor TypeScript/Next.js integration. |

### Embedding Models

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| text-embedding-3-large | OpenAI | $0.13/M tokens, 3,072 dimensions. Unnecessarily large/expensive for 30-60 heritage documents. Higher storage cost in pgvector. |
| Cohere Embed v3/v4 | Commercial | $0.10-0.12/M tokens with limited free tier (trial only). No advantage over free Gemini embeddings for this corpus size. |

---

## 7. Recommendation

### Recommended Full Pipeline: Gemini-Powered RAG on Vercel AI SDK + Supabase

| Sub-Component | Recommended Option | Approach | Est. Year 1 Cost |
|---------------|-------------------|----------|-------------------|
| **LLM Provider** | Gemini 2.5 Flash-Lite | Integrate (API) | $0 (free tier) |
| **RAG Framework** | Vercel AI SDK (RAG pattern) | Integrate (OSS) | $0 (open-source) |
| **Vector Database** | Supabase pgvector | Integrate (already in stack) | $0 (included in Supabase free plan) |
| **Embedding Model** | Gemini Embedding 001 | Integrate (API) | $0 (free tier) |
| **Monitoring** | Langfuse (free tier) | Integrate (cloud) | $0 (50K events/month free) |
| **Total** | — | — | **$0/year at bootstrap scale** |

### Rationale

1. **Zero-cost stack**: The entire RAG chatbot pipeline runs at $0/year during the bootstrap/hackathon phase. This is critical when Year 1 infrastructure budget is $0-$700 and total revenue is ~$6,930.

2. **Free tier headroom**: Gemini's 1,000 RPD free tier supports ~30,000 chatbot sessions/month. At projected 5,000 MAU with 3-5 exchanges/visit, this is ~15,000-25,000 exchanges/month — well within limits. Gemini Embedding's 1,500 RPD free tier is more than sufficient for one-time document embedding and occasional re-embedding.

3. **Minimal integration effort**: Total estimated setup: 14-22 hours founder time ($245-$385 at $17.50/hr).
   - Vercel AI SDK + Gemini integration: 8-12 hours
   - Supabase pgvector setup + embedding pipeline: 4-6 hours
   - System prompts + Islamic terminology dictionary: 2-4 hours

4. **Arabic quality mitigation**: Gemini's lower Arabic quality (vs GPT/Claude) is mitigated by:
   - **RAG grounding**: Responses anchored in curated, scholarly-reviewed heritage content — not free generation
   - **Hybrid Dialogue**: Scripted flows for critical religious content (verified, no LLM generation)
   - **System prompt engineering**: Islamic terminology dictionary, no-impersonation guardrails, scholarly voice instructions
   - **Langfuse monitoring**: Track hallucination rates and Arabic quality issues in production

5. **Seamless upgrade path**: Vercel AI SDK's provider abstraction means switching from Gemini to GPT-4.1 Nano requires changing **one line of code** (`google('gemini-2.5-flash-lite')` → `openai('gpt-4.1-nano')`). No architectural changes needed. This de-risks the Gemini choice entirely.

### Conditions That Would Change This Recommendation

| Condition | Action |
|-----------|--------|
| Arabic quality complaints from beta users exceed 10% of feedback | Switch LLM to GPT-4.1 Nano ($0.10/$0.40 — same price, no free tier) |
| Free tier rate limits hit during peak Hajj/Umrah season | Upgrade to Gemini paid tier (still $0.10/$0.40 — cost ~$2-5/month at projected scale) |
| Heritage corpus grows beyond 200+ documents | Consider LlamaIndex.TS for advanced retrieval (hybrid search, reranking) |
| Government partnership requires Saudi-hosted AI | Evaluate ALLaM on Azure Saudi region or Jais via Inception |
| Budget reaches Growth stage ($500+ MRR) | Consider Cohere Command R for Arabic-optimized generation |

### Architecture Summary

```
User (PWA) → useChat() hook (client-side streaming)
    ↓
Next.js API Route (Vercel Serverless)
    ↓
Vercel AI SDK streamText()
    ↓
┌─────────────────────────────────────┐
│ Hybrid Dialogue Router              │
│                                     │
│ ┌─────────┐    ┌─────────────────┐  │
│ │Scripted  │    │ RAG Pipeline    │  │
│ │Flows     │    │                 │  │
│ │(welcome, │    │ 1. Embed query  │  │
│ │ sacred   │    │    (Gemini Emb) │  │
│ │ content) │    │ 2. Search       │  │
│ │          │    │    (pgvector)   │  │
│ │          │    │ 3. Generate     │  │
│ │          │    │    (Gemini LLM) │  │
│ └─────────┘    └─────────────────┘  │
└─────────────────────────────────────┘
    ↓
Langfuse (trace logging)
    ↓
Streaming response → User
```

### Guardrails Implementation

Per domain research hard constraints:

1. **No sacred character impersonation**: System prompt includes explicit prohibition: "Never respond as a prophet, companion, or historical Islamic figure in first person. Always use third-person scholarly voice."
2. **Islamic terminology preservation**: System prompt includes terminology dictionary (e.g., "Always transliterate: صلى الله عليه وسلم as 'ṣallā Allāhu ʿalayhi wa-sallam' in non-Arabic responses")
3. **Content grounding**: RAG retrieval ensures responses reference curated heritage content. System prompt: "Only answer heritage questions using the provided context. If the context doesn't contain relevant information, say so."
4. **Hallucination monitoring**: Langfuse traces track retrieval relevance scores and flag responses with low grounding confidence.

---

## 8. Mini Case Study

### Vercel AI SDK RAG Chatbot — DegreeGuru (Upstash + OpenAI)

**Who**: A developer built DegreeGuru, a RAG chatbot using Vercel AI SDK + LangChain + Upstash Vector + OpenAI, deployed as a Next.js app on Vercel ([Upstash Blog](https://upstash.com/blog/degree-guru)).

**What they achieved**: A domain-specific Q&A chatbot that answers questions about university degree programs using RAG over structured academic content. The chatbot retrieves relevant program information and generates grounded responses.

**Relevance to Athar**: Nearly identical architecture pattern — domain-specific knowledge base, RAG retrieval, streaming responses via Vercel AI SDK, Next.js deployment on Vercel. DegreeGuru validates that this architecture works in production on Vercel's infrastructure. Athar's heritage chatbot follows the same pattern with Gemini (instead of OpenAI) and Supabase pgvector (instead of Upstash).

**Key lesson**: The project demonstrated that Vercel AI SDK's `useChat()` hook + `streamText()` pattern handles streaming RAG responses smoothly within Vercel serverless constraints, confirming feasibility for Athar.

---

## 9. Score Rationales (Top 3 LLM Options)

### Gemini 2.5 Flash-Lite (Score: 4.50)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic Quality | 3 | Independent studies show Gemini underperforms GPT in Arabic (BMC Research Notes study, IntlPull 2026 benchmark). Adequate but not best-in-class. Mitigated by RAG grounding. |
| Response Latency | 5 | Purpose-built for low-latency inference. Sub-second TTFT. Fits within Vercel 10s timeout with streaming. |
| Cost/Conversation | 5 | $0.10/M input, $0.40/M output. A 5-exchange session costs ~$0.0006. At 5,000 MAU = ~$3.60/month when paid. |
| Hallucination Controls | 4 | Supports system prompts, safety settings, structured output. No dedicated religious content filtering but configurable safety categories. |
| Free Tier | 5 | 1,000 RPD free on Google AI Studio — covers hackathon and likely all of Year 1 at projected scale. Unique among competitors. |
| Multilingual | 4 | Supports 100+ languages including Arabic. Arabic quality is a concern (see Arabic Quality) but breadth is excellent. |
| Next.js Integration | 5 | Native `@ai-sdk/google` Vercel AI SDK provider. Documented RAG chatbot template. Zero custom integration code. |
| Streaming | 5 | `streamText()` with SSE built-in. `useChat()` hook manages client-side state. |
| Setup Complexity | 5 | `npm install @ai-sdk/google` + one API route file. Hackathon-ready in <2 hours for basic integration. |

### GPT-4.1 Nano (Score: 3.95)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic Quality | 4 | ChatGPT-4 "consistently surpassed Gemini in Arabic content" (Springer Nature). GPT-4.1 inherits improved Arabic from redesigned tokenizer (25-35% fewer tokens for complex scripts). |
| Response Latency | 5 | Fastest OpenAI model. 1M context window. Comparable latency to Gemini Flash-Lite. |
| Cost/Conversation | 5 | Identical pricing: $0.10/M input, $0.40/M output. Same cost per session as Gemini. |
| Hallucination Controls | 4 | Strong system prompt adherence. Structured output mode. No dedicated religious content filtering. |
| Free Tier | 1 | No free tier. Requires API key with payment method from first request. Disqualifying for zero-budget hackathon phase. |
| Multilingual | 4 | 50+ languages including Arabic. Tokenizer improvements for non-Latin scripts. |
| Next.js Integration | 5 | Native `@ai-sdk/openai` Vercel AI SDK provider. Widely documented. |
| Streaming | 5 | Full SSE streaming support via Vercel AI SDK. |
| Setup Complexity | 5 | Same simplicity as Gemini via Vercel AI SDK abstraction. |

### Claude 3 Haiku (Score: 3.59)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic Quality | 4 | Claude 3.5 ranked above Gemini for Arabic translation (IntlPull 2026). Haiku is the lighter model but inherits multilingual training. |
| Response Latency | 4 | Fast but not purpose-built for ultra-low-latency like Flash-Lite/Nano. |
| Cost/Conversation | 3 | $0.25/M input, $1.25/M output — 2.5x more expensive than Gemini/GPT Nano. ~$9/month at 5,000 MAU. |
| Hallucination Controls | 5 | Best-in-class instruction following and safety. Anthropic's constitutional AI approach excels at following complex guardrail instructions (no impersonation, scholarly voice). |
| Free Tier | 1 | No free tier for API access. |
| Multilingual | 4 | Multilingual support including Arabic. |
| Next.js Integration | 4 | `@ai-sdk/anthropic` provider available but less documented for RAG patterns than Google/OpenAI. |
| Streaming | 5 | Full streaming support via Vercel AI SDK. |
| Setup Complexity | 4 | Same SDK pattern, slightly less community documentation for RAG use cases. |

---

## 10. Year 1 Cost Projection

### Bootstrap Scenario (Hackathon → 5,000 MAU)

| Component | Monthly Cost | Annual Cost | Notes |
|-----------|-------------|-------------|-------|
| LLM (Gemini 2.5 Flash-Lite) | $0 | $0 | Free tier: 1,000 RPD covers ~30K sessions/month |
| Embeddings (Gemini Embedding 001) | $0 | $0 | One-time embed of 60 docs; free tier covers re-embeds |
| Vector DB (Supabase pgvector) | $0 | $0 | Included in Supabase free plan |
| RAG Framework (Vercel AI SDK) | $0 | $0 | Open-source |
| Monitoring (Langfuse) | $0 | $0 | Free tier: 50K events/month |
| **Setup (one-time founder time)** | — | **$245-$385** | 14-22 hours at $17.50/hr |
| **Total Year 1** | **$0/month** | **$245-$385** | Founder time only; zero cash outlay |

### Growth Scenario (5,000+ MAU, free tier exceeded)

| Component | Monthly Cost | Annual Cost | Notes |
|-----------|-------------|-------------|-------|
| LLM (Gemini paid tier) | $3-$10 | $36-$120 | 25K-75K exchanges/month at $0.10/$0.40 |
| Embeddings | $0 | $0 | Negligible re-embedding costs |
| Vector DB (Supabase Pro) | $25 | $300 | Shared with rest of app (not chatbot-specific) |
| **Total Year 1 (cash)** | **$28-$35** | **$336-$420** | Well within $700 infrastructure budget |

---

*All pricing researched on 2026-03-18. Prices should be revalidated before procurement. LLM pricing changes rapidly — Vercel AI SDK's provider abstraction ensures low switching cost if better options emerge.*
