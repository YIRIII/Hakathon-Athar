# Troubleshooting Guide — Athar

Quick-reference for bugs we've hit and how we fixed them. Search by error message or symptom.

---

## 1. DYNAMIC_SERVER_USAGE — 500 Error on Site Detail Pages

**When:** After deploying to Vercel
**Symptom:** Clicking any site card (e.g. `/ar/sites/cave-hira`) returns a **500 error**
**Vercel logs show:**
```
Error: DYNAMIC_SERVER_USAGE
digest: 'DYNAMIC_SERVER_USAGE'
```

**Root cause:**
In Next.js 16+, `await params` is a **dynamic API**. If the page also exports `generateStaticParams()`, Next.js marks it for static generation (SSG `●`). These two are incompatible — you can't use a dynamic API inside a statically generated page. The build succeeds but it **crashes at runtime** on Vercel.

**Fix:**
In the page file (e.g. `src/app/[locale]/sites/[id]/page.tsx`):
1. **Remove** `generateStaticParams()` entirely
2. **Add** `export const dynamic = 'force-dynamic';` at the top

This makes the page fully server-rendered on demand (`ƒ`), which works perfectly with `await params`.

```tsx
// BEFORE (broken):
export function generateStaticParams() {
  return sites.map((site) => ({ id: site.id }));
}

// AFTER (fixed):
export const dynamic = 'force-dynamic';
```

**Applies to:** Any `[slug]` page using `await params` with `generateStaticParams` in Next.js 16+.

---

## 2. Broken / Missing Images — Unsplash URLs Returning Empty

**When:** After initial deployment or when Unsplash rate-limits / blocks hotlinking
**Symptom:** Images in the heritage timeline ("رحلة عبر التاريخ"), hero section, or site cards show as empty/broken

**Root cause:**
Unsplash URLs like `https://images.unsplash.com/photo-XXXXX?w=600&q=80` can break for multiple reasons:
- Unsplash blocks hotlinking from production domains
- Rate limiting on free tier
- Image IDs become invalid or get removed
- Next.js `<Image>` component requires the domain in `next.config.ts` `remotePatterns` — if misconfigured, images silently fail

**Fix:**
Always use **local images** (`/images/sites/*.jpg`) instead of external URLs for critical UI images (hero, timeline, cards). External URLs (Wikimedia etc.) are OK for secondary gallery images since they're more stable.

1. Place images in `public/images/sites/`
2. Reference as `/images/sites/filename.jpg` (no `public/` prefix)
3. For site data (`src/data/sites.ts`), always put the local image **first** in the `images[]` array

```ts
// BEFORE (broken):
image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80',

// AFTER (fixed):
image: '/images/sites/cave-hira.jpg',
```

**Rule of thumb:** If an image is visible on first load (hero, cards, timeline) → use local. If it's in a detail gallery → external is acceptable with Wikimedia as fallback.

---

## 3. Git Push Fails — HTTP 400 / Unexpected Disconnect

**When:** Pushing a large commit (e.g. with binary font files, images)
**Symptom:**
```
error: RPC failed; HTTP 400 curl 22
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
```

**Root cause:**
Default git HTTP post buffer (1MB) is too small for large commits with binary files.

**Fix:**
```bash
git config http.postBuffer 524288000   # 500MB buffer
git push origin master
```

---

## 4. `next/image` Not Loading External Images

**When:** Using `<Image src="https://..." />` with Next.js
**Symptom:** Image doesn't render, console shows domain not configured

**Root cause:**
Next.js requires external image domains to be allowlisted in `next.config.ts`.

**Fix:**
Add the domain to `remotePatterns` in `next.config.ts`:
```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'upload.wikimedia.org' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    // add more as needed
  ],
},
```

---

## Quick Checklist Before Deploying

- [ ] `npm run build` passes locally with no errors
- [ ] Site detail pages show `ƒ` (dynamic) not `●` (static) in build output
- [ ] All hero/timeline/card images use local paths (`/images/sites/`)
- [ ] External image domains are in `next.config.ts` `remotePatterns`
- [ ] `git config http.postBuffer 524288000` if pushing large files
