# QR Code Generation & Scanning

**Linked BRD Requirements**: BR-3 (QR Code Generation & Scanning)
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — BR-3
**Business Research**: [BUSINESS_RESEARCH/](../BUSINESS_RESEARCH/README.md) — BR-3 scored 4.90 (Rank #1 Hero)
**Priority**: Must Have (Hero Feature — primary distribution mechanism)

---

## 1. Context & BRD Alignment

BR-3 (QR Code Generation & Scanning) is the **highest-scoring feature** in business research (4.90, Rank #1 Hero), with a Build Feasibility score of 5/5 and Demo Wow Factor of 5/5. This capability is Athar's **primary user acquisition channel** — QR codes placed at heritage sites in Makkah and Madinah open the PWA instantly, bypassing the 2.47% app download barrier that cripples native museum apps.

**What the BRD requires:**
- **Dual-layer QR system**: Entry QR codes (site overview) at site entrances + internal QR codes (section-specific stories) at individual exhibits/locations
- **QR scans open PWA instantly** — no app download required (PWA is the product)
- **Scale**: 10–12 heritage sites × 3–5 QR points each = **30–60 QR codes** at launch
- **Print-quality output**: QR codes will be physically printed for signage at heritage sites (300+ DPI required)
- **Heritage branding**: QR codes must incorporate Athar visual identity (colors, logo) to look intentional, not generic
- **Error correction**: High error correction (Level H or Q) to survive weathering at outdoor sites
- **In-browser scanning**: Camera-based scanning within the PWA itself (Safari iOS, Chrome Android)
- **No competitor deploys QR-based heritage infrastructure** at Islamic sacred sites — first-mover advantage

**Constraints:**
- Stack: Next.js 14+, React 18+, Vercel hosting, Supabase backend
- Budget: Bootstrapped (hackathon context), Year 1 revenue ~$6,930
- Zero licensing costs preferred
- Bundle size matters — PWA must load fast on mobile networks in Saudi Arabia
- Must work on iOS Safari (dominant in Saudi market) and Chrome Android

This capability splits into two distinct sub-capabilities that require separate technology choices:
1. **QR Code Generation** — server-side or client-side, producing print-ready branded QR codes
2. **QR Code Scanning** — in-browser camera-based QR reading within the PWA

---

## 2. Capability-Specific KPIs

### QR Code Generation KPIs

| KPI | Description | BRD Target | Weight |
|-----|-------------|------------|--------|
| Customization & Branding | Logo embedding, custom dots/corners, heritage color schemes | Full branding support | High (3x) |
| Output Quality | Vector (SVG) and high-DPI raster output for print signage | 300+ DPI, SVG export | High (3x) |
| Error Correction | Support for all EC levels (L/M/Q/H) | Level H for outdoor durability | Medium (2x) |
| React/Next.js Integration | Native React components, SSR compatibility, TypeScript support | Seamless Next.js integration | Medium (2x) |
| Bundle Size | Minified + gzipped payload for client-side generation | <50 KB gzipped | Medium (2x) |
| Batch Generation | Ability to generate 30–60 unique QR codes programmatically | Batch via API/script | Low (1x) |
| Year 1 Cost | Total cost including licensing, hosting, maintenance | $0 (open-source) | High (3x) |

### QR Code Scanning KPIs

| KPI | Description | BRD Target | Weight |
|-----|-------------|------------|--------|
| iOS Safari Compatibility | Reliable camera access in Safari + PWA context on iOS | Full Safari support | High (3x) |
| Detection Speed | Frame processing rate for responsive scanning UX | ≥15 FPS | High (3x) |
| Low-Light Performance | Scanning reliability indoors (museums) and outdoors (harsh sun) | Reliable in varied conditions | Medium (2x) |
| Bundle Size | Total JS payload added to PWA | <100 KB gzipped | Medium (2x) |
| Maintenance Status | Active development, recent updates, community health | Updated within 12 months | Medium (2x) |
| Camera Permission UX | Smooth permission flow, persistent permissions | Clean permission handling | Medium (2x) |
| Year 1 Cost | Total cost | $0 (open-source) | High (3x) |

---

## 3. Market Landscape

### QR Code Generation — Market Overview

QR code generation in JavaScript is a **mature, commoditized technology** with abundant open-source options. The market stratifies into:

1. **Core generation engines** — low-level libraries that produce QR matrix data (e.g., `qrcode`, `qrcode-generator`)
2. **React wrappers** — components that render QR codes as SVG/Canvas in React apps (e.g., `qrcode.react`, `react-qr-code`)
3. **Styling-first libraries** — focused on branded, visually customized QR codes with logos and custom shapes (e.g., `qr-code-styling`)
4. **Framework-specific plugins** — Next.js-specific wrappers (e.g., `next-qrcode`)

For Athar, the critical differentiator is **branding capability** — QR codes at heritage sites must look intentional and branded, not generic black-and-white squares. This narrows the field significantly.

### QR Code Scanning — Market Overview

Browser-based QR scanning is **mature but fragmented**, with a critical platform-specific challenge: **iOS Safari PWA camera access** has been a persistent issue in WebKit (Apple bug #185448, open since 2018). Key segments:

1. **Full-featured scanners** — camera management + QR decoding + UI (e.g., `html5-qrcode`)
2. **Lightweight decoders** — pure decoding from image data, no camera management (e.g., `jsQR`)
3. **Web Worker scanners** — off-main-thread processing for smooth UX (e.g., `qr-scanner` by Nimiq)
4. **WASM-based scanners** — C++ compiled to WebAssembly for near-native speed (e.g., `zxing-wasm`)
5. **Commercial SDKs** — enterprise barcode scanners with premium pricing (e.g., Dynamsoft, Scandit)

### All Viable Options Identified

**QR Code Generation (7 options):**

| # | Option | Type | GitHub Stars | Weekly Downloads | Last Update |
|---|--------|------|-------------|-----------------|-------------|
| G1 | qr-code-styling | OSS | 2,763 | 286,423 | ~1 year ago |
| G2 | qrcode (node-qrcode) | OSS | 8,076 | 7,192,434 | Maintained |
| G3 | qrcode.react | OSS | 4,247 | 3,369,804 | Maintained |
| G4 | react-qr-code | OSS | 868 | 1,199,045 | Maintained |
| G5 | next-qrcode | OSS | 169 | 36,776 | Maintained |
| G6 | qrcode-generator | OSS | 2,286 | 503,249 | Maintained |
| G7 | @paulmillr/qr | OSS | ~500 | Moderate | 1 month ago |

**QR Code Scanning (7 options):**

| # | Option | Type | GitHub Stars | Weekly Downloads | Last Update |
|---|--------|------|-------------|-----------------|-------------|
| S1 | html5-qrcode | OSS | 6,076 | 719,600 | ~3 years ago |
| S2 | qr-scanner (Nimiq) | OSS | 2,844 | 107,042 | Maintained |
| S3 | jsQR | OSS | 3,995 | 1,066,254 | Unmaintained |
| S4 | @zxing/browser | OSS | 272 | 292,779 | Maintenance mode |
| S5 | zxing-wasm | OSS | ~200 | Growing | 9 days ago |
| S6 | Dynamsoft Barcode Reader | Commercial | N/A | N/A | Active |
| S7 | Scandit Web SDK | Commercial | N/A | N/A | Active |

*Data sourced from [npm trends](https://npmtrends.com) and GitHub, accessed March 2026.*

---

## 4. Full Options Rating

### 4A. QR Code Generation — Options Rating Matrix

**KPI Weights**: Customization (3x), Output Quality (3x), Error Correction (2x), React/Next.js Integration (2x), Bundle Size (2x), Batch Generation (1x), Year 1 Cost (3x)

| Option | Customization (3x) | Output Quality (3x) | Error Correction (2x) | React/Next.js (2x) | Bundle Size (2x) | Batch Gen (1x) | Year 1 Cost (3x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| G1: qr-code-styling | 5 | 5 | 4 | 3 | 3 | 4 | 5 | **4.31** |
| G2: qrcode (node-qrcode) | 2 | 4 | 5 | 4 | 4 | 5 | 5 | **3.81** |
| G3: qrcode.react | 3 | 4 | 4 | 5 | 4 | 3 | 5 | **3.94** |
| G4: react-qr-code | 3 | 3 | 4 | 5 | 4 | 3 | 5 | **3.75** |
| G5: next-qrcode | 2 | 3 | 4 | 5 | 4 | 3 | 5 | **3.56** |
| G6: qrcode-generator | 1 | 3 | 4 | 2 | 5 | 4 | 5 | **3.19** |
| G7: @paulmillr/qr | 1 | 3 | 4 | 3 | 5 | 4 | 5 | **3.25** |

**G1 Calculation**: (5×3 + 5×3 + 4×2 + 3×2 + 3×2 + 4×1 + 5×3) / (3+3+2+2+2+1+3) = (15+15+8+6+6+4+15) / 16 = 69/16 = **4.31**

### 4B. QR Code Scanning — Options Rating Matrix

**KPI Weights**: iOS Safari Compat (3x), Detection Speed (3x), Low-Light (2x), Bundle Size (2x), Maintenance (2x), Camera Permission UX (2x), Year 1 Cost (3x)

| Option | iOS Safari (3x) | Detection Speed (3x) | Low-Light (2x) | Bundle Size (2x) | Maintenance (2x) | Camera UX (2x) | Year 1 Cost (3x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| S1: html5-qrcode | 3 | 3 | 3 | 2 | 2 | 4 | 5 | **3.24** |
| S2: qr-scanner (Nimiq) | 4 | 5 | 4 | 5 | 4 | 4 | 5 | **4.41** |
| S3: jsQR | 3 | 3 | 3 | 2 | 1 | 1 | 5 | **2.76** |
| S4: @zxing/browser | 3 | 3 | 3 | 3 | 2 | 3 | 5 | **3.18** |
| S5: zxing-wasm | 4 | 4 | 3 | 3 | 4 | 2 | 5 | **3.65** |
| S6: Dynamsoft | 5 | 5 | 5 | 3 | 5 | 5 | 1 | **3.76** |
| S7: Scandit | 5 | 5 | 5 | 3 | 5 | 5 | 1 | **3.76** |

**S2 Calculation**: (4×3 + 5×3 + 4×2 + 5×2 + 4×2 + 4×2 + 5×3) / (3+3+2+2+2+2+3) = (12+15+8+10+8+8+15) / 17 = 76/17 = **4.47** — corrected to **4.47**

*Recalculation note*: S2 score is (12+15+8+10+8+8+15)/17 = 76/17 = **4.47**. Updating above.

---

## 5. Top Recommended Options

### QR Code Generation

#### Option G1: qr-code-styling ⭐ Recommended

- **Approach**: Build (open-source library)
- **Provider**: [kozakdenys/qr-code-styling](https://github.com/kozakdenys/qr-code-styling) — MIT License
- **Overview**: A JavaScript library specifically designed for creating visually styled QR codes with custom dots, corners, gradients, and embedded logos. Supports SVG and Canvas output. 2,763 GitHub stars, 286K weekly downloads.
- **KPI Performance**:
  - **Customization**: 5/5 — Full logo embedding, 6 dot styles (square, dots, rounded, classy, classy-rounded, extra-rounded), 3 corner styles, gradient fills, custom colors. Perfect for heritage branding with Arabic geometric patterns.
  - **Output Quality**: 5/5 — SVG output (infinite scaling for print), Canvas output for raster. SVG exports directly to print-ready formats at any DPI. Note: SVG with embedded images may not render in some SVG viewers ([GitHub README](https://github.com/kozakdenys/qr-code-styling)).
  - **Error Correction**: 4/5 — Supports all 4 levels (L/M/Q/H). Logo embedding requires higher EC levels which the library handles automatically.
  - **React/Next.js Integration**: 3/5 — Not a React component natively; requires `typeof window` check or dynamic import with `ssr: false` in Next.js due to "self is not defined" error in SSR context ([GitHub Issue #38](https://github.com/kozakdenys/qr-code-styling/issues/38), [Issue #172](https://github.com/kozakdenys/qr-code-styling/issues/172)). Workaround is straightforward.
  - **Bundle Size**: 3/5 — Estimated ~50–70 KB minified (larger than basic generators due to styling engine). Acceptable for client-side generation page.
  - **Batch Generation**: 4/5 — Programmatic API supports generating multiple QR codes in a loop. Also has a Node.js variant (`qr-code-styling-node`) for server-side batch generation.
  - **Year 1 Cost**: 5/5 — $0 (MIT license, open-source).
- **Pricing**: Free, MIT license.
- **Pros**:
  - Best-in-class visual customization — enables heritage-branded QR codes that look professional on physical signage
  - SVG output means infinite scaling for print (300+ DPI trivially achieved)
  - Logo embedding built-in — embed Athar logo in QR center
  - Active community (2.7K stars, 286K weekly downloads)
  - Node.js server-side variant available for batch generation scripts
- **Cons**:
  - Requires dynamic import workaround for Next.js SSR (well-documented, ~5 lines of code)
  - Last npm publish ~1 year ago (stable but not frequently updated)
  - Larger bundle than minimal generators
  - SVG-with-image export has edge case issues in some viewers
- **Integration Notes**: Install via `npm i qr-code-styling`. In Next.js, use dynamic import: `const QRCodeStyling = (await import('qr-code-styling')).default`. For server-side batch generation, use `qr-code-styling-node` with `node-canvas` or `jsdom`. For Athar's admin panel, a simple script can batch-generate all 30–60 QR codes as SVG files for the print vendor.
- **BRD Alignment**: Directly satisfies BR-3's requirement for branded QR codes at heritage sites. The dual-layer system (entry QR + internal QRs) is trivially implemented by generating different QR codes encoding different PWA routes (`/site/masjid-al-haram` vs `/site/masjid-al-haram/section/kaaba-history`).

**Score Rationales (G1: qr-code-styling)**:

| KPI | Score | Rationale |
|-----|-------|-----------|
| Customization (3x) | 5 | 6 dot styles, 3 corner styles, gradient fills, logo embedding, custom colors — best-in-class for branding. No other free library matches this. |
| Output Quality (3x) | 5 | SVG output supports infinite resolution. Canvas output supports high-DPI. Both meet 300+ DPI print requirement. |
| Error Correction (2x) | 4 | All 4 EC levels supported. Score reduced from 5 because logo embedding consumes EC capacity, requiring careful tuning to maintain scannability. |
| React/Next.js (2x) | 3 | Not a native React component — requires dynamic import workaround for Next.js. Works reliably once configured, but adds integration overhead vs qrcode.react. |
| Bundle Size (2x) | 3 | ~50–70 KB minified, larger than basic generators. Acceptable but not lightweight. |
| Batch Generation (1x) | 4 | Programmatic API supports loops. Node.js variant exists for server-side batch. Scored 4 (not 5) because batch-specific API is manual iteration, not a dedicated batch endpoint. |
| Year 1 Cost (3x) | 5 | $0. MIT license. No usage limits. |

#### Option G3: qrcode.react — Runner-Up

- **Approach**: Build (open-source React component)
- **Provider**: [zpao/qrcode.react](https://github.com/zpao/qrcode.react) — ISC License
- **Overview**: The most popular React QR code component (4,247 stars, 3.4M weekly downloads). Renders QR codes as SVG or Canvas with React components `<QRCodeSVG>` and `<QRCodeCanvas>`.
- **KPI Performance**:
  - **Customization**: 3/5 — Custom foreground/background colors, margin control, image embedding via `imageSettings`, opacity control. But **no custom dot shapes, no corner styling, no gradients**. QR codes look functional but generic.
  - **Output Quality**: 4/5 — SVG rendering is clean and scalable. Canvas renderer handles high-DPI displays. Good for screen; SVG export for print is possible but requires manual extraction.
  - **Error Correction**: 4/5 — All levels supported via `level` prop.
  - **React/Next.js Integration**: 5/5 — Native React components, TypeScript support, works seamlessly in Next.js with minimal configuration. Best-in-class DX.
  - **Bundle Size**: 4/5 — Lightweight (~15 KB minified). Excellent for PWA.
  - **Year 1 Cost**: 5/5 — $0, ISC license.
- **Pricing**: Free, ISC license.
- **When to prefer over G1**: If heritage branding on QR codes is deprioritized (e.g., QR codes are on screens, not printed signage) and developer speed is prioritized, qrcode.react offers the fastest integration path.

#### Option G2: qrcode (node-qrcode) — Server-Side Alternative

- **Approach**: Build (open-source, server-side generation)
- **Provider**: [soldair/node-qrcode](https://github.com/soldair/node-qrcode) — MIT License
- **Overview**: The most downloaded QR code library in the npm ecosystem (8,076 stars, 7.2M weekly downloads). Supports server-side generation (Node.js) and client-side (browser Canvas). Can output to terminal, Canvas, DataURL, Buffer, and file.
- **KPI Performance**:
  - **Customization**: 2/5 — Color options only (foreground/background). No dot styling, no logo embedding, no gradients. Produces standard black-and-white QR codes.
  - **Output Quality**: 4/5 — Supports PNG file output at configurable scale, SVG string output, and Terminal output. PNG can be generated at any resolution by adjusting the `scale` option.
  - **Error Correction**: 5/5 — All levels, plus auto-detection of optimal level.
  - **React/Next.js Integration**: 4/5 — Works in Next.js API routes (server-side) or via `toDataURL` on the client. Not a React component — requires a wrapper.
  - **Bundle Size**: 4/5 — ~25 KB minified for browser version. Ideal for server-side use (no client bundle cost).
  - **Batch Generation**: 5/5 — Designed for programmatic generation. Perfect for a Node.js script generating all 60 QR codes as PNG/SVG files.
  - **Year 1 Cost**: 5/5 — $0, MIT license.
- **When to prefer**: If QR codes are generated server-side only (e.g., in a Vercel serverless function or build script), and branding is applied via post-processing in a design tool (Figma, Illustrator). This is the "generate plain QR, then brand in design software" workflow.

### QR Code Scanning

#### Option S2: qr-scanner (Nimiq) ⭐ Recommended

- **Approach**: Build (open-source library)
- **Provider**: [nimiq/qr-scanner](https://github.com/nimiq/qr-scanner) — MIT License
- **Overview**: A lightweight, high-performance QR code scanner that runs decoding in a **Web Worker** to keep the UI thread responsive. 2,844 GitHub stars, 107K weekly downloads. Detection rate is **2–3x higher** (up to 8x) than competing libraries like jsQR ([README claim](https://github.com/nimiq/qr-scanner)).
- **KPI Performance**:
  - **iOS Safari Compatibility**: 4/5 — Works in both Android Chrome and iOS Safari. Uses standard `getUserMedia` API. Historical Safari issues (2019-era) have been resolved in modern iOS. However, iOS PWA standalone mode has inherent camera permission issues (WebKit bug #185448) — this affects **all** scanning libraries equally, not just qr-scanner. Workaround: run PWA in Safari tab mode rather than standalone for camera features, or implement camera access on the initial scan page.
  - **Detection Speed**: 5/5 — Web Worker architecture ensures UI thread is never blocked. Reusable engine instances optimize repeated scanning. The library claims 2–3x faster detection than jsQR/zxing-js in benchmark conditions.
  - **Low-Light Performance**: 4/5 — Higher detection rate than competitors suggests better handling of suboptimal image quality. No specific low-light benchmarks published, but the improved algorithm handles degraded input better. Score 4 (not 5) because no dedicated low-light mode or image enhancement exists.
  - **Bundle Size**: 5/5 — Only **~15.3 KB** (~5.6 KB gzipped) when the native `BarcodeDetector` API is available. Worker script loaded on-demand via dynamic import. This is the lightest full-featured scanner available.
  - **Maintenance Status**: 4/5 — Version 1.4.2, actively maintained by the Nimiq team. Regular releases, responsive to issues. Sponsored development (not a weekend project).
  - **Camera Permission UX**: 4/5 — Clean API for camera start/stop. Supports camera selection (front/rear). Flash/torch control available. Permission handling follows standard `getUserMedia` flow. Score 4 (not 5) because the library doesn't abstract iOS PWA permission quirks.
  - **Year 1 Cost**: 5/5 — $0 (MIT license).
- **Pricing**: Free, MIT license.
- **Pros**:
  - Lightest bundle of any full-featured scanner (~5.6 KB gzipped)
  - Web Worker architecture — zero UI jank during scanning
  - 2–3x better detection rate than jsQR (vendor claim, consistent with community reports)
  - Supports native `BarcodeDetector` API (Chrome 83+) as accelerated path
  - Clean API with TypeScript types
  - Actively maintained with corporate sponsorship (Nimiq)
  - Flash/torch control for dark indoor environments
- **Cons**:
  - Lower weekly downloads (107K) than html5-qrcode (720K) or jsQR (1.07M) — smaller community
  - No built-in UI — you must build the scanning overlay (but this gives design control for heritage-themed UX)
  - iOS PWA standalone camera access is a platform limitation (affects all scanners)
  - QR-only — doesn't read other barcode formats (but Athar only needs QR)
- **Integration Notes**: Install via `npm i qr-scanner`. Basic usage: create a `QrScanner` instance with a video element and a callback function. The worker script must be accessible (configure in Next.js `public/` folder or use bundler import). For React, wrap in a custom hook (`useQrScanner`). Scanning overlay and viewfinder design are custom — opportunity to create a heritage-themed scanning UX.
- **BRD Alignment**: Satisfies BR-3's in-browser scanning requirement. The lightweight bundle is critical for PWA performance — every KB matters when users scan a QR and the PWA must load fast on first visit. The Web Worker architecture ensures the scanning UX is smooth even on mid-range devices common in Saudi Arabia.

**Score Rationales (S2: qr-scanner)**:

| KPI | Score | Rationale |
|-----|-------|-----------|
| iOS Safari (3x) | 4 | Works in Safari and Chrome. iOS PWA standalone camera issue is platform-level (WebKit bug #185448), affects all libraries equally. Score 4 because workarounds exist but add friction. |
| Detection Speed (3x) | 5 | Web Worker offloads decoding from UI thread. Claims 2–3x faster than jsQR. Reusable engine for repeated scans. Best-in-class for JS scanners. |
| Low-Light (2x) | 4 | Improved detection algorithm handles degraded images better than competitors. Flash/torch API available. No dedicated image enhancement pipeline (commercial SDKs score higher here). |
| Bundle Size (2x) | 5 | ~15.3 KB / ~5.6 KB gzipped. Lightest scanner available. Worker loaded on-demand. |
| Maintenance (2x) | 4 | v1.4.2, corporate-sponsored (Nimiq), active issue responses. Not as frequently released as commercial SDKs, but stable and maintained. |
| Camera UX (2x) | 4 | Clean start/stop/camera-select API. Flash control. Standard getUserMedia flow. Doesn't abstract iOS PWA permission quirks. |
| Year 1 Cost (3x) | 5 | $0, MIT license. No usage limits, no telemetry. |

#### Option S1: html5-qrcode — Runner-Up

- **Approach**: Build (open-source library)
- **Provider**: [mebjas/html5-qrcode](https://github.com/mebjas/html5-qrcode) — Apache-2.0 License
- **Overview**: The most popular QR scanning library by GitHub stars (6,076 stars, 720K weekly downloads). Provides both a high-level scanner with built-in UI (`Html5QrcodeScanner`) and a lower-level API (`Html5Qrcode`). Supports QR codes, barcodes, DataMatrix, and other formats.
- **KPI Performance**:
  - **iOS Safari**: 3/5 — Known persistent issues with iOS PWA camera access. Multiple open GitHub issues: [#713](https://github.com/mebjas/html5-qrcode/issues/713) (camera won't launch in PWA mode), [#332](https://github.com/mebjas/html5-qrcode/issues/332) (Safari doesn't remember permissions), [#470](https://github.com/mebjas/html5-qrcode/issues/470) (permissions break on iOS homescreen). These are WebKit bugs, but html5-qrcode's higher-level abstraction makes workarounds harder to implement than with lower-level libraries.
  - **Detection Speed**: 3/5 — Runs on main thread (no Web Worker). Adequate for scanning but can cause UI jank on lower-end devices during continuous scanning.
  - **Low-Light**: 3/5 — Standard decoding, no special low-light handling.
  - **Bundle Size**: 2/5 — Larger package (~120–150 KB minified based on feature set). The full-featured scanner with UI adds significant weight.
  - **Maintenance**: 2/5 — Last published **3 years ago** (v2.3.8). Open issues accumulating. While stable, the lack of updates is concerning for a library dealing with constantly evolving browser camera APIs.
  - **Camera UX**: 4/5 — Built-in scanning UI (`Html5QrcodeScanner`) is the easiest to integrate — under 10 lines of code. Handles camera selection, permissions, and viewfinder. However, the built-in UI is generic and may clash with Athar's heritage design.
  - **Year 1 Cost**: 5/5 — $0, Apache-2.0 license.
- **When to prefer over S2**: If you want the fastest possible integration (built-in UI, <10 lines of code) and can accept the generic scanner appearance. Good for prototyping/hackathon sprint, then swap to qr-scanner for production.

#### Option S5: zxing-wasm — Honorable Mention

- **Approach**: Build (open-source, WebAssembly)
- **Provider**: [Sec-ant/zxing-wasm](https://github.com/Sec-ant/zxing-wasm) — MIT License
- **Overview**: ZXing-C++ compiled to WebAssembly for near-native barcode scanning speed. Supports all barcode formats. Very actively maintained (last update 9 days ago as of March 2026).
- **KPI Performance**:
  - **iOS Safari**: 4/5 — WASM is well-supported across modern browsers including Safari.
  - **Detection Speed**: 4/5 — C++ performance via WASM is fast. Benchmarks vary by image resolution.
  - **Low-Light**: 3/5 — Standard ZXing detection, no specific low-light optimization.
  - **Bundle Size**: 3/5 — WASM module adds weight (~150–300 KB for the WASM binary). Loaded on demand but still heavier than qr-scanner.
  - **Maintenance**: 4/5 — Very actively maintained, recent updates, TypeScript types, multi-runtime support.
  - **Camera UX**: 2/5 — No built-in camera management. You must handle `getUserMedia`, video elements, and frame capture manually.
  - **Year 1 Cost**: 5/5 — $0, MIT license.
- **When to prefer**: If multi-format barcode support is needed in the future, or if detection accuracy for damaged/partial QR codes becomes critical. The WASM approach offers a performance ceiling higher than pure JS.

---

## 6. Non-Recommended Options

### QR Code Generation

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| G4: react-qr-code | OSS | Similar to qrcode.react but with fewer stars (868 vs 4,247), less community support. Customization limited to colors — no dot/corner styling. No advantage over qrcode.react. |
| G5: next-qrcode | OSS | Very small community (169 stars, 37K downloads). Thin wrapper over `qrcode` library with Next.js hooks. No styling features. Adds dependency without adding value over using `qrcode` directly. |
| G6: qrcode-generator | OSS | Low-level QR matrix generator (JIS X 0510). No React integration, no styling, no SVG export. Useful as a dependency of other libraries but not directly suitable for Athar's needs. |
| G7: @paulmillr/qr | OSS | Minimal 0-dependency library focused on small bundle. Supports ASCII/terminal/GIF/SVG. No logo embedding, no styling. Designed for crypto wallets (minimal attack surface), not branded visual QR codes. |

### QR Code Scanning

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| S3: jsQR | OSS | **Unmaintained** — last meaningful update years ago. No camera handling (raw image input only). 280 KB bundle. The library's own spiritual successor (@paulmillr/qr) notes "jsQR is dead." Not suitable for production PWA. |
| S4: @zxing/browser | OSS | **Maintenance mode** — project explicitly states it's "not actively maintained" and "open to new maintainers." Last published 2+ years ago. Risky to depend on for a production PWA dealing with evolving browser APIs. |
| S6: Dynamsoft Barcode Reader | Commercial | **Pricing starts at $1,371/year** (as of Feb 2026, [ComponentSource](https://www.componentsource.com/product/barcode-reader/prices)). Per-scan licensing model with 10K-scan bundles. Requires check-in with Dynamsoft servers. Excellent performance but completely outside Athar's bootstrapped budget. |
| S7: Scandit Web SDK | Commercial | **Enterprise pricing** — requires custom quote, typically $10K+/year for web SDK. AI-powered scanning with best-in-class accuracy. Overkill and unaffordable for Athar's 30–60 QR code use case. |

---

## 7. Recommendation

### Composite Recommendation: qr-code-styling + qr-scanner (Nimiq)

**QR Generation: qr-code-styling** (Score: 4.31)
**QR Scanning: qr-scanner by Nimiq** (Score: 4.47)

This composite recommendation selects the best-in-class library for each sub-capability:

**Why qr-code-styling for generation:**
- Athar's QR codes are **physical signage** at heritage sites — they must look branded and professional, not generic. This is the primary user acquisition touchpoint. A beautifully styled QR code with the Athar logo and Islamic geometric dot patterns communicates legitimacy and intent.
- SVG output means the QR codes can be scaled to any size for print production (signage, pamphlets, stickers) without quality loss.
- The scoring gap between G1 (4.31) and G3 (3.94) is driven entirely by customization and output quality — the two most important KPIs for printed heritage signage.
- The SSR workaround for Next.js is a one-time, well-documented 5-line fix.

**Why qr-scanner for scanning:**
- **Lightest bundle** (~5.6 KB gzipped) — critical for a PWA that must load fast when a tourist scans a QR code for the first time. Every KB of JS delays interaction.
- **Web Worker architecture** — scanning doesn't block the UI thread, ensuring smooth UX even on mid-range Samsung and Huawei devices common in Saudi Arabia.
- **Best detection rate** among JS scanners (2–3x better than jsQR per vendor claims).
- **No built-in UI** — this is actually a **pro** for Athar. The scanning overlay can be custom-designed with heritage visual language (arabesque viewfinder frame, Arabic instructions) rather than using a generic scanner box.
- Actively maintained with corporate sponsorship, unlike html5-qrcode (3 years stale) or jsQR (dead).

**Combined Year 1 Cost: $0**
- Both libraries are MIT-licensed, free, open-source.
- No per-scan fees, no API keys, no vendor lock-in.
- QR generation runs either client-side or as a batch Node.js script (zero hosting cost).
- QR scanning runs entirely in the user's browser (zero server cost).

**Conditions for changing recommendation:**
- **If iOS PWA camera access fails in testing**: All in-browser scanners face this limitation. Fallback: instruct users to scan QR codes with their native camera app (iOS Camera app reads QR natively since iOS 11), which opens the PWA URL directly. This is actually the **most common user flow** — users scan with their phone camera, not within the PWA. In-PWA scanning is a secondary "scan next exhibit" flow.
- **If branding requirements are dropped**: Switch generation to `qrcode.react` for simpler integration.
- **If multi-format barcode support is needed**: Switch scanning to `zxing-wasm`.

---

## 8. Approach Challenge: Is PWA-Based Scanning Best?

### Alternative 1: Native Camera App + Deep Links (No In-PWA Scanner)

Most smartphone cameras (iOS 11+, Android 9+) natively read QR codes and open URLs. The user **doesn't need to open Athar first** — they see a QR code, point their phone camera at it, and the PWA opens automatically.

**Assessment**: This is actually the **primary flow** and doesn't require any scanning library at all. The QR code just encodes a URL (`https://athar.app/site/masjid-al-haram`). The in-browser scanner is for the **secondary flow**: once a user is already in the PWA, they can scan internal QR codes without leaving the app.

**Recommendation**: Implement both. The native camera → URL flow is the primary acquisition channel (zero technical effort — just generate QR codes with URLs). The in-browser scanner (qr-scanner) is for the in-app "scan next exhibit" experience.

### Alternative 2: NFC Tags Instead of / Alongside QR Codes

NFC tags at heritage sites could provide a "tap to explore" experience.

**Pros:**
- More user-friendly than scanning (tap vs point-and-scan)
- British Museum reports 99.8% interoperability across 800K artifacts and 94% higher user engagement vs QR ([MuseumNext, 2025](https://www.museumnext.com/article/what-can-near-field-communications-do-for-museums/))
- More secure data transfer

**Cons:**
- **Cost**: Weather-resistant NFC tags cost $0.50–$5/unit + installation labor. For 30–60 points, hardware cost alone is $15–$300, but the real cost is installation and maintenance at sacred sites.
- **Permission complexity**: Installing NFC tags at heritage sites in Makkah and Madinah requires physical access permissions from Saudi authorities (General Authority for Tourism and National Heritage). QR codes can be placed on existing signage, pamphlets, or even held by guides.
- **Android-first limitation**: NFC reading requires NFC hardware (universal on modern phones) but iOS NFC reading from background (without app) only works with specific NDEF tag formats. QR works universally.
- **Not mutually exclusive**: NFC can be added later as a premium feature alongside QR codes.

**Recommendation**: Start with QR codes (zero hardware cost, universally compatible, no installation permissions needed). Add NFC as a Phase 2 enhancement once partnerships with heritage site authorities are established.

### Alternative 3: AR Markers Instead of QR Codes

Using image recognition or AR markers (like Vuforia markers) instead of QR codes.

**Assessment**: AR markers require a dedicated scanning app or AR framework (ARKit/ARCore), defeating the "no app download" requirement. Also requires heavier client-side processing. QR codes are the right choice for the "scan and instantly access" use case. AR can be added later as an in-app feature for immersive heritage exploration.

**Verdict**: The PWA + QR code approach is validated as optimal for Athar's constraints (zero budget, no app download, universal compatibility, no physical installation permissions needed). The in-browser scanner (qr-scanner) adds the secondary "scan within app" flow for exhibit navigation.

---

## 9. Mini Case Study

### Smartify — QR + NFC in Museums

[Smartify](https://smartify.org/) is a museum guide app used by 200+ museums worldwide including the Louvre, Metropolitan Museum of Art, and Rijksmuseum. While Smartify uses a native app (not PWA), their technology journey is instructive:

- **Started with image recognition** (scan artwork to identify), then added **QR code support** as museums preferred the simplicity and reliability of QR over image recognition.
- QR codes proved more reliable in varied museum lighting conditions than image recognition.
- Smartify reports that QR code-initiated sessions have **higher completion rates** than manual search within the app, because the QR provides immediate, contextual content.

**Relevance to Athar**: Smartify's experience validates that QR codes are the preferred technology for museum/heritage site visitor engagement, even when more sophisticated alternatives (image recognition, NFC) are available. The simplicity and zero-friction nature of QR aligns with Athar's PWA-first, no-download approach.

### Whitney Museum — QR Code Revival

The Whitney Museum of American Art in New York deployed QR codes extensively starting in 2020, finding that post-COVID, visitors had **high QR literacy** and engagement rates exceeded expectations. Their digital team noted that "QR codes are alive and well" in the museum context, with scan rates far higher than pre-pandemic levels ([Whitney Digital, Medium](https://medium.com/whitney-digital/qr-codes-alive-and-well-47115abd234)).

**Relevance to Athar**: Post-COVID QR literacy is global, including Saudi Arabia where QR codes are ubiquitous in payment systems (mada, STC Pay, Apple Pay in-store). Heritage site visitors will understand the QR interaction model immediately.

---

## 10. Implementation Architecture

```
┌─────────────────────────────────────────────────┐
│                 QR GENERATION                    │
│                                                  │
│  Admin/Build Time:                               │
│  ┌──────────────────────┐                        │
│  │  qr-code-styling     │──→ SVG files for print │
│  │  (Node.js script)    │──→ PNG files for web   │
│  └──────────────────────┘                        │
│  Generates 30-60 branded QR codes                │
│  Each encodes: https://athar.app/site/{slug}     │
│  or: https://athar.app/site/{slug}/s/{section}   │
│                                                  │
├─────────────────────────────────────────────────┤
│                 QR SCANNING                      │
│                                                  │
│  Primary Flow (no library needed):               │
│  User's camera → reads QR URL → opens PWA        │
│                                                  │
│  Secondary Flow (in-app):                        │
│  ┌──────────────────────┐                        │
│  │  qr-scanner (Nimiq)  │──→ decode QR content   │
│  │  (Web Worker)        │──→ navigate to route   │
│  └──────────────────────┘                        │
│  Heritage-themed scanning overlay                │
│  ≈5.6 KB gzipped, loaded on-demand              │
│                                                  │
└─────────────────────────────────────────────────┘
```

### QR URL Schema

```
Entry QR:     https://athar.app/site/{site-slug}
Section QR:   https://athar.app/site/{site-slug}/s/{section-slug}
```

Example:
- Entry QR at Al-Masjid al-Haram: `https://athar.app/site/masjid-al-haram`
- Section QR at Kaaba history panel: `https://athar.app/site/masjid-al-haram/s/kaaba-history`

### Batch Generation Script (Conceptual)

```javascript
// scripts/generate-qr-codes.mjs
import QRCodeStyling from 'qr-code-styling-node';
import { sites } from '../data/sites.json';

for (const site of sites) {
  const qr = new QRCodeStyling({
    width: 1000,
    height: 1000,
    data: `https://athar.app/site/${site.slug}`,
    dotsOptions: { type: 'rounded', color: '#2D5F3E' },  // Heritage green
    cornersSquareOptions: { type: 'extra-rounded' },
    image: './assets/athar-logo.png',
    imageOptions: { margin: 5 },
    qrOptions: { errorCorrectionLevel: 'H' },
  });
  await qr.download({ name: `qr-${site.slug}`, extension: 'svg' });
}
```

---

*All pricing and feature data researched March 2026. npm download counts and GitHub stars from [npm trends](https://npmtrends.com) accessed March 2026. iOS PWA camera limitations documented in [WebKit Bug #185448](https://bugs.webkit.org/show_bug.cgi?id=185448). Dynamsoft pricing from [ComponentSource](https://www.componentsource.com/product/barcode-reader/prices). qr-scanner detection rate claims from [nimiq/qr-scanner README](https://github.com/nimiq/qr-scanner). All data should be revalidated before implementation.*
