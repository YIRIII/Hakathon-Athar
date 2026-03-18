# Smart Interactive Map

**Linked BRD Requirements**: BR-1 (Smart Interactive Map), BR-8 (Nearby Sites Discovery)
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Sections 7, 8
**Priority**: Must Have (BR-1), Should Have (BR-8)
**Tier**: Hero

---

## 1. Context & BRD Alignment

The Smart Interactive Map is Athar's primary interface, displaying 10-12 heritage sites across Makkah and Madinah, classified by type (religious, archaeological, cultural, museum) and city. It is the hero feature (business research score: 4.65/5) and the first thing users see.

**BRD Requirements**:
- **BR-1**: Interactive map with heritage site markers, category filtering, heritage-specific overlays, site previews, and navigation links. Must be PWA-compatible with responsive design.
- **BR-8**: GPS-based nearby sites discovery using Haversine distance calculations, proximity alerts, and contextual recommendations linking related sites.

**Key Constraints (from BRD & Budget Context)**:
- **Budget**: $0 cash for infrastructure (bootstrapped hackathon team). Infrastructure envelope: $0-$700/year. Must have a Bootstrap option using only free tiers or open-source.
- **Stack**: Next.js + React, hosted on Vercel (Hobby/free tier) with Cloudflare CDN.
- **Data scale**: 10-12 heritage sites (not thousands). This is a small dataset, meaning performance at scale is not the primary concern.
- **PWA**: Must work as installable PWA with offline resilience for visitors with poor connectivity.
- **Bilingual**: Arabic (primary) and English support. Map labels in Arabic are critical for the target audience.
- **Mobile-first**: 80%+ of Hajj/Umrah pilgrims use mobile devices. Touch gestures (pinch-zoom, pan) must be smooth.

**Approach Challenge Context**: The IDEA.md states the team plans to use "Leaflet Maps (open-source interactive maps)." Per the tech research methodology, this assumed approach must be challenged — we must research whether Leaflet is genuinely the best fit or if alternatives are superior.

---

## 2. Capability-Specific KPIs

| KPI | Description | BRD Target / Derived | Weight |
|-----|-------------|----------------------|--------|
| **K1: Year 1 TCO** | Total cost including license, hosting, and founder development time (imputed at $15/hr Saudi junior dev rate) | $0 (free tier / open-source only for Bootstrap) | High (3x) |
| **K2: Arabic/RTL Label Support** | Native or plugin-supported Arabic text rendering on map labels | Full Arabic label support for Makkah/Madinah | High (3x) |
| **K3: Custom Marker & Clustering** | Support for custom icons by heritage type + marker clustering | 4 heritage type icons + clustering for zoom levels | High (3x) |
| **K4: Mobile Touch Performance** | Smooth pinch-zoom, pan, gestures on mobile PWA | 60fps touch interactions on mid-range mobile | High (3x) |
| **K5: React Integration Quality** | Official or well-maintained React wrapper; Next.js SSR compatibility | Stable React wrapper with dynamic import support | Medium (2x) |
| **K6: Bundle Size (gzipped)** | JS payload size affecting PWA load time | <100KB gzipped for map library | Medium (2x) |
| **K7: Geolocation API Integration** | Built-in or easy integration with browser Geolocation API for nearby discovery | map.locate() or equivalent + watchPosition | Medium (2x) |
| **K8: Offline/Low-Connectivity Resilience** | Tile caching, service worker compatibility for PWA offline mode | Cached tiles viewable offline after first visit | Medium (2x) |
| **K9: Tile Source Flexibility** | Ability to use OSM, custom tiles, or multiple tile providers | OpenStreetMap + at least one alternative provider | Low (1x) |
| **K10: Developer Ecosystem & Docs** | Plugin ecosystem, documentation quality, community support, Stack Overflow presence | Well-documented, active community, plugin ecosystem | Low (1x) |

**Weight distribution**: High = 12x (4 KPIs), Medium = 8x (4 KPIs), Low = 2x (2 KPIs). Total weight units = 22.

**Cost KPI note**: Year 1 TCO is weighted High because the project has a $0 cash budget. Founder time is imputed at $15/hr based on Saudi junior developer compensation (~$2,400-$3,600/month per Glassdoor Saudi Arabia software developer salaries, researched 2026-03-18). For Athar's hackathon context (students), the actual cost is $0 — but imputing time ensures build options are evaluated honestly against ready-made alternatives.

---

## 3. Market Landscape

The JavaScript mapping library market in 2025-2026 is mature and well-segmented. Three categories of solutions exist:

1. **Open-source raster libraries**: Leaflet (dominant, 1.4M+ npm downloads/month), OpenLayers (GIS-heavy, enterprise)
2. **Open-source vector/WebGL libraries**: MapLibre GL JS (Mapbox fork, growing fast), CesiumJS (3D globes)
3. **Commercial platforms**: Mapbox GL JS (freemium, proprietary since v2), Google Maps JS API (freemium), HERE Maps, TomTom, ArcGIS JS API

For Athar's use case (10-12 markers, custom icons, filtering, geolocation, PWA, $0 budget), the key differentiator is **simplicity + zero cost + Arabic support**, not raw performance or large-dataset handling.

### All Viable Options Identified

