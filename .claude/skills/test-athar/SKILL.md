---
name: test-athar
description: Test the Athar heritage platform on mobile and desktop viewports using Playwright. Checks all pages, navigation, filters, chat, and certificate flows.
---

# Athar Project Testing Skill

Test the Athar heritage platform by launching the dev server and running automated Playwright checks against it in mobile viewport.

## How to Run

1. **Ensure Playwright is installed**: `pip install playwright && python -m playwright install chromium`

2. **Run the test script using the webapp-testing helper**:
```bash
python ~/.claude/skills/webapp-testing/scripts/with_server.py \
  --server "npm run dev" --port 3000 \
  -- python .claude/skills/test-athar/scripts/test-mobile.py
```

3. **For quick smoke test** (homepage + map only):
```bash
python ~/.claude/skills/webapp-testing/scripts/with_server.py \
  --server "npm run dev" --port 3000 \
  -- python .claude/skills/test-athar/scripts/test-mobile.py --quick
```

4. **For English locale**:
```bash
python ~/.claude/skills/webapp-testing/scripts/with_server.py \
  --server "npm run dev" --port 3000 \
  -- python .claude/skills/test-athar/scripts/test-mobile.py --locale en
```

5. **Review screenshots** saved to `/tmp/athar-tests/` — read them to visually verify the UI.

6. **Report results** to the user: list pass/fail for each check, and show any screenshots where issues were found.

## Test Coverage

The test script checks the following in **mobile viewport (390x844, iPhone 14)**:

### Homepage (`/`)
- Page loads successfully
- Feature highlights section visible (Explore, Collect, Learn)
- Footer has About, Privacy, Terms links
- Header logo "أثر" visible and large enough

### Map Page (`/map`)
- Page loads within 15s
- Filter button visible and clickable
- Filter sidebar opens when tapped
- Sites list renders with site cards
- "Near Me" button present

### Chat Page (`/chat`)
- Page loads
- Input bar visible at bottom of viewport
- Can type in the input field
- Welcome message or suggested questions visible

### Passport Page (`/passport`)
- Page loads
- Stamp grid visible
- At least one "View Certificate" button present

### About Page (`/about`)
- Page loads
- Mission and Vision sections present

### Navigation
- Mobile hamburger menu opens
- Menu closes after clicking a link
- Logo navigates to homepage

### Both Locales
- Tests run for Arabic (RTL) and English (LTR)

## Modifiers

### help
Usage: `/test-athar help`

**test-athar** — Automated mobile testing for the Athar heritage platform using Playwright.

Available modifiers:
- `help` — Show this help message
- `quick` — Run only homepage + map smoke test
- (default) — Run full test suite across all pages and both locales
