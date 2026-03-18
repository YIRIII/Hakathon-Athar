# Capability 9: Navigation Integration

**Tier**: Skip (Lightweight Research)
**Business Rank**: #9 (Score: 2.80) — Standard functionality, trivial to implement
**BR Reference**: BR-7 (Google Maps / navigation integration)
**Date**: 2026-03-18

---

## Overview

Navigation integration for Athar means providing a "Get Directions" button on each heritage site detail page that opens the user's preferred maps app with turn-by-turn navigation to the site's coordinates. This is commodity functionality requiring no API keys, no backend, and zero ongoing cost — just well-formed URLs.

---

## Options Survey

### Option A: Google Maps URL (Recommended Primary)

**URL Format:**
```
https://www.google.com/maps/dir/?api=1&destination={lat},{lng}&travelmode=walking
```

**Key parameters:**
- `destination` — lat/lng or address string (URL-encoded)
- `origin` — optional; omit to use device location
- `travelmode` — `driving`, `walking`, `bicycling`, `transit`
- `destination_place_id` — optional Google Place ID for exact match

**Pros:** Works on all platforms (web, iOS, Android). Opens Google Maps app if installed, falls back to browser. No API key needed. Free.

**Source:** [Google Maps URLs documentation](https://developers.google.com/maps/documentation/urls/get-started)

---

### Option B: Apple Maps URL

**URL Format:**
```
https://maps.apple.com/?daddr={lat},{lng}&dirflg=w
```

**Key parameters:**
- `daddr` — destination address or lat/lng
- `dirflg` — `d` (driving), `w` (walking), `r` (transit)
- `t` — map type: `m` (standard), `k` (satellite), `h` (hybrid)

**Pros:** Native experience on iOS/macOS. Auto-uses device location as origin.
**Cons:** Only useful for Apple device users. Opens in browser on Android/Windows.

**Source:** [Apple Map Links documentation](https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html), [Unified Maps URLs](https://developer.apple.com/documentation/mapkit/unified-map-urls)

---

### Option C: Waze Deep Link

**URL Format:**
```
https://waze.com/ul?ll={lat},{lng}&navigate=yes&zoom=17
```

**Key parameters:**
- `ll` — latitude,longitude
- `navigate` — `yes` to start navigation immediately
- `zoom` — zoom level
- Add `&utm_source=athar` for analytics

**Pros:** Very popular in Saudi Arabia. Excellent traffic data for Makkah/Madinah (congestion around Haram areas). Falls back to Waze website if app not installed.
**Cons:** Requires Waze app for full experience.

**Source:** [Waze Deep Links documentation](https://developers.google.com/waze/deeplinks)

---

### Option D: `geo:` URI Scheme (Android Intent)

**URL Format:**
```
geo:{lat},{lng}?q={lat},{lng}(Site+Name)
```

**Pros:** Opens Android's default maps app chooser (user picks Google Maps, Waze, etc.).
**Cons:** Only works on Android. No iOS/web support.

---

## Recommended Implementation

### Approach: Platform-Aware Smart Link with User Choice

Since Athar is a **PWA** (not a native app), the best approach is a simple "Get Directions" dropdown/menu offering 2-3 options:

```tsx
// components/GetDirectionsButton.tsx
interface DirectionsProps {
  lat: number;
  lng: number;
  name: string;
}

function getDirectionsLinks({ lat, lng, name }: DirectionsProps) {
  const encodedName = encodeURIComponent(name);
  return [
    {
      label: 'Google Maps',
      url: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`,
      icon: '🗺️',
    },
    {
      label: 'Waze',
      url: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes&zoom=17`,
      icon: '🚗',
    },
    {
      label: 'Apple Maps',
      url: `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=w`,
      icon: '🍎',
    },
  ];
}
```

**Why not a universal link library?** The npm packages `react-native-map-link` and `react-native-open-maps` are designed for React Native (native apps), not web/PWA. For a Next.js PWA, simple `<a href>` links with `target="_blank"` are the correct and simpler approach. No library needed.

### Walking Mode Default

Heritage sites in Makkah and Madinah are typically explored on foot, especially near the Haram areas. Default to `walking` mode for Google Maps (`travelmode=walking`) and Apple Maps (`dirflg=w`). Waze is driving-only by design, which is fine for users coming from further away.

---

## Cost Analysis

| Item | Year 1 Cost |
|------|------------|
| Google Maps URL | **$0** (no API key) |
| Apple Maps URL | **$0** |
| Waze Deep Link | **$0** |
| Implementation effort | ~2–4 hours |
| **Total** | **$0** |

All three options use deep link URLs that require no API keys, no billing accounts, and no rate limits. This is purely client-side link generation.

---

## Key Considerations for Saudi Arabia

1. **Waze is widely used** in Saudi Arabia, especially for driving in congested areas around the Haramain. Include it as a prominent option.
2. **Google Maps dominance** — Google Maps is the most-used navigation app in KSA. Make it the default/first option.
3. **Apple Maps improving** — Apple Maps coverage in Saudi Arabia has improved significantly but still lags Google Maps for POI density. Include but don't prioritize.
4. **Offline handling** — Deep links fail gracefully (open in browser or show "app not found"). No error handling needed in Athar's code.

---

## Verdict

Navigation integration is trivial. Three URL templates, one small React component, zero cost, zero maintenance. Implement in a single sprint task (2-4 hours). No technical risk.