| # | Option | Type | License / Pricing Model |
|---|--------|------|------------------------|
| 1 | Leaflet + react-leaflet | Open-source (raster) | BSD-2-Clause, free |
| 2 | MapLibre GL JS + react-map-gl | Open-source (vector/WebGL) | BSD-3-Clause, free |
| 3 | Mapbox GL JS + react-map-gl | Commercial (vector/WebGL) | Proprietary (v2+), 50K free map loads/month |
| 4 | Google Maps JS API | Commercial (raster/vector) | 10K free map loads/month (post-March 2025) |
| 5 | OpenLayers + rlayers | Open-source (raster/vector) | BSD-2-Clause, free |
| 6 | Pigeon Maps | Open-source (raster, React-native) | MIT, free |
| 7 | CesiumJS | Open-source (3D globe) | Apache 2.0, free |
| 8 | HERE Maps JS API | Commercial | 1,000 free requests/day |
| 9 | TomTom Maps SDK for JS | Commercial | 2,500 free requests/day |
| 10 | ArcGIS Maps SDK for JS | Commercial (GIS) | Free Essentials plan (dev/non-commercial); paid for commercial |
| 11 | deck.gl + MapLibre | Open-source (data viz overlay) | MIT, free |

---

## 4. Full Options Rating

### Scoring Matrix

