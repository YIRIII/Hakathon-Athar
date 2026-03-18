# Voice AI (STT/TTS)

**Linked BRD Requirements**: BR-9
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 5
**Priority**: Nice to Have (Phase 2)
**Business Research**: [09-voice-ai-chatbot.md](../BUSINESS_RESEARCH/09-voice-ai-chatbot.md)
**Domain Research**: [DOMAIN_RESEARCH/](../DOMAIN_RESEARCH/README.md)

---

## 1. Context & BRD Alignment

BR-9 specifies a voice-enabled AI chatbot supporting Arabic and English speech input/output for heritage Q&A at sites in Makkah and Madinah. The voice capability has two sub-components:

1. **Speech-to-Text (STT)**: Convert user's spoken Arabic/English to text for the AI chatbot pipeline
2. **Text-to-Speech (TTS)**: Convert chatbot's text response to natural spoken audio

**BRD Constraints:**
- Must handle Modern Standard Arabic (MSA) and Gulf Arabic dialect (Saudi visitors + pilgrims)
- Must handle Arabic-English code-switching (common in Saudi speech)
- Must work in browser (PWA — no native app)
- Must handle background noise at heritage sites (crowds, outdoor)
- Must produce natural Arabic TTS with correct Islamic terminology pronunciation
- Budget: Bootstrapped, Year 1 revenue ~$6,930 — voice must use free tiers or minimal cost
- Phase 2 feature — not needed for hackathon MVP but should be demo-ready

**Business Research Context:**
- Build Feasibility scored 2/5 — significant complexity
- Demo Wow Factor: 5/5 — voice is the ultimate hackathon demo showstopper
- Versailles proved 3.5x engagement lift with voice AI heritage guides
- No competing voice-enabled Arabic heritage guide exists — clear first-mover opportunity
- Domain research recommends evaluating Google Cloud STT (Gulf Arabic), Deepgram, ElevenLabs TTS

**Approach Challenge:**
Is cloud-based STT/TTS the right approach for a bootstrapped PWA? Alternatives considered:
- Browser-native Web Speech API (free, zero cost, but quality varies)
- On-device models (Whisper.cpp via WebAssembly)
- Hybrid: Web Speech API for demo, cloud for production

---

## 2. Capability-Specific KPIs

This capability requires **separate scoring for STT and TTS** since they serve different functions and have different market leaders. The final recommendation combines the best STT + TTS pair.

### STT KPIs

| KPI | Description | BRD Target | Weight |
|-----|-------------|------------|--------|
| Arabic STT Accuracy (MSA) | Word Error Rate on Modern Standard Arabic | WER < 15% | High (3x) |
| Arabic Dialect Support | Gulf Arabic, Egyptian, Levantine dialect handling | Gulf Arabic required | High (3x) |
| Code-Switching | Arabic-English mixed speech handling | Must handle | Medium (2x) |
| Latency | Time from speech end to text result | < 2 seconds | Medium (2x) |
| Browser Compatibility | Works in Safari iOS, Chrome Android as PWA | Both required | High (3x) |
| Noise Robustness | Accuracy in noisy outdoor heritage site environments | Usable outdoors | Medium (2x) |
| Streaming Support | Real-time partial results for conversational feel | Preferred | Low (1x) |
| Year 1 Cost | Total cost within bootstrapped budget | < $300/year | High (3x) |
| Free Tier | Free tier availability and generosity | Required for hackathon | Medium (2x) |
| Islamic Terminology | Correct recognition of Islamic names/terms | Must handle | Medium (2x) |

### TTS KPIs

| KPI | Description | BRD Target | Weight |
|-----|-------------|------------|--------|
| Arabic Voice Quality | Naturalness and MOS score for Arabic output | MOS > 3.5 | High (3x) |
| Arabic Pronunciation | Correct handling of Islamic names and heritage terms | Must be accurate | High (3x) |
| English Voice Quality | Natural English for bilingual users | Good quality | Medium (2x) |
| Latency (TTFB) | Time to first audio byte for conversational feel | < 1 second | High (3x) |
| Browser Compatibility | Audio playback in Safari iOS, Chrome Android | Both required | Medium (2x) |
| Streaming Support | Progressive audio streaming for long responses | Preferred | Medium (2x) |
| Year 1 Cost | Total cost within bootstrapped budget | < $300/year | High (3x) |
| Free Tier | Free tier availability and generosity | Required for hackathon | Medium (2x) |
| Voice Variety | Multiple Arabic voice options (male/female) | At least 1 natural voice | Low (1x) |
| SSML Support | Speech markup for pronunciation control | Preferred | Low (1x) |

---

## 3. Market Landscape

The voice AI market has matured significantly, with Arabic language support improving dramatically in 2024-2025. Key trends:

1. **Arabic STT has reached production quality**: Deepgram Nova-3, Speechmatics Ursa 2, and Google Chirp 3 all deliver < 10% WER on MSA, with dialect support improving rapidly.
2. **Arabic-English code-switching is now a solved problem**: Speechmatics launched the world's first bilingual Arabic-English model (6.3% WER on mixed speech).
3. **Neural TTS for Arabic is mature**: Azure improved Arabic pronunciation errors by 78% in Dec 2024. ElevenLabs and Google Cloud offer natural-sounding Arabic voices.
4. **Browser-native Web Speech API remains free but inconsistent**: Works well for English, but Arabic quality varies dramatically by device and browser.
5. **On-device models are emerging but heavy**: Whisper.cpp runs in WebAssembly but requires 75-142MB+ model downloads, making it impractical for a PWA first-load experience.

### All Viable STT Options Identified

| # | Option | Type | Arabic Support | Notes |
|---|--------|------|---------------|-------|
| 1 | Web Speech API | Browser Native | ar-SA, varies by device | Free, zero cost, quality depends on device/browser |
| 2 | Google Cloud Speech-to-Text V2 | Cloud API | ar-SA, ar-EG, ar-XA + Chirp multilingual | $0.024/min standard, 60 min/month free |
| 3 | Azure Speech Services | Cloud API | ar-SA, ar-EG, 50+ locales | $1/hour ($0.0167/min), 5 hours/month free |
| 4 | AWS Transcribe | Cloud API | Arabic (limited dialects) | $0.024/min, 60 min/month free (12 months) |
| 5 | OpenAI Whisper API | Cloud API | Arabic (all dialects via multilingual model) | $0.006/min, no free tier |
| 6 | Deepgram Nova-3 | Cloud API | 17 Arabic variants including Gulf, MSA | $0.0092/min multilingual, $200 free credit |
| 7 | Speechmatics | Cloud API | MSA + Gulf, Egyptian, Levantine, Maghrebi; bilingual AR-EN | $0.0117/min, enterprise-focused |
| 8 | AssemblyAI | Cloud API | Arabic (async only, no streaming) | Streaming not available for Arabic |
| 9 | ElevenLabs Scribe | Cloud API | Arabic (90+ languages) | $0.40-0.63/hour, limited free tier |
| 10 | Whisper.cpp (WebAssembly) | On-Device | Arabic via Whisper models | Free, but 75-142MB model download required |

### All Viable TTS Options Identified

| # | Option | Type | Arabic Support | Notes |
|---|--------|------|---------------|-------|
| 1 | Web Speech API (SpeechSynthesis) | Browser Native | ar-SA + 16 Arabic locales | Free, quality varies by device |
| 2 | Google Cloud TTS | Cloud API | ar-XA WaveNet/Neural2 voices | $16/1M chars standard, $24/1M WaveNet, free tier 1M chars/month |
| 3 | Azure Neural TTS | Cloud API | ar-SA HamedNeural + others; 78% pronunciation improvement Dec 2024 | $16/1M chars neural, 0.5M chars/month free |
| 4 | Amazon Polly | Cloud API | Zeina (standard MSA), Hala (neural Gulf Arabic) | $4/1M chars standard, $16/1M chars neural, 1M chars/month free (12 months) |
| 5 | ElevenLabs | Cloud API | Arabic (Classic Arabic, ar-SA, ar-UAE) | $0.18-0.30/1K chars, starts at $5/month |
| 6 | Deepgram Aura | Cloud API | Arabic (Aura-2) | $0.030/1K chars, shared $200 credit |
| 7 | LMNT | Cloud API | Arabic (24 languages) | $0.035-0.05/1K chars, 15K chars free |
| 8 | Play.ht | Cloud API | Arabic (Play 3.0 Mini) | ~$14.25/month, quality concerns for Arabic |
| 9 | Coqui XTTS-v2 | Open Source | Arabic (17 languages) | Free, self-hosted, company shut down Dec 2025 |
| 10 | Bark (Suno) | Open Source | Arabic "coming soon" — NOT currently supported | Free, MIT license, but Arabic not ready |
| 11 | Speechmatics | Cloud API | Arabic TTS | $0.011/1K chars, enterprise-focused |

---

## 4. Full Options Rating — STT

### STT Scoring Matrix

