# Phase 5: Voice AI Heritage Guide

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Research Links
- **Business Research:** BR-9 (Voice AI Chatbot) — Score 4.00 → [09-voice-ai-chatbot.md](../../project_documents/BUSINESS_RESEARCH/09-voice-ai-chatbot.md)
- **Technical Options:** TC-5 (Voice AI STT/TTS) → [05-voice-ai-stt-tts.md](../../project_documents/TECHNICAL_OPTIONS/05-voice-ai-stt-tts.md)
- **PRD:** F5 (Voice AI Guide — Phase 2 feature)

## Recommended Tech Stack
- **STT (Speech-to-Text):** Deepgram Nova-3 (Arabic + English, free $200 credits)
- **TTS (Text-to-Speech):** Azure Neural TTS (free tier: 500K chars/month)
- **Islamic Pronunciation:** SSML markup for Islamic terminology
- **Fallback:** Graceful degradation to text chat when voice unavailable

## Estimated Cost
$0-$132/year cash (covered by free credits initially)

## Budget Context
- **Active tier:** Bootstrap
- **Phase cost vs. budget:** $0-$132 — within Bootstrap tier
- **Domain breakdown:** Infrastructure $0-$132
- **Sanity check:** PASS

## Prerequisites
- Phase 3 must be complete (text chatbot is the foundation — voice adds STT/TTS layer on top)

## Implementation Steps
- [ ] **5.1:** Set up Deepgram Nova-3 account and API integration — Arabic and English STT with heritage terminology hints
- [ ] **5.2:** Set up Azure Neural TTS account — Arabic (ar-SA) and English voices with natural prosody
- [ ] **5.3:** Build voice input UI — microphone button, real-time audio streaming to Deepgram, visual feedback (waveform/pulse)
- [ ] **5.4:** Implement SSML pronunciation guide for Islamic terminology — correct pronunciation of heritage-specific terms (mosque names, historical figures, Islamic concepts)
- [ ] **5.5:** Connect voice pipeline to existing chatbot — STT output → RAG chatbot → TTS response, maintain conversation context
- [ ] **5.6:** Add end-to-end latency optimization — target <5s from speech end to audio response start, streaming TTS
- [ ] **5.7:** Build graceful fallback — detect when microphone unavailable (iOS Safari restrictions, denied permission) and fall back to text chat with clear UX messaging
- [ ] **5.8:** Test cross-browser compatibility — iOS Safari, Android Chrome, desktop browsers (voice APIs have varying support)

## Key Decisions (from research)
- Deepgram Nova-3 over Google Speech-to-Text — better Arabic dialect support, generous free credits ($200)
- Azure Neural TTS over Google Cloud TTS — more natural Arabic voices, SSML support for Islamic terminology
- Voice as overlay on text chat, not replacement — text chat works everywhere, voice is progressive enhancement
- SSML over phonetic spelling — proper pronunciation of Islamic terms without modifying the text

## Acceptance Criteria
- Voice input works in Arabic and English
- End-to-end latency <5s (NFR equivalent)
- Islamic terminology pronounced correctly via SSML
- Graceful fallback to text when voice unavailable
- Works on iOS Safari and Android Chrome
- No prophet voice impersonation (same guardrails as text chat)

## Competitive Context
- Voice AI heritage guides exist for Western sites (e.g., museum audio guides) but none for Arabic/Islamic heritage
- Arabic STT quality has improved significantly with Nova-3 — makes this feasible now

## Research Gaps
- No PRICING_STRATEGY: Voice feature assumed premium-only — higher API costs justify gating
- No RISK_ASSESSMENT: Deepgram/Azure free tier exhaustion risk not formally assessed
- No CONSTRAINT_VALIDATION: STT accuracy for Arabic dialects in noisy outdoor environments not tested