| Option | K1: Cost (3x) | K2: Arabic/RTL (3x) | K3: Markers/Cluster (3x) | K4: Mobile Touch (3x) | K5: React Integration (2x) | K6: Bundle Size (2x) | K7: Geolocation (2x) | K8: Offline (2x) | K9: Tile Flexibility (1x) | K10: Ecosystem (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Leaflet + react-leaflet** | 5 | 4 | 5 | 4 | 4 | 5 | 5 | 4 | 5 | 5 | **4.55** |
| **MapLibre GL JS + react-map-gl** | 5 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | 5 | 4 | **4.23** |
| **Mapbox GL JS** | 4 | 5 | 4 | 5 | 4 | 3 | 4 | 4 | 4 | 4 | **4.14** |
| **Google Maps JS API** | 3 | 5 | 4 | 5 | 3 | 3 | 5 | 3 | 1 | 4 | **3.68** |
| **OpenLayers + rlayers** | 5 | 3 | 4 | 3 | 2 | 2 | 3 | 3 | 5 | 3 | **3.32** |
| **Pigeon Maps** | 5 | 2 | 2 | 4 | 5 | 5 | 2 | 2 | 3 | 2 | **3.14** |
| **CesiumJS** | 4 | 3 | 2 | 2 | 2 | 1 | 2 | 2 | 3 | 3 | **2.41** |
| **HERE Maps JS API** | 3 | 4 | 3 | 4 | 2 | 3 | 4 | 3 | 2 | 3 | **3.23** |
| **TomTom Maps SDK** | 3 | 3 | 3 | 4 | 2 | 3 | 4 | 3 | 2 | 3 | **3.09** |
| **ArcGIS Maps SDK for JS** | 2 | 4 | 3 | 3 | 2 | 2 | 3 | 3 | 4 | 3 | **2.82** |
| **deck.gl + MapLibre** | 5 | 5 | 3 | 3 | 4 | 2 | 3 | 3 | 5 | 3 | **3.59** |

**Leaflet weighted score calculation**:
(5x3 + 4x3 + 5x3 + 4x3 + 4x2 + 5x2 + 5x2 + 4x2 + 5x1 + 5x1) / (3+3+3+3+2+2+2+2+1+1)
= (15 + 12 + 15 + 12 + 8 + 10 + 10 + 8 + 5 + 5) / 22
= 100 / 22 = **4.55**

**MapLibre weighted score calculation**:
(5x3 + 5x3 + 4x3 + 4x3 + 4x2 + 3x2 + 4x2 + 4x2 + 5x1 + 4x1) / 22
= (15 + 15 + 12 + 12 + 8 + 6 + 8 + 8 + 5 + 4) / 22
= 93 / 22 = **4.23**

---

## 5. Top Recommended Options

### Option 1: Leaflet + react-leaflet -- Recommended

- **Approach**: Build (open-source integration)
- **Provider**: Vladimir Agafonkin (Leaflet), Paul Le Cam (react-leaflet) — open-source community
- **Overview**: Leaflet is the world's most popular open-source JavaScript library for mobile-friendly interactive maps, weighing ~39KB gzipped. Created in 2011, it has over a decade of production stability. react-leaflet (v5.0.0) provides React component bindings. Leaflet uses raster tiles (PNG/JPG from OpenStreetMap or other providers) rendered via standard DOM/Canvas — no WebGL required.
- **KPI Performance**:
  - **K1 (Cost)**: $0 cash. BSD-2-Clause license, fully free. Founder time: ~8-12 hours integration (imputed: $120-$180). Year 1 TCO: **$120-$180** (founder time only). Score: 5.
  - **K2 (Arabic/RTL)**: Leaflet uses raster tiles — Arabic labels on map tiles come from the tile provider (OpenStreetMap has Arabic labels for Saudi Arabia: [OpenMapTiles Arabic](https://openmaptiles.org/languages/ar/)). Custom markers/popups use standard HTML/CSS which fully support RTL via `dir="rtl"`. Known issue: Leaflet has a historical RTL layout bug ([GitHub #1095](https://github.com/Leaflet/Leaflet/issues/1095)) where tile rendering breaks when the page layout is RTL — workaround is to keep the map container LTR while using RTL content inside popups. Score: 4.
  - **K3 (Markers/Clustering)**: Excellent. Leaflet.markercluster plugin is mature and well-maintained ([GitHub](https://github.com/Leaflet/Leaflet.markercluster)). react-leaflet-cluster provides React wrapper. Custom icons via L.Icon with full control over iconUrl, size, anchor. For 10-12 heritage sites with 4 type categories, this is trivial. Score: 5.
  - **K4 (Mobile Touch)**: Leaflet was built mobile-first — the tagline is "mobile-friendly interactive maps." Supports pinch-zoom, tap, drag natively. No WebGL requirement means it works on older/cheaper devices common among pilgrims. Score: 4 (not 5 because WebGL libraries like Mapbox achieve smoother 60fps animations).
  - **K5 (React Integration)**: react-leaflet v5.0.0 is the official React wrapper, requires React 19 + Leaflet 1.9+. Well-documented at [react-leaflet.js.org](https://react-leaflet.js.org/). Next.js SSR requires `dynamic(() => import('./MapComponent'), { ssr: false })` — this is a well-documented pattern ([PlaceKit blog](https://placekit.io/blog/articles/making-react-leaflet-work-with-nextjs-493i)). Score: 4.
  - **K6 (Bundle Size)**: ~39KB JS gzipped + 4KB CSS gzipped = **~43KB total** ([Leaflet download page](https://leafletjs.com/download.html)). react-leaflet adds ~10KB gzipped. Total: **~53KB gzipped**. This is excellent for PWA. Score: 5.
  - **K7 (Geolocation)**: Built-in `map.locate()` method wraps the browser Geolocation API. Supports `setView`, `maxZoom`, `watch` (continuous tracking), `enableHighAccuracy`. Leaflet.AccuratePosition plugin improves accuracy. leaflet-locatecontrol adds a user-friendly locate button. Score: 5.
  - **K8 (Offline)**: Multiple mature plugins: Leaflet.TileLayer.PouchDBCached (caches tiles to IndexedDB via PouchDB), leaflet.offline (saves tiles for offline use). Service worker caching of tiles is well-documented for PWAs ([SWOM project](https://github.com/WebReflection/map)). Score: 4.
  - **K9 (Tile Flexibility)**: Leaflet works with any tile provider via TileLayer URL template. OpenStreetMap (free, Arabic labels), Stadia Maps (free tier), MapTiler (free tier), Mapbox (free tier), custom tiles. Score: 5.
  - **K10 (Ecosystem)**: 1.4M+ npm downloads/month (2025). 41,000+ GitHub stars. Hundreds of plugins at [leafletjs.com/plugins](https://leafletjs.com/plugins.html). Extensive Stack Overflow coverage. Score: 5.
- **Pricing**: Free (BSD-2-Clause). Tile costs depend on provider — OpenStreetMap tiles are free with attribution. *(Researched 2026-03-18)*
- **Pros**:
  - Smallest bundle size of any full-featured mapping library (~43KB gzipped)
  - No WebGL requirement — works on all devices, including older phones common among pilgrims
  - Built-in geolocation API perfect for BR-8 nearby discovery
  - Mature plugin ecosystem (clustering, offline tiles, GPS tracking, heatmaps)
  - Most widely used mapping library — easiest to find help, tutorials, examples
  - Active development: Leaflet 2.0 alpha released May 2025 with ESM modules, modern Pointer Events
  - Perfect for 10-12 markers — Leaflet excels at small-to-medium feature counts
- **Cons**:
  - Raster tiles lack dynamic styling (can't change map colors/labels at runtime like vector tiles)
  - RTL page layout has a known tile rendering bug (workaround exists)
  - No built-in 3D terrain or vector tile support (not needed for Athar)
  - Animations less smooth than WebGL-based libraries on high-end devices
- **Integration Notes**: Install `leaflet` + `react-leaflet` + `@types/leaflet`. Wrap map component in Next.js `dynamic()` with `ssr: false`. Use OpenStreetMap tiles with Arabic labels. Add `react-leaflet-cluster` for marker clustering. Custom heritage type icons via `L.Icon`. Geolocation via `map.locate({ watch: true, enableHighAccuracy: true })` for BR-8.
- **BRD Alignment**: Directly satisfies BR-1 (interactive map with filtering, markers, overlays) and BR-8 (geolocation-based nearby discovery) at zero cost. The 43KB bundle size supports PWA performance targets. OpenStreetMap tiles with Arabic labels serve the bilingual requirement.

### Option 2: MapLibre GL JS + react-map-gl

- **Approach**: Build (open-source integration)
- **Provider**: MapLibre community (open-source fork of Mapbox GL JS v1)
- **Overview**: MapLibre GL JS is an open-source WebGL-based mapping library that renders vector tiles. Fork of Mapbox GL JS after Mapbox switched to a proprietary license in v2. Supports custom styling, 3D terrain, smooth animations, and dynamic label rendering. react-map-gl (by Uber/vis.gl) provides React bindings. A newer react-maplibre wrapper is also emerging.
- **KPI Performance**:
  - **K1 (Cost)**: $0 cash. BSD-3-Clause license. Needs a vector tile source — MapTiler free tier or self-hosted OpenMapTiles. Founder time: ~12-16 hours (more complex setup than Leaflet). Year 1 TCO: **$180-$240** (founder time). Score: 5.
  - **K2 (Arabic/RTL)**: Excellent. MapLibre supports the `@mapbox/mapbox-gl-rtl-text` plugin via `setRTLTextPlugin()` ([MapLibre docs](https://maplibre.org/maplibre-gl-js/docs/API/functions/setRTLTextPlugin/)). This enables proper Arabic text rendering directly on vector tile labels. Lazy loading supported — plugin loads only when Arabic text is encountered. Score: 5.
  - **K3 (Markers/Clustering)**: Built-in clustering via GeoJSON source with `cluster: true` property. Custom markers via HTML/CSS or symbol layers. Less intuitive than Leaflet's L.Icon approach but more powerful for large datasets. For 10-12 sites, it's overkill but functional. Score: 4.
  - **K4 (Mobile Touch)**: WebGL rendering provides smooth 60fps animations, pinch-zoom, rotation, and tilt. However, WebGL requires more GPU resources — may drain battery faster on mobile and perform poorly on very old devices. Score: 4.
  - **K5 (React Integration)**: react-map-gl v8 (by Uber/vis.gl) supports MapLibre as a backend. A dedicated react-maplibre wrapper was recently released ([react-maplibre](https://visgl.github.io/react-maplibre/)). Next.js SSR requires `dynamic()` with `ssr: false` — same pattern as Leaflet. Known Turbopack issue with MapLibre workers ([Next.js #86495](https://github.com/vercel/next.js/issues/86495)). Score: 4.
  - **K6 (Bundle Size)**: MapLibre GL JS is significantly larger: ~200-250KB gzipped (includes WebGL shaders, vector tile parser, text rendering engine). Plus react-map-gl adds ~30KB. Total: **~230-280KB gzipped**. This is 4-5x larger than Leaflet. Score: 3.
  - **K7 (Geolocation)**: No built-in `map.locate()` equivalent. Requires manual browser Geolocation API integration with `navigator.geolocation.watchPosition()` and map flyTo/easeTo methods. Functional but more boilerplate than Leaflet. Score: 4.
  - **K8 (Offline)**: map-gl-offline npm package ([Medium article, Jan 2026](https://medium.com/@muimsd/map-gl-offline-complete-offline-maps-for-maplibre-gl-js-ea41b21a1324)) provides comprehensive offline storage for vector tiles, styles, fonts, and sprites via IndexedDB. Chrome service worker has a known stutter issue with IndexedDB tile cache. Score: 4.
  - **K9 (Tile Flexibility)**: Supports any vector or raster tile source. MapTiler, OpenMapTiles (self-hosted), Stadia Maps, custom styles. JSON-based style specification allows complete visual customization. Score: 5.
  - **K10 (Ecosystem)**: Growing rapidly — npm downloads trending up since mid-2024 ([Geoapify comparison](https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/)). 7,000+ GitHub stars. Smaller plugin ecosystem than Leaflet but growing. Score: 4.
- **Pricing**: Free (BSD-3-Clause). Vector tiles from MapTiler Cloud free tier or self-hosted OpenMapTiles. *(Researched 2026-03-18)*
- **Pros**:
  - Superior Arabic RTL text rendering (built into vector tile rendering pipeline)
  - Smooth WebGL animations and transitions
  - Dynamic styling — can change map appearance at runtime without re-fetching tiles
  - Modern, actively developed, growing community
  - Vector tiles are smaller to transfer than raster tiles
- **Cons**:
  - 4-5x larger bundle size than Leaflet (~250KB vs ~53KB gzipped)
  - WebGL requirement excludes very old devices
  - More complex setup (vector tile source configuration, style JSON)
  - Known Turbopack compatibility issue with Next.js
  - Overkill for 10-12 markers — Leaflet's simplicity is better suited
  - Smaller plugin ecosystem than Leaflet
- **Integration Notes**: Install `maplibre-gl` + `react-map-gl` (or `react-maplibre`). Configure vector tile source (MapTiler free tier or OpenMapTiles). Set up RTL text plugin. Wrap in Next.js `dynamic()` with `ssr: false`. Avoid `next dev --turbo` during development.
- **BRD Alignment**: Fully satisfies BR-1 and BR-8 at zero cash cost. Better Arabic rendering than Leaflet but at the cost of 4-5x larger bundle and more complex setup. The additional capabilities (3D terrain, dynamic styling) are not needed for Athar's MVP.

### Option 3: Mapbox GL JS v2+

- **Approach**: License (freemium commercial)
- **Provider**: Mapbox, Inc.
- **Overview**: The original commercial vector tile mapping library. Since v2, Mapbox GL JS uses a proprietary license requiring a Mapbox access token. Offers premium features: satellite imagery, 3D terrain, geocoding, navigation, and custom map styles via Mapbox Studio.
- **KPI Performance**:
  - **K1 (Cost)**: Free tier: 50,000 map loads/month ([Mapbox pricing](https://www.mapbox.com/pricing)). Beyond that: $5/1,000 loads. For Athar's expected traffic (hackathon demo → early users), 50K loads/month is generous. However, scaling could incur costs. Year 1 TCO: **$0-$60** cash (likely within free tier) + $120-$180 founder time = **$120-$240**. Score: 4 (risk of cost at scale, proprietary lock-in).
  - **K2 (Arabic/RTL)**: Excellent. Mapbox pioneered the `mapbox-gl-rtl-text` plugin ([Mapbox docs](https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-rtl-text/)). Arabic rendering is first-class. Score: 5.
  - **K3 (Markers/Clustering)**: Built-in clustering, custom markers, symbol layers. Mapbox Studio for visual map design. Score: 4.
  - **K4 (Mobile Touch)**: Best-in-class mobile performance via WebGL. Smooth 60fps, gestures, rotation, tilt. Score: 5.
  - **K5 (React Integration)**: react-map-gl v8 (official Uber/vis.gl wrapper) supports Mapbox. Well-documented. Same Next.js SSR dynamic import pattern. Score: 4.
  - **K6 (Bundle Size)**: ~210KB gzipped (similar to MapLibre). Score: 3.
  - **K7 (Geolocation)**: GeolocateControl built-in component. Score: 4.
  - **K8 (Offline)**: Limited — Mapbox's terms restrict tile caching. Offline functionality requires Mapbox Mobile SDK (native apps). Score: 4.
  - **K9 (Tile Flexibility)**: Locked to Mapbox tiles for most features (proprietary token required). Can use some external sources but the ecosystem is designed around Mapbox tiles. Score: 4.
  - **K10 (Ecosystem)**: Mature, well-documented, professional. Mapbox Studio is excellent. Score: 4.
- **Pricing**: 50,000 free map loads/month. $5/1,000 loads beyond. *(Researched 2026-03-18, [Mapbox pricing](https://www.mapbox.com/pricing))*
- **Pros**:
  - Best-in-class mobile performance and Arabic support
  - Mapbox Studio for visual map design (no-code style editing)
  - 50K free map loads/month is generous for a startup
  - Professional documentation and support
- **Cons**:
  - Proprietary license since v2 — vendor lock-in risk
  - Access token required — cannot self-host tiles
  - Offline tile caching restricted by terms of service
  - Potential cost at scale ($5/1K loads)
  - Bundle size 4x larger than Leaflet
- **BRD Alignment**: Satisfies BR-1 and BR-8 with premium quality. But proprietary lock-in and potential scaling costs conflict with the $0 budget philosophy. The team can't self-host if Mapbox changes pricing.

### Option 4: Google Maps JS API

- **Approach**: License (freemium commercial)
- **Provider**: Google
- **Overview**: The most widely recognized mapping platform. Provides satellite imagery, Street View, geocoding, places, and navigation. Post-March 2025 pricing replaced the $200/month credit with per-SKU free usage caps.
- **KPI Performance**:
  - **K1 (Cost)**: 10,000 free Dynamic Map loads/month (Essentials SKU, post-March 2025). Beyond: $2-$7/1,000 loads. For Athar's scale, 10K loads/month may be exceeded within months. Year 1 cash: **$0-$500** depending on growth. Score: 3.
  - **K2 (Arabic/RTL)**: Excellent native Arabic support — Google Maps renders Arabic labels natively with no plugins needed. Score: 5.
  - **K3 (Markers/Clustering)**: @googlemaps/markerclusterer library. Custom markers via MarkerWithLabel or AdvancedMarkerElement. Score: 4.
  - **K4 (Mobile Touch)**: Best-in-class. Google Maps sets the standard for mobile map UX. Score: 5.
  - **K5 (React Integration)**: @vis.gl/react-google-maps or @react-google-maps/api. Multiple wrappers, not a single official one — ecosystem fragmentation. Score: 3.
  - **K6 (Bundle Size)**: Loaded from CDN, not bundled. External script tag (~200KB loaded). Doesn't increase app bundle but adds external dependency. Score: 3.
  - **K7 (Geolocation)**: Excellent — Geolocation API well-integrated. Places API adds nearby search. Score: 5.
  - **K8 (Offline)**: Poor — Google Maps terms prohibit tile caching. Maps go blank offline. Score: 3.
  - **K9 (Tile Flexibility)**: None — locked to Google's tiles and styles. Cannot use OSM or custom tiles. Score: 1.
  - **K10 (Ecosystem)**: Massive ecosystem, excellent docs. Score: 4.
- **Pricing**: 10,000 free Dynamic Map loads/month. $2-$7/1,000 beyond. Requires billing account. *(Researched 2026-03-18, [Google Maps pricing](https://mapsplatform.google.com/pricing/))*
- **Pros**: Best Arabic support, familiar UX, massive ecosystem
- **Cons**: Only 10K free loads/month (vs. unlimited with open-source), no tile caching, complete vendor lock-in, requires billing account, no tile flexibility
- **BRD Alignment**: Good feature match but poor budget alignment. The $0 budget means any risk of charges is problematic. Lock-in to Google's tiles conflicts with long-term flexibility.

### Option 5: Pigeon Maps

- **Approach**: Build (open-source integration)
- **Provider**: Mariusandra (open-source)
- **Overview**: Ultra-lightweight React-native map component. Only 9.8KB gzipped. No external dependencies. Renders raster tiles with minimal features.
- **KPI Performance**:
  - **K1 (Cost)**: $0. MIT license. Score: 5.
  - **K2 (Arabic/RTL)**: Uses raster tiles (like Leaflet) — Arabic from tile provider. But no popup/overlay RTL support out of the box. Score: 2.
  - **K3 (Markers/Clustering)**: Basic markers only. No built-in clustering — requires external implementation. Limited customization compared to Leaflet. Score: 2.
  - **K4 (Mobile Touch)**: Smooth for basic interactions. Score: 4.
  - **K5 (React Integration)**: Built natively for React — best React integration of any option. No SSR issues. Score: 5.
  - **K6 (Bundle Size)**: 9.8KB gzipped — smallest of all options. Score: 5.
  - **K7 (Geolocation)**: No built-in geolocation. Must implement manually. Score: 2.
  - **K8 (Offline)**: No offline tile caching support. Score: 2.
  - **K9 (Tile Flexibility)**: Custom tile provider support. Score: 3.
  - **K10 (Ecosystem)**: Very small ecosystem. Limited documentation. Score: 2.
- **Pricing**: Free (MIT). *(Researched 2026-03-18)*
- **Pros**: Smallest bundle size (9.8KB), native React, zero dependencies
- **Cons**: Missing critical features for Athar (no clustering, no geolocation, no offline, limited markers). Would require significant custom development to match Leaflet's out-of-the-box capabilities.
- **BRD Alignment**: Fails to satisfy BR-1 (no clustering, limited markers) and BR-8 (no geolocation) without extensive custom development. The bundle size advantage doesn't justify the feature gaps.

---

## 6. Non-Recommended Options

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| **OpenLayers + rlayers** | Open-source | Overkill GIS library (~500KB+ bundled). Designed for complex cartographic applications, not simple heritage maps with 10-12 markers. React wrapper (rlayers) is community-maintained, not official. Bundle size 10x larger than Leaflet. Poor mobile touch UX compared to Leaflet/MapLibre. |
| **CesiumJS** | Open-source (3D) | Designed for 3D globes and terrain visualization. Massive bundle size. Requires Cesium ion for tile streaming (free tier: 5GB storage + 100GB streaming). Complete overkill for a 2D heritage map with 12 markers. No meaningful React wrapper. |
| **HERE Maps JS API** | Commercial | Free tier limited to 1,000 requests/day (low for a public-facing PWA). No official React wrapper. Smaller developer community than alternatives. No clear advantage over Leaflet + OSM for this use case. |
| **TomTom Maps SDK for JS** | Commercial | Free tier of 2,500 requests/day is limiting. No official React wrapper. Documentation quality lower than Leaflet/MapLibre/Google. Commercial focus on automotive/logistics, not heritage tourism. |
| **ArcGIS Maps SDK for JS** | Commercial (GIS) | Free Essentials plan is limited to development/non-commercial use. Commercial deployment requires paid ArcGIS Online subscription (enterprise pricing). Designed for professional GIS workflows — dramatically overpowered for a heritage PWA. |
| **deck.gl + MapLibre** | Open-source (data viz) | deck.gl is a powerful data visualization overlay library designed for rendering millions of data points (GPS traces, scatterplots, 3D visualizations). For 10-12 heritage markers, it adds significant bundle size (~150KB+) and complexity with zero benefit. The combination would be like using a rocket launcher to hang a picture frame. |

---

## 7. Recommendation

**Recommended: Leaflet + react-leaflet**

### Rationale

**Leaflet is the right choice for Athar — and the team's instinct was correct.** After evaluating 11 options across 10 KPIs, Leaflet scored 4.55/5 — the highest of all options, beating MapLibre (4.23) by a meaningful margin of 0.32 points.

The recommendation is driven by Athar's specific context:

1. **Budget alignment (BR-1, budget constraint)**: $0 cash cost. Leaflet is BSD-2-Clause with no usage limits, no API keys, no freemium traps. The team never needs to worry about exceeding map loads or surprising charges. This alone eliminates Google Maps (10K free loads), Mapbox (50K free loads), HERE, and TomTom.

2. **Bundle size for PWA (BR-1, PWA requirement)**: At ~53KB gzipped (Leaflet + react-leaflet), it's 4-5x smaller than MapLibre (~250KB) or Mapbox (~240KB). For a PWA targeting pilgrims on mobile networks in crowded Hajj/Umrah areas, every KB matters. Leaflet loads in <1 second on 3G.

3. **Perfect scale match**: Leaflet excels at exactly Athar's scale — 10-12 markers with custom icons, filtering, and popups. Performance benchmarks show Leaflet is fastest for <5,000 features ([MDPI study, 2025](https://www.mdpi.com/2220-9964/14/9/336)). MapLibre/Mapbox only outperform for 50,000+ features, which Athar will never reach.

4. **Geolocation for BR-8**: Leaflet's built-in `map.locate()` with `watch: true` provides exactly what BR-8 (Nearby Sites Discovery) requires — GPS tracking with Haversine distance calculations to surface nearby heritage sites. No other library has this built-in as elegantly.

5. **Device compatibility**: No WebGL requirement means Leaflet works on older Android devices common among international pilgrims. MapLibre/Mapbox require WebGL, which can fail on budget smartphones.

6. **Hackathon speed**: Leaflet's simplicity means faster development. The team can have a working map in 2-3 hours, vs. 6-8 hours for MapLibre (vector tile configuration, style JSON, RTL plugin setup).

**The one area where Leaflet is weaker**: Arabic/RTL map label rendering. Leaflet relies on raster tile providers for Arabic labels (OpenStreetMap has Arabic labels for Saudi Arabia), while MapLibre/Mapbox render Arabic text dynamically via vector tiles. This means Leaflet's Arabic labels depend on the tile provider's quality. **Mitigation**: Use OpenStreetMap tiles with Arabic name tags (`name:ar`) or MapTiler's multilingual tiles — both render Arabic labels correctly on raster tiles for Saudi Arabia.

### Conditions That Would Change This Recommendation

| Condition | Switch To |
|-----------|-----------|
| If the project scales to 1,000+ heritage sites requiring dynamic map styling | MapLibre GL JS |
| If the team needs 3D terrain visualization for archaeological sites | MapLibre GL JS with 3D terrain |
| If Leaflet 2.0 stable breaks react-leaflet compatibility | MapLibre GL JS (monitor Leaflet 2.0 release timeline) |
| If a government partner mandates a specific mapping platform | As required |

### Migration Path

If the team outgrows Leaflet, migration to MapLibre GL JS is straightforward:
1. Replace `react-leaflet` components with `react-map-gl` or `react-maplibre` components
2. Convert marker definitions from L.Icon to GeoJSON features
3. Set up vector tile source (MapTiler free tier or self-hosted OpenMapTiles)
4. Add RTL text plugin
5. Estimated migration effort: 8-16 hours (1-2 dev days)

---

## 8. Mini Case Study

### "Bomb Sight" — Mapping the WWII Bomb Census (UK National Archives)

The British National Archives built [Bomb Sight](http://www.bombsight.org/), an interactive heritage map using Leaflet that lets users explore WWII bombing records across London. The project:

- **Technology**: Leaflet + OpenStreetMap tiles
- **Scale**: Thousands of bombing locations with custom markers, clustering, and popups containing historical photographs and archival records
- **Heritage context**: Each marker links to digitized archival documents, similar to how Athar links markers to heritage site narratives
- **Mobile**: Works as a responsive web app for walking tours of bomb sites
- **Outcome**: Praised by the National Archives as a model for making heritage collections accessible through interactive maps ([Tandfonline, 2022](https://www.tandfonline.com/doi/full/10.1080/1369118X.2022.2113819))

This validates Leaflet as the standard choice for heritage mapping projects — similar scale, similar requirements, and proven in production with real cultural institutions.

### Additional Heritage Mapping on Leaflet

The University of Texas "Mapping the Humanities" initiative ([UT Austin](https://wikis.utexas.edu/display/MappingHumanities/Leaflet)) uses Leaflet as its recommended tool for cultural heritage mapping projects, citing its lightweight footprint and ease of use for non-technical heritage professionals. The "A Street Near You" project by James Morley uses Leaflet + OpenStreetMap for UK historical site discovery — conceptually very similar to Athar.

---

## Approach Validation

> **Approach Challenge Result: CONFIRMED -- Leaflet is the correct choice.**
>
> The team's stated approach of using Leaflet Maps was challenged against 10 alternatives including MapLibre GL JS, Mapbox GL JS, Google Maps JS API, OpenLayers, Pigeon Maps, CesiumJS, HERE Maps, TomTom, ArcGIS, and deck.gl.
>
> After scoring all 11 options across 10 weighted KPIs derived from BRD requirements, **Leaflet scored highest (4.55/5)**, beating the runner-up MapLibre GL JS (4.23/5) by 0.32 points. The margin is significant — not a tie.
>
> The factors that confirm Leaflet:
> - **$0 budget** eliminates commercial options (Google Maps, Mapbox, HERE, TomTom, ArcGIS)
> - **10-12 markers** makes WebGL-based rendering (MapLibre, Mapbox, deck.gl) unnecessary overhead
> - **PWA bundle size** strongly favors Leaflet (53KB vs 250KB+ for vector libraries)
> - **Built-in geolocation** for BR-8 is a unique Leaflet advantage
> - **Heritage mapping precedent** — UK National Archives, cultural institutions worldwide use Leaflet
>
> MapLibre GL JS is the recommended **upgrade path** if Athar scales beyond 1,000 sites or needs dynamic vector styling.

---

## Implementation Quick-Start for Athar

```
npm install leaflet react-leaflet @types/leaflet react-leaflet-cluster
```

**Next.js dynamic import pattern:**
```jsx
// components/HeritageMap.tsx — client component
'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';

// Custom heritage type icons
const heritageIcons = {
  religious: new L.Icon({ iconUrl: '/icons/religious.svg', iconSize: [32, 32] }),
  archaeological: new L.Icon({ iconUrl: '/icons/archaeological.svg', iconSize: [32, 32] }),
  cultural: new L.Icon({ iconUrl: '/icons/cultural.svg', iconSize: [32, 32] }),
  museum: new L.Icon({ iconUrl: '/icons/museum.svg', iconSize: [32, 32] }),
};
```

```jsx
// pages/map.tsx or app/map/page.tsx
import dynamic from 'next/dynamic';
const HeritageMap = dynamic(() => import('@/components/HeritageMap'), { ssr: false });
```

**Tile provider (free, Arabic labels):**
```
https://tile.openstreetmap.org/{z}/{x}/{y}.png
```
Attribution: "© OpenStreetMap contributors"

**Geolocation for BR-8 (Nearby Sites Discovery):**
```javascript
map.locate({ watch: true, enableHighAccuracy: true, maxZoom: 16 });
map.on('locationfound', (e) => {
  // Calculate Haversine distance to each heritage site
  // Surface nearest sites in UI
});
```

---

## Sources

1. Leaflet official site: https://leafletjs.com/ — Accessed 2026-03-18
2. react-leaflet documentation: https://react-leaflet.js.org/ — Accessed 2026-03-18
3. Leaflet download page (bundle size): https://leafletjs.com/download.html — Accessed 2026-03-18
4. Leaflet 2.0 Alpha release notes: https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html — Accessed 2026-03-18
5. Leaflet.markercluster plugin: https://github.com/Leaflet/Leaflet.markercluster — Accessed 2026-03-18
6. react-leaflet-cluster: https://github.com/akursat/react-leaflet-cluster — Accessed 2026-03-18
7. Leaflet RTL layout issue #1095: https://github.com/Leaflet/Leaflet/issues/1095 — Accessed 2026-03-18
8. MapLibre GL JS documentation: https://maplibre.org/maplibre-gl-js/docs/ — Accessed 2026-03-18
9. MapLibre RTL text plugin: https://maplibre.org/maplibre-gl-js/docs/API/functions/setRTLTextPlugin/ — Accessed 2026-03-18
10. MapLibre RTL support issue #220: https://github.com/maplibre/maplibre-gl-js/issues/220 — Accessed 2026-03-18
11. react-map-gl / react-maplibre: https://visgl.github.io/react-maplibre/ — Accessed 2026-03-18
12. Mapbox GL JS pricing: https://www.mapbox.com/pricing — Accessed 2026-03-18
13. Mapbox RTL text plugin: https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-rtl-text/ — Accessed 2026-03-18
14. Google Maps Platform pricing (post-March 2025): https://mapsplatform.google.com/pricing/ — Accessed 2026-03-18
15. Google Maps free usage caps announcement: https://www.storelocatorwidgets.com/blogpost/20499/New_Google_Maps_API_free_credit_system_from_March_1st_2025 — Accessed 2026-03-18
16. OpenMapTiles Arabic language support: https://openmaptiles.org/languages/ar/ — Accessed 2026-03-18
17. OpenStreetMap Saudi Arabia: https://wiki.openstreetmap.org/wiki/Saudi_Arabia — Accessed 2026-03-18
18. Pigeon Maps: https://pigeon-maps.js.org/ — Accessed 2026-03-18
19. Pigeon Maps GitHub: https://github.com/mariusandra/pigeon-maps — Accessed 2026-03-18
20. Leaflet.TileLayer.PouchDBCached (offline tiles): https://github.com/MazeMap/Leaflet.TileLayer.PouchDBCached — Accessed 2026-03-18
21. leaflet.offline: https://github.com/allartk/leaflet.offline — Accessed 2026-03-18
22. map-gl-offline for MapLibre: https://medium.com/@muimsd/map-gl-offline-complete-offline-maps-for-maplibre-gl-js-ea41b21a1324 — Accessed 2026-03-18
23. SWOM — Service Worker Offline Map: https://github.com/WebReflection/map — Accessed 2026-03-18
24. MapLibre vs Leaflet comparison (Jawg): https://blog.jawg.io/maplibre-gl-vs-leaflet-choosing-the-right-tool-for-your-interactive-map/ — Accessed 2026-03-18
25. Map libraries popularity comparison (Geoapify): https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/ — Accessed 2026-03-18
26. Vector data rendering performance analysis (MDPI 2025): https://www.mdpi.com/2220-9964/14/9/336 — Accessed 2026-03-18
27. Mapping libraries practical comparison (GIS Carta): https://giscarta.com/blog/mapping-libraries-a-practical-comparison — Accessed 2026-03-18
28. Making React-Leaflet work with Next.js (PlaceKit): https://placekit.io/blog/articles/making-react-leaflet-work-with-nextjs-493i — Accessed 2026-03-18
29. Next.js Turbopack MapLibre issue #86495: https://github.com/vercel/next.js/issues/86495 — Accessed 2026-03-18
30. Leaflet AccuratePosition plugin: https://github.com/M165437/Leaflet.AccuratePosition — Accessed 2026-03-18
31. leaflet-locatecontrol: https://github.com/domoritz/leaflet-locatecontrol — Accessed 2026-03-18
32. Bomb Sight heritage mapping (Tandfonline): https://www.tandfonline.com/doi/full/10.1080/1369118X.2022.2113819 — Accessed 2026-03-18
33. UT Austin Mapping the Humanities — Leaflet: https://wikis.utexas.edu/display/MappingHumanities/Leaflet — Accessed 2026-03-18
34. HERE Maps pricing: https://www.here.com/get-started/pricing — Accessed 2026-03-18
35. TomTom developer pricing: https://developer.tomtom.com/pricing — Accessed 2026-03-18
36. ArcGIS licensing: https://developers.arcgis.com/javascript/latest/licensing/ — Accessed 2026-03-18
37. Stadia Maps pricing: https://stadiamaps.com/pricing/ — Accessed 2026-03-18
38. MapTiler pricing: https://www.maptiler.com/cloud/pricing/ — Accessed 2026-03-18
39. CesiumJS: https://cesium.com/platform/cesiumjs/ — Accessed 2026-03-18
40. Cesium ion pricing: https://cesium.com/platform/cesium-ion/pricing/ — Accessed 2026-03-18
41. Leaflet mobile tutorial: https://leafletjs.com/examples/mobile/ — Accessed 2026-03-18
42. maplibre-nextjs-ts-starter: https://github.com/richard-unterberg/maplibre-nextjs-ts-starter — Accessed 2026-03-18
43. Next.js Leaflet Google Maps clone: https://dev.to/wellywahyudi/i-built-a-google-maps-clone-using-nextjs-16-leaflet-now-its-an-open-source-starter-kit-9n5 — Accessed 2026-03-18

---

*All pricing data researched on 2026-03-18. Pricing should be revalidated before procurement decisions. Vendor claims are noted as such — independent benchmarks cited where available.*