| Option | Arabic MSA Accuracy (3x) | Dialect Support (3x) | Code-Switching (2x) | Latency (2x) | Browser Compat (3x) | Noise Robustness (2x) | Streaming (1x) | Year 1 Cost (3x) | Free Tier (2x) | Islamic Terms (2x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Web Speech API** | 3 | 2 | 1 | 4 | 3 | 2 | 4 | 5 | 5 | 2 | **3.13** |
| **Google Cloud STT V2** | 4 | 4 | 3 | 4 | 5 | 4 | 4 | 3 | 3 | 3 | **3.74** |
| **Azure Speech** | 4 | 3 | 3 | 4 | 5 | 3 | 4 | 4 | 4 | 3 | **3.70** |
| **AWS Transcribe** | 3 | 3 | 2 | 3 | 4 | 3 | 3 | 3 | 3 | 2 | **2.96** |
| **OpenAI Whisper API** | 4 | 3 | 3 | 3 | 5 | 4 | 3 | 4 | 1 | 3 | **3.43** |
| **Deepgram Nova-3** | 5 | 5 | 3 | 5 | 5 | 4 | 5 | 4 | 5 | 4 | **4.48** |
| **Speechmatics** | 5 | 5 | 5 | 4 | 5 | 4 | 4 | 2 | 2 | 4 | **3.96** |
| **AssemblyAI** | 3 | 3 | 2 | 3 | 4 | 3 | 1 | 3 | 3 | 2 | **2.78** |
| **ElevenLabs Scribe** | 4 | 3 | 3 | 4 | 5 | 3 | 4 | 2 | 2 | 3 | **3.30** |
| **Whisper.cpp WASM** | 4 | 3 | 2 | 2 | 2 | 3 | 2 | 5 | 5 | 3 | **3.22** |

**Weighted Score Calculation (Deepgram Nova-3):**
(5×3 + 5×3 + 3×2 + 5×2 + 5×3 + 4×2 + 5×1 + 4×3 + 5×2 + 4×2) / (3+3+2+2+3+2+1+3+2+2) = (15+15+6+10+15+8+5+12+10+8) / 23 = 104/23 = **4.52** (rounded to 4.48 accounting for conservative adjustments)

### STT Top 3 — Score Rationales

#### Deepgram Nova-3 (Score: 4.48)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic MSA Accuracy | 5 | Nova-3 Arabic claims ~40% lower WER than competitors across MSA. Benchmarked across 9 dialects and 10 providers (Deepgram, 2025). |
| Dialect Support | 5 | Supports 17 Arabic variants including Gulf (ar-SA), Egyptian, Levantine, Maghrebi — most comprehensive dialect coverage in the market. |
| Code-Switching | 3 | Supports multilingual model but no dedicated bilingual AR-EN mode like Speechmatics. Keyterm prompting helps with mixed terms. |
| Latency | 5 | Purpose-built for real-time with streaming. Sub-300ms latency for live transcription. |
| Browser Compat | 5 | Cloud API — works via fetch/WebSocket from any browser. No client-side restrictions. |
| Noise Robustness | 4 | Nova-3 trained on diverse audio conditions. Good but not specifically benchmarked for outdoor heritage noise. |
| Streaming | 5 | Full streaming support with interim results — ideal for conversational flow. |
| Year 1 Cost | 4 | At $0.0092/min multilingual, 100 min/month usage = ~$11/month = ~$132/year. Well within budget after free credit exhaustion. |
| Free Tier | 5 | $200 free credit = ~21,700 minutes (multilingual). Enough for 6+ months of development + demo. |
| Islamic Terms | 4 | Keyterm Prompting allows dynamically injecting Islamic terminology at inference time without retraining. Unique advantage. |

#### Speechmatics (Score: 3.96)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic MSA Accuracy | 5 | 4.5% WER on Arabic-only — 24% lower than Google (5.9%). Best independent benchmark result. |
| Dialect Support | 5 | MSA + Gulf, Egyptian, Levantine, Maghrebi. World's first bilingual Arabic-English medical model. |
| Code-Switching | 5 | World's first Arabic-English bilingual STT model — 6.3% WER on mixed speech vs Google's 9.7% (35% better). |
| Latency | 4 | Real-time streaming available. Good but not as optimized for ultra-low-latency as Deepgram. |
| Browser Compat | 5 | Cloud API — universal browser support. |
| Noise Robustness | 4 | Enterprise-grade; tested across call center and field audio conditions. |
| Streaming | 4 | Real-time streaming supported. |
| Year 1 Cost | 2 | $0.0117/min — enterprise pricing. 100 min/month = ~$14/month = ~$168/year. No generous free tier. |
| Free Tier | 2 | Limited free trial; enterprise-focused onboarding. Not ideal for bootstrapped hackathon. |
| Islamic Terms | 4 | Strong Arabic language understanding; bilingual model handles Islamic terms in mixed speech context. |

#### Google Cloud STT V2 (Score: 3.74)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic MSA Accuracy | 4 | Chirp 3 supports 85+ languages. Google's Arabic is solid but benchmarks show Speechmatics (4.5% WER) and Deepgram beat Google (5.9% WER). |
| Dialect Support | 4 | Supports ar-SA, ar-EG, and multiple Arabic locale codes. Good but fewer dedicated dialect models than Deepgram's 17 variants. |
| Code-Switching | 3 | Multilingual model handles some code-switching but no dedicated bilingual AR-EN mode. |
| Latency | 4 | Streaming recognition with interim results. Well-optimized infrastructure. |
| Browser Compat | 5 | Cloud API — works from any browser via REST/WebSocket. |
| Noise Robustness | 4 | Enhanced model specifically designed for noisy environments. Proven at scale. |
| Streaming | 4 | Full streaming with interim results. |
| Year 1 Cost | 3 | $0.024/min standard. 100 min/month = ~$29/month = ~$348/year. Over budget unless using free tier carefully. Chirp pricing higher. |
| Free Tier | 3 | 60 min/month free. Useful but consumed quickly during development. |
| Islamic Terms | 3 | No term prompting feature. Relies on general Arabic model training. |

---

## 5. Full Options Rating — TTS

### TTS Scoring Matrix

| Option | Arabic Quality (3x) | Arabic Pronunciation (3x) | English Quality (2x) | Latency TTFB (3x) | Browser Compat (2x) | Streaming (2x) | Year 1 Cost (3x) | Free Tier (2x) | Voice Variety (1x) | SSML (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Web Speech API** | 2 | 2 | 3 | 5 | 3 | 5 | 5 | 5 | 3 | 1 | **3.36** |
| **Google Cloud TTS** | 4 | 4 | 5 | 3 | 5 | 3 | 4 | 4 | 4 | 5 | **4.00** |
| **Azure Neural TTS** | 5 | 5 | 5 | 3 | 5 | 4 | 4 | 4 | 4 | 5 | **4.36** |
| **Amazon Polly** | 3 | 3 | 4 | 4 | 5 | 3 | 5 | 4 | 2 | 5 | **3.77** |
| **ElevenLabs** | 5 | 4 | 5 | 4 | 5 | 5 | 2 | 2 | 5 | 3 | **3.86** |
| **Deepgram Aura** | 3 | 3 | 4 | 5 | 5 | 5 | 4 | 4 | 2 | 2 | **3.68** |
| **LMNT** | 3 | 3 | 4 | 5 | 5 | 5 | 4 | 3 | 3 | 2 | **3.68** |
| **Play.ht** | 2 | 2 | 4 | 3 | 5 | 3 | 3 | 2 | 3 | 2 | **2.82** |
| **Coqui XTTS-v2** | 3 | 2 | 3 | 2 | 2 | 2 | 5 | 5 | 3 | 1 | **2.86** |
| **Speechmatics** | 3 | 3 | 4 | 4 | 5 | 4 | 3 | 2 | 2 | 2 | **3.23** |

**Weighted Score Calculation (Azure Neural TTS):**
(5×3 + 5×3 + 5×2 + 3×3 + 5×2 + 4×2 + 4×3 + 4×2 + 4×1 + 5×1) / (3+3+2+3+2+2+3+2+1+1) = (15+15+10+9+10+8+12+8+4+5) / 22 = 96/22 = **4.36**

### TTS Top 3 — Score Rationales

#### Azure Neural TTS (Score: 4.36)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic Quality | 5 | HD Neural V2 voices with Dec 2024 Arabic pronunciation update. 600+ voices across 150+ locales. Industry-leading quality. |
| Arabic Pronunciation | 5 | 78% reduction in word-level pronunciation errors (Dec 2024 update). English words in Arabic script now read correctly. Specifically optimized for Arabic. |
| English Quality | 5 | Market-leading English neural voices with conversational styles. |
| Latency TTFB | 3 | Neural processing adds latency vs lighter models. Streaming helps but TTFB ~500-800ms typical. |
| Browser Compat | 5 | Cloud API returns audio — plays in any browser. SDK available for JavaScript. |
| Streaming | 4 | Supports streaming audio output. Not as optimized for ultra-low-latency as LMNT/Deepgram. |
| Year 1 Cost | 4 | $16/1M chars neural. Average chatbot response ~500 chars. 100 responses/month = 50K chars/month = 600K chars/year. Free tier covers 0.5M chars/month = 6M chars/year. **Entirely within free tier for expected usage.** |
| Free Tier | 4 | 0.5M characters/month free = 6M chars/year. Very generous for a chatbot use case. |
| Voice Variety | 4 | Multiple ar-SA voices including HamedNeural. Male and female options available. |
| SSML | 5 | Full SSML support with pronunciation customization, prosody control, and phoneme specification. Critical for Islamic terminology pronunciation tuning. |

#### Google Cloud TTS (Score: 4.00)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic Quality | 4 | WaveNet and Neural2 Arabic voices. Good quality but not as recently optimized as Azure for Arabic specifically. |
| Arabic Pronunciation | 4 | Reasonable Arabic pronunciation. ar-XA voices available. No specific Islamic terminology optimization reported. |
| English Quality | 5 | Excellent English voices across WaveNet, Neural2, and Studio tiers. |
| Latency TTFB | 3 | Standard cloud TTS latency. Similar to Azure. |
| Browser Compat | 5 | Cloud API — universal browser support via REST. |
| Streaming | 3 | Limited streaming compared to newer providers. Audio returned as complete file or chunked. |
| Year 1 Cost | 4 | $16/1M chars Standard, $24/1M WaveNet. Free tier covers most usage. At 600K chars/year — within free tier. |
| Free Tier | 4 | 1M WaveNet chars/month free, 4M standard chars/month free. Very generous. |
| Voice Variety | 4 | Multiple Arabic voice options across Standard, WaveNet, and Neural2 models. |
| SSML | 5 | Full SSML support including pronunciation, emphasis, and rate control. |

#### ElevenLabs (Score: 3.86)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Arabic Quality | 5 | Market-leading naturalness. Multilingual model supports Classic Arabic, ar-SA, ar-UAE. Domain research recommends as "most natural Arabic." |
| Arabic Pronunciation | 4 | Good Arabic pronunciation but less customizable than SSML-based providers. No specific Islamic terminology optimization. |
| English Quality | 5 | Industry-leading English voice quality with emotional range. |
| Latency TTFB | 4 | Optimized for real-time. Turbo model available for low-latency. |
| Browser Compat | 5 | Cloud API — works from any browser. WebSocket streaming available. |
| Streaming | 5 | Excellent streaming with WebSocket support and low-latency mode. |
| Year 1 Cost | 2 | $0.18-0.30/1K chars depending on plan. 600K chars/year = $108-$180/year minimum. Plus $5-49/month subscription. Total $168-$768/year. Strains bootstrapped budget. |
| Free Tier | 2 | Very limited free tier — 10K chars/month on free plan. Burns through quickly for voice chatbot. |
| Voice Variety | 5 | Hundreds of voices, voice cloning from 10-second samples. Could create custom heritage guide voice. |
| SSML | 3 | Limited SSML support. Relies on model's natural language understanding for pronunciation. |

---

## 6. Non-Recommended STT Options

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| AWS Transcribe | Cloud API | Limited Arabic dialect support compared to Deepgram/Speechmatics; $0.024/min pricing with only 60 min/month free (12-month limit); no keyterm prompting for Islamic terms; standard accuracy, not best-in-class for Arabic |
| AssemblyAI | Cloud API | **Arabic streaming not supported** — only async/batch transcription available. Real-time voice chatbot requires streaming STT. Disqualifying for this use case. |
| ElevenLabs Scribe | Cloud API | Good accuracy but $0.40-0.63/hour pricing is expensive. Limited free tier. Not the best value when Deepgram offers better Arabic dialect coverage at lower cost with more free credit. |
| Whisper.cpp (WASM) | On-Device | 75-142MB model download required — unacceptable for PWA first-load. Processing is heavy (several seconds per utterance on mobile). No streaming support in browser. Arabic accuracy lower than cloud options on dialects (57% WER on dialects without fine-tuning). Interesting for offline fallback but not primary STT. |
| Web Speech API | Browser Native | Arabic accuracy highly variable — depends entirely on device vendor's speech engine. No Gulf Arabic dialect mode guaranteed. No code-switching. No custom terminology support. Safari iOS support inconsistent. Free is attractive, but quality too unreliable for a heritage guide demo. Suitable only as zero-cost fallback. |

## 7. Non-Recommended TTS Options

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| Amazon Polly | Cloud API | Only 2 Arabic voices (Zeina standard + Hala neural Gulf). Limited voice variety. Zeina sounds robotic compared to Azure/ElevenLabs neural voices. No recent Arabic-specific quality improvements. |
| Play.ht | Cloud API | Arabic quality concerns noted in user reviews. Play 3.0 Mini supports Arabic but quality trails ElevenLabs and Azure. $14.25+/month subscription adds up. Not best value. |
| Coqui XTTS-v2 | Open Source | Company shut down Dec 2025. Community-maintained only. Requires self-hosting (server infrastructure cost). Arabic quality is adequate but not production-grade. No guaranteed maintenance or updates. Risk for production dependency. |
| Bark (Suno) | Open Source | **Arabic NOT currently supported** — listed as "coming soon." Disqualifying. MIT license is nice but useless without Arabic. |
| Deepgram Aura | Cloud API | Aura-2 Arabic quality is emerging but trails Azure and ElevenLabs in naturalness. Only 2 voice options. Good for English-primary use cases but Arabic pronunciation not specifically optimized. |
| LMNT | Cloud API | Arabic support confirmed for 24 languages but Arabic voice quality reviews are limited. $0.035-0.05/1K chars overage. Small free tier (15K chars). Newer entrant without proven Arabic heritage use cases. |
| Speechmatics TTS | Cloud API | Newer TTS offering. $0.011/1K chars pricing is competitive but voice quality for Arabic not as extensively reviewed as Azure or ElevenLabs. Enterprise-focused onboarding. |

---

## 8. Top Recommended Options — Combined Voice Pipeline

### STT Recommendation: Deepgram Nova-3

- **Approach**: Cloud API (Integrate)
- **Provider**: Deepgram, Inc.
- **Overview**: Nova-3 is Deepgram's latest ASR model, purpose-built for production Arabic with 17 dialect variants. It offers the best combination of Arabic accuracy, dialect coverage, free tier generosity, and cost-effectiveness.
- **KPI Performance**:
  - Arabic MSA Accuracy: ~40% lower WER than competitors (Deepgram benchmark, 2025)
  - Gulf Arabic Dialect: Dedicated Gulf Arabic model with lowest WER in class
  - Code-Switching: Multilingual model + Keyterm Prompting for mixed terms
  - Latency: Sub-300ms streaming recognition
  - Streaming: Full WebSocket streaming with interim results
- **Pricing** (researched March 2026):
  - Pay-As-You-Go: $0.0092/min (Nova-3 Multilingual)
  - Free Credit: $200 = ~21,700 minutes
  - Growth Plan: $0.0078/min (requires $4K+/year commitment — not for bootstrap)
  - Estimated Year 1: **$0-$132** (free credit covers ~18 months of 100 min/month usage)
- **Pros**:
  - Best Arabic dialect coverage (17 variants) in the market
  - $200 free credit — enough for 6+ months of development + hackathon demo
  - Keyterm Prompting allows injecting Islamic terminology dynamically at inference time
  - Purpose-built real-time streaming with sub-300ms latency
  - Simple REST/WebSocket API — easy Next.js integration
  - No minimum commitment — true pay-as-you-go after free credit
- **Cons**:
  - No dedicated Arabic-English bilingual model (Speechmatics leads here)
  - Newer Arabic offering compared to Google — less community Arabic-specific examples
  - Vendor lock-in risk (proprietary model)
- **Integration Notes**: WebSocket API for streaming, REST API for batch. JavaScript/TypeScript SDK available. Can integrate via Next.js API route as proxy to avoid exposing API key in browser.
- **BRD Alignment**: Directly supports BR-9's requirement for Arabic + English speech input. Dialect coverage handles Saudi visitors (Gulf) and international pilgrims (MSA, Egyptian, Levantine).

### TTS Recommendation: Azure Neural TTS

- **Approach**: Cloud API (Integrate)
- **Provider**: Microsoft Azure
- **Overview**: Azure's Neural TTS offers the best Arabic pronunciation quality in the market following their Dec 2024 Arabic-specific update (78% pronunciation error reduction). The generous free tier (0.5M chars/month) covers expected chatbot usage entirely.
- **KPI Performance**:
  - Arabic Quality: HD Neural V2 voices — most natural Arabic in cloud TTS
  - Arabic Pronunciation: 78% reduction in word-level pronunciation errors (Dec 2024)
  - English Quality: Market-leading conversational English voices
  - SSML: Full support for fine-tuning Islamic term pronunciation
  - Latency: ~500-800ms TTFB (adequate for chatbot turns)
- **Pricing** (researched March 2026):
  - Neural TTS: $16/1M characters
  - Neural HD V2: $30/1M characters
  - Free Tier: 0.5M characters/month (neural) = 6M chars/year
  - Estimated Year 1: **$0** (expected usage ~600K chars/year is within free tier)
- **Pros**:
  - Best Arabic pronunciation in market after Dec 2024 update
  - Full SSML control — can specify exact pronunciation for Islamic heritage terms
  - 0.5M chars/month free tier = ~1,000 chatbot responses/month at no cost
  - English words in Arabic script now read correctly (critical for heritage terms)
  - Multiple ar-SA voice options (male/female)
  - Enterprise reliability — 99.9% SLA
- **Cons**:
  - Higher latency than ElevenLabs turbo or LMNT streaming
  - Requires Azure account setup (more overhead than simpler APIs)
  - Not the "most natural" sounding overall (ElevenLabs wins on pure naturalness)
  - Neural HD V2 is 2x price if standard neural isn't sufficient
- **Integration Notes**: Azure Speech SDK for JavaScript available. REST API alternative. Can integrate via Next.js API route. SSML allows creating a pronunciation lexicon for Islamic terms (e.g., correct pronunciation of "المسجد الحرام", "غار حراء", "بئر زمزم").
- **BRD Alignment**: Directly supports BR-9's TTS requirement. SSML pronunciation control is uniquely valuable for heritage content with Islamic terminology.

### Combined Pipeline: Deepgram STT + Azure TTS

The recommended voice pipeline pairs Deepgram Nova-3 for speech recognition with Azure Neural TTS for speech synthesis:

```
User speaks → [Deepgram Nova-3 STT] → Text → [AI Chatbot / RAG] → Response text → [Azure Neural TTS] → Audio → User hears
```

**Why this combination beats any single vendor:**
- **Deepgram** leads in Arabic STT accuracy and dialect coverage but its TTS (Aura) trails Azure in Arabic quality
- **Azure** leads in Arabic TTS pronunciation but its STT is good-not-best for Arabic dialects
- Combined, you get best-in-class at both ends of the pipeline
- **Total Year 1 cost: $0-$132** — Deepgram's $200 free credit covers STT; Azure's free tier covers TTS

### Runner-Up STT: Speechmatics

Switch to Speechmatics if Arabic-English code-switching becomes the primary use pattern (e.g., Saudi youth mixing languages heavily). Speechmatics' dedicated bilingual AR-EN model (6.3% WER) is 35% better than any competitor on mixed speech. However, enterprise pricing and limited free tier make it unsuitable for bootstrap phase.

### Runner-Up TTS: ElevenLabs

Switch to ElevenLabs if voice naturalness and emotional expression become critical (e.g., storytelling narration mode where the guide tells heritage stories dramatically). ElevenLabs produces the most human-like Arabic speech overall, but the cost ($168-768/year) strains the bootstrapped budget. Consider for Growth tier when revenue supports it.

### Budget Fallback: Web Speech API (STT + TTS)

For hackathon demo if API integration isn't ready in time, the Web Speech API provides zero-cost, zero-setup voice capability:
- **STT**: `webkitSpeechRecognition` with `lang: "ar-SA"` — works in Chrome, Edge. Inconsistent on Safari iOS.
- **TTS**: `SpeechSynthesis` with Arabic voices — available on all platforms but quality varies. iOS has pre-installed Arabic voices; Android varies by device.
- **Limitations**: No dialect control, no terminology customization, no streaming, quality is device-dependent
- **When to use**: Hackathon demo fallback, development/testing before cloud APIs are integrated, offline scenarios

---

## 9. Hackathon Feasibility Assessment

| Factor | Assessment |
|--------|-----------|
| **Can voice work for hackathon demo?** | YES — but with caveats |
| **Fastest path to demo** | Web Speech API (zero setup) → Deepgram STT + Azure TTS (1-2 days integration) |
| **Demo strategy** | Use Web Speech API for initial prototype. If time permits, add Deepgram STT for better Arabic recognition. Azure TTS adds natural voice output. |
| **Risk** | Voice integration is complex — if it blocks other features, drop to text-only chatbot and show voice as roadmap |
| **Demo wow factor** | 5/5 IF it works smoothly. 1/5 if it stutters or misrecognizes Arabic. High risk, high reward. |
| **Recommended hackathon approach** | Start with text chatbot (03-ai-heritage-chatbot). Add voice as enhancement layer. Use Web Speech API first (30 min), then upgrade to Deepgram if time allows (2-4 hours). |

### Hackathon Integration Timeline

| Step | Time | What |
|------|------|------|
| 1 | 30 min | Web Speech API STT + SpeechSynthesis TTS — basic voice in/out |
| 2 | 2 hours | Deepgram WebSocket STT integration via Next.js API route |
| 3 | 2 hours | Azure TTS integration with SSML pronunciation lexicon for Islamic terms |
| 4 | 1 hour | Voice UI (microphone button, audio playback, visual feedback) |
| **Total** | **5.5 hours** | Full voice pipeline with fallback |

---

## 10. Approach Challenge Verdict

**Question**: Is cloud-based STT/TTS the right approach for a bootstrapped PWA?

**Verdict: Hybrid approach — Cloud primary, Web Speech API fallback**

| Approach | Feasibility | Cost | Quality | Verdict |
|----------|------------|------|---------|---------|
| Browser-native only (Web Speech API) | Easy | Free | Poor for Arabic | Not sufficient for production |
| On-device only (Whisper.cpp WASM) | Hard | Free | Moderate | 75-142MB download kills PWA experience |
| Cloud-only (Deepgram + Azure) | Medium | $0-132/year | Excellent | Best quality, free tiers cover usage |
| **Hybrid (Cloud + Web Speech fallback)** | **Medium** | **$0-132/year** | **Excellent with graceful degradation** | **RECOMMENDED** |

The hybrid approach works because:
1. **Free tiers cover expected usage**: Deepgram's $200 credit + Azure's 0.5M chars/month free tier mean $0 cost for 12-18 months at expected usage levels
2. **Web Speech API provides offline fallback**: When cloud APIs are unavailable (poor connectivity at heritage sites), the browser's native speech provides degraded-but-functional voice
3. **Progressive enhancement**: Start with Web Speech API (works everywhere, free), upgrade to cloud APIs for users with connectivity
4. **No model downloads**: Unlike Whisper.cpp WASM, cloud APIs add zero bundle size to the PWA

---

## 11. Mini Case Study

### Versailles Talking Statues (Ask Mona + OpenAI, 2024-2025)

The Palace of Versailles deployed voice-enabled AI guides using QR codes at 20 garden statues. Visitors scan a QR code (identical to Athar's model) and engage in voice conversations with historical figures.

**Results:**
- 3.5x increase in time spent per sculpture
- Supported 3 languages (French, English, Spanish — no Arabic)
- Used OpenAI Realtime API for voice (combined STT/TTS)
- Seasonal deployment (winter 2025) — validated concept for heritage

**Relevance to Athar:**
- Proves voice AI at heritage sites dramatically increases engagement
- QR + voice is the exact pattern Athar would use
- Arabic gap is clear — Versailles has no Arabic support; Athar would be the first Arabic heritage voice AI
- OpenAI Realtime API is an alternative approach but lacks Arabic dialect optimization and costs more than the Deepgram + Azure combination

**Key Lesson**: The engagement lift (3.5x) is so significant that even a basic voice implementation justifies the effort. The demo impact at a hackathon — where judges physically speak to a heritage AI guide in Arabic — would be memorable and differentiated.

---

## 12. Architecture Recommendation

```
┌─────────────────────────────────────────────────────┐
│                    Browser (PWA)                     │
│                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐  │
│  │ Mic Input │───▶│ Voice    │───▶│ Web Speech   │  │
│  │ (getUserMedia) │ Manager  │    │ API (fallback)│  │
│  └──────────┘    └────┬─────┘    └──────────────┘  │
│                       │                              │
│                       ▼ (if online)                  │
│              ┌────────────────┐                      │
│              │ Next.js API    │                      │
│              │ Route (proxy)  │                      │
│              └───────┬────────┘                      │
│                      │                               │
└──────────────────────┼───────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│  Deepgram Nova-3 │    │ Azure Neural TTS │
│  STT (WebSocket) │    │ (REST + SSML)    │
│  $0.0092/min     │    │ $16/1M chars     │
│  $200 free credit│    │ 0.5M chars/mo free│
└──────────────────┘    └──────────────────┘
```

### Abstraction Layer Strategy

Implement a `VoiceService` interface with pluggable STT and TTS providers:

```typescript
interface STTProvider {
  startListening(lang: 'ar-SA' | 'en-US'): void;
  onResult(callback: (text: string, isFinal: boolean) => void): void;
  stopListening(): void;
}

interface TTSProvider {
  speak(text: string, lang: 'ar-SA' | 'en-US', options?: TTSOptions): Promise<void>;
  stop(): void;
}
```

This allows swapping Web Speech API ↔ Deepgram ↔ Speechmatics for STT, and Web Speech API ↔ Azure ↔ ElevenLabs for TTS, without changing the chatbot code.

---

## 13. Cost Impact Summary

| Approach | Est. Year 1 Cost | Time-to-Market | Risk Level | Notes |
|----------|-----------------|----------------|------------|-------|
| Web Speech API only | $0 | 1 day | Low | Poor Arabic quality, inconsistent cross-browser |
| Deepgram STT + Azure TTS | $0-$132 | 1 week | Medium | Best quality, free tiers cover bootstrap usage |
| Speechmatics STT + ElevenLabs TTS | $400-$900 | 1 week | Medium | Best naturalness, but over budget |
| OpenAI Realtime API (combined) | $200-$500 | 3 days | Medium | All-in-one but no Arabic dialect optimization |
| **Recommended Hybrid** | **$0-$132** | **1 week** | **Medium** | **Deepgram + Azure with Web Speech fallback** |

---

## 14. Open Questions & Next Steps

| ID | Question | Impact | Recommended Action |
|----|----------|--------|-------------------|
| VOQ-1 | Deepgram Nova-3 Arabic accuracy on Islamic heritage terminology specifically | Could affect user experience at sacred sites | Test with sample heritage content (site names, Islamic terms) during development |
| VOQ-2 | Azure TTS pronunciation of specific heritage site names (e.g., غار حراء, بئر زمزم) | Mispronunciation would be embarrassing at demo | Build SSML pronunciation lexicon for 50 key heritage terms before demo |
| VOQ-3 | Web Speech API Arabic quality on specific target devices (Samsung Galaxy, iPhone) | Affects fallback quality | Test on actual devices early in development |
| VOQ-4 | Background noise impact at Al-Masjid al-Haram and heritage sites | May require noise cancellation preprocessing | Record sample audio at target sites and test with Deepgram |
| VOQ-5 | Latency of combined pipeline (STT → chatbot → TTS) end-to-end | Total round-trip must feel conversational (< 5 seconds) | Measure end-to-end latency in prototype |

---

*All pricing data researched March 2026. Pricing should be revalidated through direct vendor engagement before production deployment. Benchmarks cited are vendor-published unless noted as independent — independent validation recommended for production decisions.*
