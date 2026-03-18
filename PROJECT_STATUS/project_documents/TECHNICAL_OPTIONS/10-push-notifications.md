# Push Notifications

**Linked BRD Requirements**: BR-7 (User Re-engagement), BR-12 (PWA Compliance)
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md)
**Priority**: Nice to Have
**Research Tier**: Skip (Lightweight)

---

## 1. Context & BRD Alignment

Push notifications support the "Sites near me" re-engagement feature from the marketing strategy. The Athar PWA needs to notify users about nearby heritage sites to drive return visits. As a PWA on Next.js/Vercel with a bootstrapped budget, the solution must be free-tier compatible and work across platforms — critically including iOS Safari, since many pilgrims visiting Makkah and Madinah use iPhones.

**Key constraint**: iOS Safari only supports Web Push for home-screen-installed PWAs (since iOS 16.4). Users must add Athar to their home screen before push notifications work on iPhone. This is a fundamental platform limitation that affects all options equally.

## 2. Capability-Specific KPIs

| KPI | Description | Target | Weight |
|-----|-------------|--------|--------|
| iOS Safari Support | Works on iPhone home-screen PWA | Yes (iOS 16.4+) | High |
| Free Tier Limits | Monthly notification cap at $0 | ≥10K/month | High |
| Next.js/Vercel Integration | Ease of integration with existing stack | Native or simple SDK | Medium |
| Location/Geofence Capability | Trigger notifications by proximity | Basic support | Medium |
| Setup Complexity | Developer hours to implement | <1 day | Low |

## 3. Market Landscape

Web Push is a mature W3C standard supported by all major browsers. The key inflection point was iOS 16.4 (March 2023) adding Web Push support for home-screen PWAs, closing the last major browser gap. The market has two tiers: (1) direct Web Push API implementation via service workers with VAPID keys, and (2) managed platforms (FCM, OneSignal, Knock, Novu) that add dashboards, segmentation, and analytics on top.

For a bootstrapped PWA, the native Web Push API is viable but managed platforms add value through analytics and easier iOS quirk handling — all at free tier.

### All Viable Options Identified

| # | Option | Type | Free Tier |
|---|--------|------|-----------|
| 1 | Web Push API + Service Worker (native) | Build | Unlimited (self-managed) |
| 2 | Firebase Cloud Messaging (FCM) | Managed (Google) | Unlimited — FCM has no usage caps |
| 3 | OneSignal | Managed SaaS | 10,000 subscribers per send; unlimited sends |
| 4 | Knock | Managed SaaS | 10,000 notifications/month |
| 5 | Novu (self-hosted) | Open Source | Unlimited (self-hosted) |
| 6 | Novu (cloud) | Managed SaaS | Limited free tier |

## 4. Full Options Rating

| Option | iOS Support | Free Tier | Next.js Integration | Geofence | Setup Complexity | Overall (weighted) |
|--------|------------|-----------|--------------------|-----------|-----------------|--------------------|
| Web Push API (native) | 5 — Full (iOS 16.4+ PWA) | 5 — Unlimited | 4 — Manual SW setup in /public | 2 — Must build with Geolocation API | 3 — ~4-6 hrs | 3.9 |
| FCM | 5 — Full (via Web Push under hood) | 5 — Unlimited, no caps | 5 — Well-documented Next.js guides | 2 — No built-in geofence for web | 4 — ~2-3 hrs with guides | **4.4** |
| OneSignal | 5 — Full (dedicated iOS web push docs) | 4 — 10K subscribers/send | 4 — JS SDK, straightforward | 3 — Geofence via Radar integration | 4 — ~2-3 hrs | 4.1 |
| Knock | 4 — Via Web Push relay | 3 — 10K notifications/month cap | 4 — React SDK available | 1 — No geofence | 4 — ~2 hrs | 3.2 |
| Novu (self-hosted) | 4 — Via Web Push relay | 5 — Unlimited | 3 — Requires Docker hosting | 1 — No geofence | 2 — Needs separate server | 2.9 |
| Novu (cloud) | 4 — Via Web Push relay | 3 — Limited | 3 — API-based | 1 — No geofence | 3 — API setup | 2.8 |

