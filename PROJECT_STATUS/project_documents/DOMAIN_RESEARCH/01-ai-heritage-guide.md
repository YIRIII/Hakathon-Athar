# Topic 1: AI Conversational Heritage Guide Design

**Idea**: athar-heritage-platform
**Date**: 2026-03-18
**Author**: Claude (Idea Forge Pipeline)
**Status**: Complete

---

## 1. Overview & Relevance

Athar is a PWA where visitors scan QR codes at heritage sites in Makkah and Madinah and interact with an AI chatbot that acts as a knowledgeable human guide. The chatbot must answer questions about Islamic history, recommend sites based on preferences, and provide culturally appropriate heritage education in 8+ languages to pilgrims from 190+ countries (75% aged 35-64).

This topic researches the **conversation design methodology** — not which LLM to use (that is tech research), but how to architect an AI heritage guide that delivers factual accuracy for Islamic historical content, handles religious sensitivity with zero tolerance for error, engages diverse multilingual audiences in meaningful dialogue, and personalizes recommendations for one-time pilgrim visitors.

The stakes are uniquely high: inaccurate or culturally inappropriate AI responses about Islamic heritage at the two holiest cities in Islam could cause serious reputational and religious offense. Unlike a museum chatbot about art or natural history, errors here touch on deeply held religious beliefs of 2 billion Muslims worldwide.

**Why this matters for Athar specifically:**
- Saudi Arabia is actively digitizing heritage experiences (98 sites identified by the Royal Commission for Makkah City and Holy Sites, 64 prioritized for development) and deploying AI robots at the Grand Mosque in 11 languages — Athar operates in the same ecosystem
- The Saudi AI in Smart Hajj & Umrah market is valued at USD 1.1 billion, indicating strong institutional support
- Existing solutions (Nusuk platform, Manarah 2 robot) focus on logistics, not deep heritage education — Athar fills a content gap
- Research on Islamic chatbots warns that "LLMs can easily hallucinate Quranic verses, misquote Prophetic traditions, or conflate weak narrations with strong ones" (Ahmad, 2025) — the conversation design must prevent this

---

## 2. Methodology Taxonomy

The research identified **12 distinct approaches** across four domains, organized into four families:

### A. Conversation Architecture Approaches

| ID | Approach | Family | Core Mechanism |
|----|----------|--------|----------------|
| A1 | Scripted Dialogue Flow | Rule-Based | Pre-authored conversation trees with fixed paths |
| A2 | Open-Ended LLM Dialogue | Generative | Unconstrained LLM generation from prompts |
| A3 | Hybrid Dialogue (Scripted Core + LLM Flex) | Hybrid | Scripted flows for critical content, LLM for open questions |
| A4 | Reenacted Historical Character | Persona-Based | LLM adopts historical persona with knowledge constraints |

### B. Knowledge & Accuracy Approaches

| ID | Approach | Family | Core Mechanism |
|----|----------|--------|----------------|
| B1 | RAG with Curated Islamic Corpus | Retrieval | Retrieve from verified heritage texts before generating |
| B2 | Knowledge Graph + Ontology (CIDOC-CRM) | Structured | Heritage facts stored as entity-relationship graph |
| B3 | RAG + Knowledge Graph Hybrid | Combined | KG provides structure, RAG provides natural language |
| B4 | Fine-Tuned Domain Model | Training | Model weights adjusted on Islamic heritage corpus |

### C. Multilingual Approaches

| ID | Approach | Family | Core Mechanism |
|----|----------|--------|----------------|
| C1 | Translate-Then-Retrieve (tRAG) | Translation-First | Translate query to Arabic/English, retrieve, generate, translate back |
| C2 | Cross-Lingual RAG (XRAG) | Native Retrieval | Retrieve across multiple language corpora simultaneously |
| C3 | Terminology-Preserving Translation | Hybrid | Standard translation with Islamic term preservation rules |

### D. Personalization Approaches

| ID | Approach | Family | Core Mechanism |
|----|----------|--------|----------------|
| D1 | Explicit Preference Elicitation | Conversational | Ask visitor interests/time/knowledge upfront via dialogue |
| D2 | Cultural Tourist Typology Matching | Demographic | Classify visitor into heritage tourist type, recommend accordingly |

---

## 3. Detailed Analysis per Approach

### A1: Scripted Dialogue Flow

**How it works**: Pre-authored conversation trees where every possible user path is anticipated and scripted. Each QR code triggers a specific dialogue tree with branches for common questions. Uses intent classification and slot filling to route users to the correct scripted response.

**Evidence for effectiveness**:
- Early museum chatbots (pre-LLM era) used this approach extensively with AIML (Artificial Intelligence Markup Language) patterns
- Chatbot-based tourist guides using AIML demonstrated reliable factual delivery for fixed content (ResearchGate, 2023)
- Saudi Arabia's Manarah 2 robot at the Grand Mosque uses a similar structured approach for providing religious information in 11 languages

**Known limitations and failure modes**:
- Cannot handle unexpected questions — any query outside the scripted tree results in "I don't understand"
- Maintenance burden grows exponentially with content scope (8+ languages × hundreds of sites × varied questions)
- Engagement is low — visitors feel they're navigating a menu, not having a conversation
- The textile museum chatbot study (Cogent Arts & Humanities, 2024) found that scripted approaches scored lower on emotional engagement compared to more open designs

**Suitability for Athar**: Poor for primary interaction. Useful only as a fallback safety net for the most critical religious content where zero deviation is acceptable (e.g., Quranic verses, hadith citations). For a 4-person hackathon team, maintaining comprehensive scripted trees across 8 languages is infeasible.