*Scoring: 1–5 scale. Weights: iOS Support 30%, Free Tier 25%, Next.js Integration 20%, Geofence 15%, Setup 10%.*

## 5. Top Recommended Options

### Option 1: Firebase Cloud Messaging (FCM) — Recommended

- **Approach**: Integrate (free managed service)
- **Provider**: Google (Firebase)
- **Overview**: FCM is Google's cross-platform messaging solution. For web, it uses the W3C Push API under the hood but adds a management layer, analytics dashboard, and topic-based messaging. FCM handles VAPID key management and subscription lifecycle automatically.
- **KPI Performance**:
  - iOS Safari: Full support — FCM uses Web Push API which works on iOS 16.4+ home-screen PWAs ([Apple Developer Docs](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers))
  - Free tier: **Unlimited messages, no caps** — FCM is free on both Spark and Blaze plans ([Firebase Pricing](https://firebase.google.com/pricing))
  - Next.js: Excellent — multiple published integration guides; service worker in /public, Firebase SDK in client ([DEV.to guide](https://dev.to/na1969na/implementing-push-notifications-with-nextjs-and-firebase-cloud-messaging-4n6o))
  - Geofence: Not built-in for web; must combine with Geolocation API in service worker to trigger server-side sends
- **Pricing**: $0/month — completely free, no tier limits ([Firebase Pricing, accessed March 2026](https://firebase.google.com/pricing))
- **Pros**:
  - Truly unlimited at $0 — no subscriber or message caps
  - Topic messaging (e.g., "makkah-sites", "madinah-sites") for user segmentation at no cost
  - Well-maintained, Google-backed, extensive documentation
  - Already pairs well if Athar uses any other Firebase services
  - Handles token refresh, retry, and delivery tracking
- **Cons**:
  - Google dependency / vendor lock-in
  - No built-in geofencing for web (must build proximity logic separately)
  - Firebase console adds a JS dependency (~20KB gzipped)
  - Analytics require Blaze plan for advanced features
- **Integration Notes**: Add `firebase` npm package, configure in `next.config.js`, place `firebase-messaging-sw.js` in `/public`. Server-side sends via Firebase Admin SDK in Next.js API routes or Vercel serverless functions.
- **BRD Alignment**: Supports re-engagement requirements at zero cost, aligns with PWA architecture.

### Option 2: OneSignal (Free Tier)

- **Approach**: Integrate (managed SaaS)
- **Provider**: OneSignal Inc.
- **Overview**: Purpose-built push notification platform with dashboard, segmentation, A/B testing, and dedicated iOS web push documentation. The free tier allows unlimited subscribers but caps sends at 10,000 recipients per message.
- **KPI Performance**:
  - iOS Safari: Full support with dedicated setup guide ([OneSignal iOS Web Push Docs](https://documentation.onesignal.com/docs/en/web-push-for-ios))
  - Free tier: Unlimited subscribers, 10,000 recipients per send, unlimited sends ([OneSignal Pricing](https://onesignal.com/pricing))
  - Geofence: Available via Radar integration on paid plans; free tier has basic location targeting
- **Pricing**: $0/month on free tier; Growth plan starts at $9/month ([OneSignal Pricing, accessed March 2026](https://onesignal.com/pricing))
- **Pros**:
  - Dedicated push platform — best-in-class UX for notification management
  - 10K recipients/send is generous for a bootstrapped heritage app
  - Built-in A/B testing and delivery analytics on free tier
  - Geofence path via Radar if needed later
- **Cons**:
  - 10K recipient cap per send (fine for early stage, may need upgrade at scale)
  - OneSignal branding on free tier
  - Additional JS SDK dependency
- **Integration Notes**: Drop-in JS snippet or npm package. OneSignal handles service worker registration. REST API for server-side triggers.

### Option 3: Web Push API + Service Worker (Native)

- **Approach**: Build (no external dependency)
- **Provider**: W3C Standard / `web-push` npm package
- **Overview**: Direct implementation using the Push API and Notification API with VAPID keys. The `web-push` npm library handles encryption and sending from Next.js API routes. Subscriptions stored in Supabase.
- **KPI Performance**:
  - iOS Safari: Full support on iOS 16.4+ home-screen PWAs
  - Free tier: Unlimited — no third-party costs; only Supabase storage for subscriptions
  - Geofence: Must build manually using Geolocation API + periodic checks
- **Pricing**: $0 (uses existing Supabase for subscription storage)
- **Pros**:
  - Zero vendor dependency — pure web standards
  - No additional SDK bloat
  - Full control over notification logic and scheduling
  - Subscriptions in Supabase = already in your data layer
- **Cons**:
  - More setup work (~4-6 hours vs 2-3 hours for managed options)
  - Must build own analytics, retry logic, and token management
  - No dashboard — debugging requires custom tooling
- **Integration Notes**: Generate VAPID keys, create `sw.js` in `/public`, store `PushSubscription` objects in Supabase, send via `web-push` library in API routes.

## 6. Non-Recommended Options

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| Knock | Managed SaaS | 10K notifications/month cap is restrictive; no geofence; better suited for in-app notification feeds than web push; $250/mo after free tier |
| Novu (self-hosted) | Open Source | Requires separate Docker hosting — contradicts Vercel serverless architecture and adds ops burden for a Skip-tier capability |
| Novu (cloud) | Managed SaaS | Limited free tier; primary value is multi-channel orchestration which is overkill for a single web push use case |
| Pusher (Beams) | Managed SaaS | Push Beams product was sunset; Pusher Channels is for real-time messaging, not push notifications |

## 7. Recommendation

**Recommended: Firebase Cloud Messaging (FCM)**

FCM is the clear winner for Athar's bootstrapped context:

- **Unlimited messages at $0** — no caps, no subscriber limits, no per-send restrictions. This is unmatched; every other managed option has some free tier ceiling.
- **iOS Safari support** works identically to other Web Push implementations since FCM uses the standard Push API under the hood. Pilgrims on iPhones who add Athar to their home screen will receive notifications.
- **Proven Next.js integration** with multiple published guides and the official Firebase SDK.
- **Topic messaging** enables free user segmentation (e.g., "makkah-heritage" vs "madinah-heritage" topics) without building custom subscription management.

**Geofence gap**: No web push solution offers native geofencing for PWAs. The "sites near me" trigger must be built as a separate layer: use the Geolocation API in the service worker or a periodic client-side check, then call a Vercel serverless function that sends the FCM notification. This is ~2-4 hours of additional work regardless of which push provider is chosen.

**Fallback**: If Google dependency is unacceptable, use native Web Push API with `web-push` npm package — zero vendor lock-in, same iOS support, just more manual setup.

**Conditions for change**:
- If Athar grows past 50K users and needs advanced segmentation/analytics: evaluate OneSignal Growth plan ($9/mo)
- If multi-channel notifications needed (email + push + in-app): reconsider Novu or Knock

## 8. iOS Safari — Critical Notes for Pilgrim Audience

Since many pilgrims use iPhones, iOS web push behavior deserves emphasis:

1. **Requires home screen install**: Push notifications ONLY work when the PWA is added to the home screen. This must be part of the onboarding UX — a prominent "Add to Home Screen" prompt is essential.
2. **Permission must follow user gesture**: The notification permission dialog must be triggered by a tap/click (e.g., "Enable site alerts" button), not on page load. Safari blocks non-gesture-triggered prompts.
3. **iOS 16.4+ required**: Users on older iOS versions will not receive push. As of early 2026, iOS 16.4+ adoption is >95% of active iPhones.
4. **iOS 26 improvement**: With iOS 26, every site added to the Home Screen defaults to opening as a web app, which simplifies the install requirement ([MobiLoud, accessed March 2026](https://www.mobiloud.com/blog/progressive-web-apps-ios)).

---

*Research conducted March 2026. Pricing should be revalidated before implementation. All options use the W3C Push API standard — the iOS compatibility gap is at the platform level (home screen requirement), not the provider level.*