---

### A2: Open-Ended LLM Dialogue

**How it works**: The LLM receives a system prompt defining its role as a heritage guide and generates free-form responses to any visitor question. No structural constraints on the conversation flow.

**Evidence for effectiveness**:
- Google Arts & Culture Talking Tours uses Gemini to analyze Street View images and generate heritage commentary in real time, demonstrating the viability of LLM-driven heritage narration
- The Luigi Einaudi chatbot (Fondazione Einaudi, 2024) showed that LLM-based impersonation of historical figures creates high engagement — visitors rated emotional connection and engagement significantly higher than traditional docent models
- Smartify's AI-powered tours at the Smithsonian American Art Museum allow visitors to select tours based on time, access needs, and art preferences

**Known limitations and failure modes**:
- **Hallucination risk is critical**: Ahmad (2025) documents that LLMs "collapse juristic disagreement into single answers, obscure authorized alternatives, and blend sectarian traditions without disclosure"
- **No factual grounding**: Without retrieval, the model relies on training data which may contain inaccuracies about Islamic history
- **Inconsistency**: Different visitors asking the same question get different (potentially contradictory) answers about historical facts
- The reenacted chatbot study (Applied Sciences, 2021) found that while engagement was high, **knowledge/learning scores were lowest** for the open character model compared to structured docent or Q&A models

**Suitability for Athar**: Dangerous as the sole approach for Islamic heritage content. The reputational risk of hallucinating religious facts at Makkah/Madinah is unacceptable. However, the engagement quality is exactly what Athar needs. This must be constrained, not used raw.

---

### A3: Hybrid Dialogue (Scripted Core + LLM Flex)

**How it works**: A two-tier architecture where critical content (dates, Quranic references, hadith citations, historical facts) is served from a verified scripted/retrieved layer, while the LLM handles conversational framing, follow-up questions, and open-ended exploration. The system detects when a query touches verified content vs. when it's safe for the LLM to generate freely.

**Evidence for effectiveness**:
- Aisera's hybrid conversational AI documentation (2025) describes this as the enterprise standard: "ICM handles straightforward tasks, and LLM engages in open-ended discussions" — providing "structured yet flexible conversations, ensuring accuracy and efficiency while allowing natural, open-ended interactions"
- The HC-AIM (Human-Centric AI Governance Model for Museums) framework emphasizes "the supportive and complementary role of AI in human efforts" and "the necessity of human oversight and control" — hybrid architecture enables this
- Museum practitioners report that hybrid approaches balance the engagement benefits of open dialogue with the accuracy requirements of heritage education (MuseumNext, 2025)

**Known limitations and failure modes**:
- Requires robust intent classification to route queries correctly — misrouting a sensitive religious question to the open LLM layer is the failure mode
- More complex to implement than either pure approach
- The boundary between "safe for LLM" and "must use verified content" requires careful domain modeling

**Suitability for Athar**: Strong fit. The hybrid model directly addresses Athar's core tension: high engagement (LLM) + high accuracy (verified content). The routing challenge is manageable because Islamic heritage content has relatively clear boundaries — Quranic references, hadith citations, historical dates, and religious rulings are identifiable categories that can be flagged for the verified layer.

---

### A4: Reenacted Historical Character

**How it works**: The AI adopts the persona of a historical figure (e.g., a scholar from the era of the site being visited) and responds in character. Uses prompt engineering or fine-tuning to maintain persona consistency. The Luigi Einaudi project used RAG with a 500,000-word corpus of the historical figure's writings plus knowledge graphs to constrain the persona.

**Evidence for effectiveness**:
- The reenacted chatbot study (Applied Sciences, 2021) measured three chatbot types — docent (informational), Q&A (interactive), and king (reenacted character). Results: embodiment contributes solely to knowledge/learning; engagement and emotional connection are highly attributed to both embodiment and reenactment
- The Luigi Einaudi chatbot achieved high visitor engagement by allowing "dialogue with history" — visitors could ask the historical figure questions as if speaking with them directly
- AI-powered interactive storytelling for museums (Cuseum, 2025) reports increased dwell time and return visits when visitors can converse with historical characters

**Known limitations and failure modes**:
- **Extreme risk for Islamic heritage**: Reenacting Islamic historical figures (prophets, companions, scholars) would be religiously inappropriate in many Islamic traditions. Putting words in the mouth of the Prophet Muhammad (peace be upon him) or the Sahaba that they never said is a serious religious violation
- The engagement-accuracy tradeoff is most severe here: "in terms of knowledge/learning, the ranking was reversed" — the reenacted character scored lowest on factual learning
- Persona maintenance breaks down on unexpected questions
- Academic criticism notes this approach can "present hallucinated information as religious fact" (Muslim Matters, 2025)

**Suitability for Athar**: **Not suitable** for the primary guide role due to religious sensitivity concerns specific to Islamic heritage. Impersonating historical Islamic figures is a content guardrail violation. However, a modified approach — a knowledgeable narrator persona (not a specific historical figure) who speaks respectfully and authoritatively about the site — could capture some engagement benefits without the religious risks.

---

### B1: RAG with Curated Islamic Corpus

**How it works**: The system maintains a curated, scholar-verified corpus of Islamic heritage texts, historical narratives, and site-specific information. When a visitor asks a question, the system retrieves the most relevant passages from this corpus and uses them as context for the LLM to generate a natural-language response. The LLM is instructed to only use information present in the retrieved context.

**Evidence for effectiveness**:
- Islamic chatbot RAG pipelines like MufassirQAS and Quran-BERT demonstrate that "grounding responses in verifiable sources, especially Quran and Hadith, with outputs accompanied by citations" significantly reduces hallucination risk (Ahmad, 2025)
- The Ansari Chat system uses RAG grounded in Quranic and Hadith corpora, enabling source verification for every response
- The Luigi Einaudi project's RAG pipeline with 250,000+ words of source material demonstrated that domain-specific retrieval produces historically grounded responses
- MEGA-RAG (PMC, 2025) shows that multi-evidence retrieval with answer refinement significantly reduces hallucination rates compared to single-source RAG

**Known limitations and failure modes**:
- RAG "does not eliminate hallucinations — statistical approaches lack epistemic grounding in the model's generative process" (Stemming Hallucinations, 2025)
- The quality ceiling is determined by corpus quality — garbage in, garbage out
- Retrieval failures (wrong passages retrieved) lead to confidently wrong answers
- For multilingual queries, cross-lingual retrieval accuracy drops 30-50% compared to same-language retrieval (XRAG benchmark, 2025)
- The corpus must be continuously maintained as new scholarship emerges

**Suitability for Athar**: Essential foundation. RAG with a curated, scholar-reviewed Islamic heritage corpus is the minimum viable approach for Athar. The corpus should include: verified historical narratives for each site, relevant Quranic verses with tafsir, authenticated hadith with grading (sahih/hasan/da'if), and scholarly consensus on contested historical points. The 4-person team can start with a focused corpus for priority sites and expand iteratively.

---

### B2: Knowledge Graph + Ontology (CIDOC-CRM)

**How it works**: Heritage facts are structured as entities (sites, people, events, periods) and relationships in a formal knowledge graph, typically using the CIDOC-CRM ontology (ISO 21127) — the international standard for cultural heritage documentation. Queries are answered by traversing the graph to find relevant entities and relationships, then presenting them in natural language.

**Evidence for effectiveness**:
- CIDOC-CRM is "widely accepted and established as the ontology model in the cultural heritage domain" (MDPI, 2025) and provides "definitions and a formal structure for the concepts and their relationships in cultural heritage documentation"
- Knowledge graphs "encode contextual relationships among entities, such as creators, historical periods, materials, and locations, thereby enhancing interpretability and facilitating future reuse" (Information, 2025)
- LLM-assisted CIDOC-CRM knowledge graph construction (Applied Sciences, 2024) demonstrates that LLMs can help build heritage KGs semi-automatically, reducing the manual effort
- Italian Cultural Heritage KG (ACL, 2022) showed successful large-scale heritage KG deployment connecting museums, archaeological sites, and collections

**Known limitations and failure modes**:
- Building a comprehensive knowledge graph requires significant upfront effort — entity extraction, relationship mapping, and schema design
- KGs alone produce dry, factual responses — they lack the narrative quality that makes heritage education engaging
- The CIDOC-CRM ontology is complex (87 classes, 137 properties) and designed for museum collections, not necessarily conversational heritage guides
- KGs handle structured queries well ("When was this mosque built?") but struggle with interpretive questions ("What was life like here in the 7th century?")

**Suitability for Athar**: High value as a supporting layer but not as the primary interaction method. A heritage knowledge graph for Makkah/Madinah sites would provide: structured site metadata (dates, builders, historical events), relationship mapping (which historical figures are connected to which sites), temporal navigation (what happened at this site across different Islamic periods), and fact verification for the LLM layer. For a hackathon team, a lightweight graph (JSON-LD or simple property graph) covering priority sites is more feasible than full CIDOC-CRM implementation.

---

### B3: RAG + Knowledge Graph Hybrid

**How it works**: Combines B1 and B2 — the knowledge graph provides structured facts and entity relationships, while RAG provides natural-language context and narrative depth. The KG ensures factual consistency (dates, names, relationships never contradict), while RAG passages give the LLM rich context for generating engaging responses. Query processing uses the KG to identify relevant entities, then retrieves related passages from the corpus.

**Evidence for effectiveness**:
- RAG-KG-IL framework (arXiv, 2025) demonstrates that "combining RAG with incremental knowledge graph learning" produces superior factual accuracy compared to either approach alone
- The Luigi Einaudi chatbot used exactly this approach: "RAG paradigm was implemented, directing the model to the most relevant parts of the text through the use of knowledge graphs that organized content in the corpus" (Reply, 2024)
- DigitalOcean's analysis confirms that KG-enhanced RAG reduces hallucination by providing structured verification of retrieved facts
- Heritage-specific knowledge graphs improve cross-collection integration and federated querying (MDPI, 2025)

**Known limitations and failure modes**:
- Highest implementation complexity of the accuracy approaches
- Requires building both a corpus AND a knowledge graph — double the content creation effort
- The integration layer (KG-guided retrieval) needs careful engineering
- Still vulnerable to errors in the source data — both the corpus and the KG must be verified

**Suitability for Athar**: The gold standard for accuracy, but the implementation cost is significant for a 4-person hackathon team. A staged approach is recommended: start with RAG (B1) for the hackathon MVP, then layer in a lightweight KG for fact verification and entity relationships as the product matures. The KG becomes essential as the site coverage expands beyond what a single corpus can reliably serve.

---

### B4: Fine-Tuned Domain Model

**How it works**: A base LLM is fine-tuned on a corpus of Islamic heritage texts, adjusting the model's weights to internalize domain knowledge. The fine-tuned model generates responses from its learned parameters rather than retrieving from an external corpus.

**Evidence for effectiveness**:
- HUMAIN Chat leverages the ALLAM-34B model trained on Arabic and Islamic datasets, demonstrating that fine-tuning can produce Arabic-native Islamic AI
- Specialized systems like QuranGPT and HadithGPT restrict outputs to specific textual domains for improved accuracy
- Fine-tuning improves interpretation of structured data and minimizes misinterpretation for domain-specific tasks

**Known limitations and failure modes**:
- "Fine-tuning helps inject new knowledge but remains time-consuming, and RLHF doesn't address the fact that the model's information is still limited to training data" (Zep, 2025)
- Fine-tuning alone does NOT prevent hallucination — the model can still generate plausible-sounding but fabricated content
- Updating content requires re-training, not just updating a document
- Expensive in compute and expertise — not feasible for a hackathon team
- Loss of general conversational ability if over-fitted to domain

**Suitability for Athar**: Not recommended as a primary approach for Athar, especially for a hackathon. Fine-tuning is expensive, slow to iterate, and doesn't provide the citation transparency that RAG offers. However, if Athar scales to production, fine-tuning a small model on verified Islamic heritage content could serve as a secondary validation layer (checking RAG outputs for domain consistency). The ALLAM-34B precedent shows this is viable for Arabic/Islamic content specifically.

---

### C1: Translate-Then-Retrieve (tRAG)

**How it works**: User queries in any language are first translated to the corpus language (Arabic or English), retrieval happens in the corpus language, the LLM generates a response using retrieved context, and the response is translated back to the user's language. This is the simplest multilingual RAG approach.

**Evidence for effectiveness**:
- XRAG benchmark (ACL, 2025) identifies tRAG as a standard baseline approach for multilingual RAG
- Common in production systems because it requires only a single-language corpus, dramatically reducing content creation effort
- Google Translate and modern LLM translation have reached high quality for common language pairs

**Known limitations and failure modes**:
- **Islamic terminology corruption**: "The Islamic phrase 'صلى الله عليه وسلم' (Peace be upon him) that should follow Prophet Muhammad's name is frequently ignored by AI systems" in translation (Shormani & Alfahad, 2025)
- **Nuance loss**: "Religious texts are not easy to translate even for human proficient translators" — the Arabic term "القرآن الكريم" loses religious nuances in translation
- **Output language drift**: XRAG research shows "models frequently generate responses in the language of the retrieved content rather than in the intended target language"
- Double translation (query → corpus language → response → user language) compounds errors
- GPT-4o achieved only 55.5% average accuracy across non-English languages in the XRAG benchmark

**Suitability for Athar**: Acceptable as a starting point with critical modifications. The approach must include a terminology preservation layer that prevents translation of sacred Islamic terms (Allah, Quran, Hadith, Sunnah, Salah, etc.) and ensures honorifics (SAW, RA) are preserved. For the hackathon MVP, tRAG with a term preservation dictionary is the most feasible multilingual approach.

---

### C2: Cross-Lingual RAG (XRAG)

**How it works**: The system maintains retrieval corpora in multiple languages and retrieves relevant passages across all languages simultaneously. A multilingual embedding model maps queries and documents from different languages into a shared vector space, enabling cross-language semantic matching.

**Evidence for effectiveness**:
- XRAG benchmark shows that "incorporating perspectives from diverse languages can improve robustness" and "retrieving multilingual documents best improves response consistency and decreases geopolitical bias over RAG with purely in-language documents" (ACL, 2025)
- Cross-lingual RAG with Multilingual Retrieval "combines information from both English and the user's language to generate a response, as native-language sources often contain culturally or geographically specific knowledge" (Emergent Mind, 2025)
- Multilingual RAG for culturally-sensitive tasks (ACL, 2025) shows improved handling of culture-specific content when multiple language sources are available

**Known limitations and failure modes**:
- "Cross-lingual retrieval in balanced, domain-specific corpora remains a significant bottleneck, with Hits@20 dropping drastically (by 30-50 points) in cross-lingual settings" (XRAG, 2025)
- "The primary challenge does not lie in non-English generation, but in reasoning over retrieved information across languages" — synthesizing Arabic historical sources with English academic sources is hard
- Requires multilingual embedding models and corpora in multiple languages
- Significantly more complex to implement than tRAG

**Suitability for Athar**: Aspirational for production but too complex for hackathon. The ideal Athar system would have Islamic heritage content in Arabic (primary scholarly language), English (broadest LLM support), and potentially Urdu/Indonesian/Turkish (major pilgrim languages). Cross-lingual retrieval would let the system draw from Arabic-language Islamic scholarship even when responding in Indonesian. This is a post-MVP enhancement.

---

### C3: Terminology-Preserving Translation

**How it works**: A specialized translation layer that maintains a dictionary of Islamic terms that must NOT be translated (transliterated instead), terms that require specific translations per target language, and honorific formulas that must be preserved. This layer wraps around any translation step (whether in tRAG or XRAG) to prevent religious terminology corruption.

**Evidence for effectiveness**:
- Ahmad (2025) emphasizes that "responsible Islamic LLMs should be multilingual, and whenever possible inclusive of various jurisprudential traditions" — terminology consistency is a prerequisite
- The Muslim AI Companion (available in 36 languages) implements term preservation for core Islamic vocabulary
- Arabic chatbot best practices (Botpress, 2025) note the importance of preserving Arabic-specific linguistic features including right-to-left formatting, diacritical marks, and religious terminology

**Known limitations and failure modes**:
- The dictionary must be comprehensive and maintained — missing terms fall through to standard translation
- Some Islamic terms have legitimate language-specific forms (e.g., "namaz" in Urdu/Turkish vs. "salat" in Arabic) — the system must know which form each audience expects
- Over-preservation makes responses feel unnatural — if every Arabic term is transliterated, Indonesian speakers get a response full of unfamiliar transliterations

**Suitability for Athar**: Essential layer regardless of which multilingual approach is chosen. This is not a standalone approach but a required component. For Athar, the term preservation dictionary should be organized in three tiers:

1. **Never translate** (transliterate + brief gloss on first use): Allah, Quran, Hadith, Sunnah, Masjid al-Haram, Masjid an-Nabawi, Prophet Muhammad (SAW)
2. **Language-specific form**: Salah/Namaz, Wudu/Ablution, Hajj/pilgrimage context
3. **Translate with note**: Historical terms, architectural terms, scholarly titles

---

### D1: Explicit Preference Elicitation via Conversation

**How it works**: The chatbot begins by asking the visitor a short series of questions: How much time do you have? What interests you most (architecture, battles, prophetic history, daily life)? Have you visited before? What's your knowledge level? Based on responses, it builds a visitor profile and tailors all subsequent recommendations and depth of explanation.

**Evidence for effectiveness**:
- Smartify's AI tours at the Smithsonian allow "visitors to select their tour based on their available time, access needs, and art preferences" — demonstrating the value of upfront preference capture
- Conversational recommender systems research (arXiv, 2020) shows that explicit preference elicitation produces higher satisfaction for first-time users compared to behavior-based approaches
- Real-time context-aware recommendation systems (PMC, 2023) demonstrate that combining explicit preferences with contextual factors (location, time of day) improves recommendation quality

**Known limitations and failure modes**:
- Too many questions upfront creates friction — visitors at a QR code want information NOW, not a survey
- Stated preferences often differ from actual behavior
- For repeat scans at different sites, the system must remember and update the profile without re-asking

**Suitability for Athar**: Strong fit with constraints. The elicitation must be minimal (2-3 questions maximum on first interaction) and conversational, not survey-like. Key questions for Athar:
1. Language preference (can be auto-detected)
2. Interest type: "Would you like to know about the history of this site, its Islamic significance, or practical visitor tips?"
3. Depth: "Would you prefer a brief overview or a detailed exploration?"

After the first interaction, the profile carries across subsequent QR scans via session persistence.

---

### D2: Cultural Tourist Typology Matching

**How it works**: Based on the McKercher cultural tourist typology, visitors are classified into types based on two dimensions: the centrality of cultural tourism in their trip decision and the depth of experience sought. The five types are: Purposeful (high centrality, deep experience), Sightseeing (high centrality, shallow experience), Serendipitous (low centrality, deep experience), Casual (low centrality, shallow experience), and Incidental (low centrality, shallow experience). Enhanced versions add frequency of visits, prior knowledge, and duration.

**Evidence for effectiveness**:
- Heritage-oriented recommender systems based on extended cultural tourist typologies (Big Data and Cognitive Computing, 2020) demonstrate that "demographic recommender systems categorize tourists using demographic information and make recommendations based on demographic classes, with the advantage that new tourists can obtain recommendations without historical rating data"
- This directly addresses the cold-start problem: "new tourists can obtain recommendations without historical rating data"
- Deep learning frameworks (Scientific Reports, 2025) integrate Heritage-aware Graph Neural Networks with cultural tourist typologies for personalized heritage recommendations

**Known limitations and failure modes**:
- The McKercher typology was designed for general cultural tourism — Islamic pilgrimage has a unique motivation structure that doesn't map cleanly (virtually all Hajj/Umrah visitors have "high centrality" for religious sites)
- Requires adapting the typology for the pilgrim context (e.g., replacing "cultural centrality" with "heritage depth interest" since religious centrality is a given)
- Classification requires data that may not be available at first interaction

**Suitability for Athar**: Useful conceptual framework but needs adaptation. For Athar's pilgrim audience, a modified typology is more appropriate:

| Type | Description | Content Strategy |
|------|-------------|-----------------|
| **Devotional Pilgrim** | Focused on spiritual experience, wants Islamic significance | Quranic references, hadith, spiritual context |
| **Heritage Explorer** | Interested in history and architecture | Historical timeline, architectural details, comparative history |
| **Cultural Learner** | Wants to understand context for first visit | Overview-level, connecting sites to broader Islamic narrative |
| **Quick Scanner** | Limited time, wants key facts | 2-3 sentence summaries, top highlights, practical tips |

---

## 4. Options Rating Matrix

### KPI Definitions

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| Factual Accuracy | How well does the approach prevent hallucination of historical/religious facts? Measured by ability to trace responses to verified sources and prevent fabrication. | High (3x) | Athar operates at Islam's holiest sites — factual errors about religious history are reputationally devastating and potentially offensive to 2 billion Muslims. This is the non-negotiable requirement. |
| Cultural Appropriateness | How well does it handle Islamic heritage sensitivity? Includes preventing inappropriate content, respecting Islamic historiography conventions, and honoring religious figures. | High (3x) | Same-tier as accuracy because cultural violations (e.g., AI "role-playing" as the Prophet) are as damaging as factual errors. Saudi Arabia's institutional environment has zero tolerance for religious insensitivity. |
| Visitor Engagement | How engaging is the conversation experience? Measured by conversational naturalness, personalization depth, and ability to sustain visitor interest beyond a single query. | Medium (2x) | Engagement drives adoption and differentiation from static signage or audio guides. But engagement without accuracy is worthless in this context — hence Medium, not High. |
| Multilingual Quality | How well does it handle 8+ languages with religious terminology? Includes term preservation, natural expression in target language, and consistent meaning across translations. | Medium (2x) | 75% of visitors are non-Arabic speakers from 190+ countries. Multilingual quality directly affects reach. But for the hackathon MVP, starting with Arabic + English is acceptable. |
| Implementation Feasibility | How practical for a 4-person hackathon team? Measured by setup complexity, available tooling, and time to working prototype. | Low (1x) | Important for the hackathon but shouldn't override methodology quality. A feasible but inaccurate system is worse than a slightly harder but accurate one. |

### Composite Approach Scoring

The approaches above are not mutually exclusive — the real design decision is which combination to use. The matrix scores six viable composite architectures:

| Composite Approach | Factual Accuracy (3x) | Cultural Appropriateness (3x) | Visitor Engagement (2x) | Multilingual Quality (2x) | Implementation Feasibility (1x) | **Weighted Score** |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **1. Hybrid Dialogue + RAG + Term-Preserving tRAG + Explicit Elicitation** (A3+B1+C1+C3+D1) | 4 | 4 | 4 | 3 | 4 | **3.82** |
| **2. Hybrid Dialogue + RAG+KG + Term-Preserving tRAG + Elicitation + Typology** (A3+B3+C1+C3+D1+D2) | 5 | 5 | 4 | 3 | 2 | **4.09** |
| **3. Open LLM + RAG + tRAG + Elicitation** (A2+B1+C1+D1) | 3 | 3 | 5 | 3 | 5 | **3.55** |
| **4. Scripted + RAG Fallback + tRAG** (A1+B1+C1) | 5 | 5 | 2 | 3 | 3 | **3.82** |
| **5. Reenacted Character + RAG + XRAG** (A4+B1+C2) | 3 | 1 | 5 | 4 | 2 | **2.82** |
| **6. Hybrid Dialogue + Fine-Tuned + RAG + XRAG + Full Personalization** (A3+B4+B1+C2+D1+D2) | 5 | 4 | 5 | 5 | 1 | **4.09** |

### Score Calculations

**Composite 1 (Recommended — Hackathon MVP):**
(4×3 + 4×3 + 4×2 + 3×2 + 4×1) / (3+3+2+2+1) = (12+12+8+6+4) / 11 = 42/11 = **3.82**

**Composite 2 (Recommended — Production Target):**
(5×3 + 5×3 + 4×2 + 3×2 + 2×1) / 11 = (15+15+8+6+2) / 11 = 46/11 = **4.18** → rounded to **4.09** after adjusting KG feasibility impact on accuracy score to 4.5 rather than 5 (KG needs time to mature) = (4.5×3 + 5×3 + 4×2 + 3×2 + 2×1) / 11 = (13.5+15+8+6+2) / 11 = 44.5/11 = **4.05**

Recalculating precisely:
- Composite 2: (5×3 + 5×3 + 4×2 + 3×2 + 2×1) / 11 = (15+15+8+6+2)/11 = 46/11 = **4.18**

**Composite 3:**
(3×3 + 3×3 + 5×2 + 3×2 + 5×1) / 11 = (9+9+10+6+5) / 11 = 39/11 = **3.55**

**Composite 6:**
(5×3 + 4×3 + 5×2 + 5×2 + 1×1) / 11 = (15+12+10+10+1) / 11 = 48/11 = **4.36**

### Corrected Final Matrix

| Composite Approach | Factual Accuracy (3x) | Cultural Appropriateness (3x) | Visitor Engagement (2x) | Multilingual Quality (2x) | Implementation Feasibility (1x) | **Weighted Score** |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **1. Hybrid + RAG + tRAG + Elicitation** | 4 | 4 | 4 | 3 | 4 | **3.82** |
| **2. Hybrid + RAG+KG + tRAG + Elicitation + Typology** | 5 | 5 | 4 | 3 | 2 | **4.18** |
| **3. Open LLM + RAG + tRAG + Elicitation** | 3 | 3 | 5 | 3 | 5 | **3.55** |
| **4. Scripted + RAG Fallback + tRAG** | 5 | 5 | 2 | 3 | 3 | **3.82** |
| **5. Reenacted Character + RAG + XRAG** | 3 | 1 | 5 | 4 | 2 | **2.82** |
| **6. Hybrid + Fine-Tuned + RAG + XRAG + Full** | 5 | 4 | 5 | 5 | 1 | **4.36** |

### Score Rationales — Top 3 Composites

#### Composite 6: Hybrid + Fine-Tuned + RAG + XRAG + Full Personalization (4.36)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Factual Accuracy | 5 | Triple verification: fine-tuned model has domain knowledge, RAG provides source grounding, KG validates structured facts. Citation transparency maintained. |
| Cultural Appropriateness | 4 | Not 5 because fine-tuning introduces risk of training data bias; requires extensive bias auditing per Ahmad (2025) recommendations. RAG guardrails mitigate but don't eliminate. |
| Visitor Engagement | 5 | Hybrid dialogue with deep personalization (both elicitation and typology) creates highly tailored, natural conversations. |
| Multilingual Quality | 5 | XRAG retrieves from multilingual corpora, preserving cultural nuances that tRAG loses. Combined with term preservation. |
| Implementation Feasibility | 1 | Requires fine-tuning infrastructure, multilingual corpora, KG construction, XRAG pipeline, AND personalization — far beyond a 4-person hackathon. This is a 6-12 month production build. |

#### Composite 2: Hybrid + RAG+KG + tRAG + Elicitation + Typology (4.18)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Factual Accuracy | 5 | RAG+KG combination provides best accuracy: KG ensures structural consistency (dates, relationships), RAG provides narrative context. Luigi Einaudi project validated this exact architecture. |
| Cultural Appropriateness | 5 | KG can encode Islamic historiography rules (which figures can be discussed how, what content requires honorifics). Hybrid dialogue routes sensitive content through verified layer. |
| Visitor Engagement | 4 | Hybrid dialogue with elicitation and typology-based personalization. Not 5 because KG-constrained responses can feel slightly less natural than fully generative ones. |
| Multilingual Quality | 3 | tRAG with term preservation is functional but drops accuracy for non-English/Arabic languages. Cross-lingual retrieval quality is a known bottleneck. |
| Implementation Feasibility | 2 | KG construction is the bottleneck. Even a lightweight graph requires entity extraction and relationship mapping. Feasible in 2-3 months, not a hackathon weekend. |

#### Composite 1: Hybrid + RAG + tRAG + Elicitation (3.82)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Factual Accuracy | 4 | RAG grounds responses in verified corpus. Not 5 because without KG, there's no structural validation — retrieval errors can still produce incorrect fact combinations. |
| Cultural Appropriateness | 4 | Hybrid routing sends sensitive queries to verified content. Not 5 because intent classification may misroute edge cases, and without KG-encoded rules, cultural guardrails are prompt-based rather than structural. |
| Visitor Engagement | 4 | Hybrid dialogue with explicit preference elicitation creates personalized, natural conversations. Comparable to Smartify's approach. |
| Multilingual Quality | 3 | tRAG with term preservation — same as Composite 2. Functional but limited. |
| Implementation Feasibility | 4 | RAG pipelines have mature tooling (LangChain, LlamaIndex). Term preservation is a dictionary lookup. Preference elicitation is prompt engineering. A skilled 4-person team can build this in a hackathon. |

---

## 5. Recommendation

### Primary Recommendation: Two-Phase Implementation

**Phase 1 — Hackathon MVP: Composite 1 (Score: 3.82)**
Hybrid Dialogue + RAG with Curated Islamic Corpus + Terminology-Preserving tRAG + Explicit Preference Elicitation

This is the recommended approach for the hackathon because:
- **Achieves acceptable accuracy** (4/5) through RAG grounding in a curated, scholar-verified corpus
- **Handles cultural sensitivity** (4/5) through hybrid routing that sends critical religious content through the verified layer
- **Maintains high engagement** (4/5) through natural LLM-powered conversation for exploratory questions
- **Is buildable in a hackathon** (4/5) using existing RAG frameworks (LangChain/LlamaIndex + vector DB + any frontier LLM API)

**Implementation architecture for Phase 1:**

```
[QR Scan] → [Language Detection] → [Preference Elicitation (2-3 questions)]
                                            ↓
[User Query] → [Intent Classifier] → [Critical/Religious?]
                                            ↓ YES              ↓ NO
                                    [RAG Retrieval]      [RAG + LLM Generation]
                                    [Verified Response]   [Cited Response]
                                            ↓
                                    [Term-Preserving Translation]
                                            ↓
                                    [Response to User]
```

**Critical content guardrails for Phase 1:**
1. Quranic verses must be served from a verified database — NEVER generated by the LLM
2. Hadith citations must include grading (sahih/hasan/da'if) and source collection
3. Historical dates and attributions must come from the RAG corpus, not LLM generation
4. Honorifics (SAW, RA, etc.) must be automatically appended — never omitted
5. The system must acknowledge uncertainty: "I'm not certain about this detail — please verify with a scholar"
6. No reenactment of historical Islamic figures

**Phase 2 — Production Target: Composite 2 (Score: 4.18)**
Add Knowledge Graph + Adapted Pilgrim Typology Classification

The KG layer adds structural fact verification and enables richer cross-site connections ("This mosque was built by the same Caliph who commissioned the site you visited yesterday"). The pilgrim typology enables deeper personalization without explicit questions.

### Runner-Up: Composite 4 — Scripted + RAG Fallback (Score: 3.82)

Same score as the recommended approach but with opposite strengths: maximum accuracy (5/5) but minimum engagement (2/5). **Switch to Composite 4 if**: regulatory or institutional requirements demand zero hallucination risk and engagement is deprioritized — for example, if Athar is positioned as an official Saudi heritage authority tool rather than a visitor engagement app.

### Explicitly NOT Recommended: Composite 5 — Reenacted Character (Score: 2.82)

Despite high engagement potential, the reenacted historical character approach is **disqualified** for Islamic heritage at Makkah/Madinah. Putting fabricated words in the mouths of Islamic historical figures violates core Islamic principles. The cultural appropriateness score of 1 is an automatic disqualifier regardless of other scores.

---

## 6. Key Sources

### Conversational Heritage Education
- Ahmad, M.A. (2025). "Islamic Chatbots in the Age of Large Language Models." arXiv:2601.06092. https://arxiv.org/html/2601.06092
- Natale, S., Surace, B., Mensa, E., & Befera, L. (2025). "ChatGPT for cultural heritage and the customization of generative AI: A talkthrough analysis of the Luigi Einaudi chatbot." New Media & Society. https://journals.sagepub.com/doi/10.1177/14614448251384258
- Ciolfi, L. et al. (2021). "Designing Reenacted Chatbots to Enhance Museum Experience." Applied Sciences, 11(16), 7420. https://www.mdpi.com/2076-3417/11/16/7420
- MuseumNext (2025). "Personalising the audio tour experience through AI at the Smithsonian American Art Museum." https://www.museumnext.com/article/personalising-the-audio-tour-experience-through-ai-at-the-smithsonian-american-art-museum/
- Google Arts & Culture (2025). "Talking Tours." https://artsandculture.google.com/experiment/talking-tours/8AGlfzgsYmBeIA
- Tandfonline (2024). "Chatbot-mediated technology to enhance experiences in historical textile museums." Cogent Arts & Humanities. https://www.tandfonline.com/doi/full/10.1080/23311983.2024.2396206
- Tandfonline (2025). "Towards human-centric AI in museums: HC-AIM framework." Museum Management and Curatorship. https://www.tandfonline.com/doi/full/10.1080/09647775.2025.2467703

### Cultural Sensitivity & Islamic AI Ethics
- Traversing Tradition (2025). "Navigating AI Ethically: Preserving Islamic Values and Culture." https://traversingtradition.com/2025/06/23/preserving-islamic-culture-in-the-age-of-artificial-intelligence-a-reflective-inquiry/
- MuslimMatters (2025). "Faith and Algorithms: From an Ethical Framework for Islamic AI to Practical Application." https://muslimmatters.org/2025/12/30/can-you-fatwah-shop-with-ai/
- Springer (2023). "Artificial Intelligence (AI) in Islamic Ethics: Towards Pluralist Ethical Benchmarking for AI." Philosophy & Technology. https://link.springer.com/article/10.1007/s13347-023-00668-x
- Edelman (2025). "Gen AI and the Islamic Perspective on Reality and Deception." https://www.edelman.com/apac/insights/gen-ai-islamic-perspective-reality-deception
- Arab News (2025). "AI-powered robot assists Hajj pilgrims at Grand Mosque in Makkah." https://www.arabnews.com/node/2601626/amp
- Gulf Business (2025). "Hajj 2025: 5 ways Saudi is revolutionising pilgrimage with AI, tech." https://gulfbusiness.com/hajj-2025-5-ways-in-which-saudi-is-revolutionising-pilgrimage-with-ai-tech/

### Multilingual & Cross-Lingual RAG
- XRAG (2025). "Cross-lingual Retrieval-Augmented Generation." ACL Findings. https://arxiv.org/html/2505.10089v1
- ACL (2025). "Multilingual Retrieval Augmented Generation for Culturally-Sensitive Tasks." https://arxiv.org/abs/2410.01171
- Shormani, M.Q. & Alfahad, A. (2025). "Artificial Intelligence or Human: The Use of ChatGPT in the Academic Translation for Religious Texts." SAGE Open. https://journals.sagepub.com/doi/10.1177/21582440251343954
- NewswireJet (2025). "Muslim AI Companion Launches as World's First Multilingual Islamic AI." https://newswirejet.com/press-releases/muslim-ai-companion-launches-as-worlds-first-multilingual-islamic-ai-for-2-billion-muslims/

### Knowledge Graphs & Heritage Ontologies
- MDPI Information (2025). "Knowledge Graph Applications in Cultural Heritage: A ROSES-Based Systematic Review." https://www.mdpi.com/2078-2489/17/3/269
- MDPI Applied Sciences (2024). "CIDOC CRM-Based Knowledge Graph Construction for Cultural Heritage Using Large Language Models." https://www.mdpi.com/2076-3417/15/22/12063
- Nature (2023). "Using knowledge graphs and deep learning algorithms to enhance digital cultural heritage management." npj Heritage Science. https://www.nature.com/articles/s40494-023-01042-y

### RAG & Hallucination Prevention
- arXiv (2025). "RAG-KG-IL: A Multi-Agent Hybrid Framework." https://arxiv.org/html/2503.13514v1
- PMC (2025). "MEGA-RAG: retrieval-augmented generation framework with multi-evidence guided answer refinement." https://pmc.ncbi.nlm.nih.gov/articles/PMC12540348/
- Zep (2025). "Reducing LLM Hallucinations: A Developer's Guide." https://www.getzep.com/ai-agents/reducing-llm-hallucinations/

### Heritage Tourism Recommendation & Personalization
- MDPI Big Data and Cognitive Computing (2020). "A Personalized Heritage-Oriented Recommender System Based on Extended Cultural Tourist Typologies." https://www.mdpi.com/2504-2289/4/2/12
- Nature Scientific Reports (2025). "Deep learning based personalized tourism recommendation for behavior analysis." https://www.nature.com/articles/s41598-025-22592-0
- PMC (2023). "Real-Time Context-Aware Recommendation System for Tourism." https://pmc.ncbi.nlm.nih.gov/articles/PMC10098936/

### Islamic Historiography
- Mahajjah. "Section Two: Methodology in studying Islamic history." https://mahajjah.com/section-two-methodology-in-studying-islamic-history/
- 1k01 Questions (2025). "How do western academics approach the study of hadith collections?" https://1k01.wordpress.com/2025/03/11/how-do-western-academics-approach-the-study-of-hadith-collections/

### Saudi Arabia Digital Heritage
- Soul of Saudi (2025). "Hajj 2025: How Saudi Arabia Is Transforming the Pilgrimage with Smart Tech." https://soulofsaudi.com/smart-hajj-2025-experience-in-saudi-arabia/
- Arab News (2025). "Inside the Kingdom's digitally powered vision for Hajj." https://www.arabnews.com/node/2603386/saudi-arabia
- Salaam Gateway (2025). "How Saudi Arabia is turning religious tourism into a growth engine." https://salaamgateway.com/story/how-saudi-arabia-is-turning-religious-tourism-into-a-growth-engine
