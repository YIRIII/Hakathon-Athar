"""
Athar Heritage Platform — Mobile UI Test Suite
Runs Playwright checks against the dev server in mobile viewport.

Usage:
  python test-mobile.py [--quick] [--locale ar|en] [--port 3000]
"""

import argparse
import os
import sys
from playwright.sync_api import sync_playwright, TimeoutError as PwTimeout

MOBILE_VIEWPORT = {"width": 390, "height": 844}
SCREENSHOT_DIR = "/tmp/athar-tests"

passed = 0
failed = 0
errors = []


def check(name, condition, page=None, screenshot_name=None):
    """Record a test result and optionally take a screenshot on failure."""
    global passed, failed
    if condition:
        passed += 1
        print(f"  PASS  {name}")
    else:
        failed += 1
        errors.append(name)
        print(f"  FAIL  {name}")
        if page and screenshot_name:
            path = os.path.join(SCREENSHOT_DIR, f"FAIL-{screenshot_name}.png")
            page.screenshot(path=path, full_page=True)
            print(f"        screenshot: {path}")


def screenshot(page, name):
    """Take a screenshot for visual review."""
    path = os.path.join(SCREENSHOT_DIR, f"{name}.png")
    page.screenshot(path=path, full_page=False)
    print(f"        screenshot: {path}")


def dismiss_consent(page):
    """Dismiss the privacy consent banner if present."""
    try:
        accept_btn = page.get_by_text("موافق").or_(page.get_by_text("Accept")).first
        if accept_btn.is_visible(timeout=2000):
            accept_btn.click()
            page.wait_for_timeout(500)
    except Exception:
        pass  # No banner or already dismissed


def test_homepage(page, locale, base_url):
    print(f"\n--- Homepage (/{locale}) ---")
    page.goto(f"{base_url}/{locale}", wait_until="networkidle", timeout=20000)
    dismiss_consent(page)
    screenshot(page, f"{locale}-homepage")

    # Page loaded
    check("Page loads", page.title() != "", page, f"{locale}-homepage-title")

    # Feature highlights (replaced stats section)
    highlights = page.locator("section").filter(has=page.locator("svg")).all()
    check("Feature highlights section exists", len(highlights) > 0, page, f"{locale}-highlights")

    # Footer links
    footer = page.locator("footer")
    footer_links = footer.locator("a").all()
    check("Footer has navigation links", len(footer_links) >= 3, page, f"{locale}-footer")

    # Logo visible
    logo = page.locator("header >> text=أثر").first
    check("Logo visible in header", logo.is_visible(), page, f"{locale}-logo")


def test_map(page, locale, base_url):
    print(f"\n--- Map Page (/{locale}/map) ---")
    page.goto(f"{base_url}/{locale}/map", wait_until="domcontentloaded", timeout=20000)
    # Give map time to render
    page.wait_for_timeout(3000)
    dismiss_consent(page)
    page.wait_for_timeout(500)
    screenshot(page, f"{locale}-map")

    # Filter button visible (mobile only) — find by the filter text label
    filter_text = "تصفية" if locale == "ar" else "Filters"
    filter_btn = page.get_by_text(filter_text).first
    check("Filter button visible", filter_btn.is_visible(), page, f"{locale}-map-filter")

    # Try clicking filter button
    try:
        filter_btn.click(timeout=3000)
        page.wait_for_timeout(1500)
        screenshot(page, f"{locale}-map-filter-open")

        # Check if sidebar content appeared — look for the search input inside the sheet
        # The sheet portal renders at body level, so check for any visible sheet-content
        sidebar_visible = False
        # Try multiple selectors for the sheet content
        for selector in ["[data-slot='sheet-content']", "[role='dialog']", ".fixed.z-50"]:
            el = page.locator(selector).first
            if el.is_visible(timeout=1000):
                sidebar_visible = True
                break

        # Also check if search input appeared (part of sidebar content)
        if not sidebar_visible:
            search_input = page.locator("input[placeholder]").first
            if search_input.is_visible(timeout=1000):
                sidebar_visible = True

        check("Filter sidebar opens", sidebar_visible, page, f"{locale}-map-sidebar")

        # Close by pressing Escape
        page.keyboard.press("Escape")
        page.wait_for_timeout(500)
    except PwTimeout:
        check("Filter sidebar opens", False, page, f"{locale}-map-sidebar-timeout")

    # Header logo still clickable
    logo = page.locator("header >> text=أثر").first
    check("Header logo clickable on map page", logo.is_visible(), page, f"{locale}-map-logo")


def test_chat(page, locale, base_url):
    print(f"\n--- Chat Page (/{locale}/chat) ---")
    page.goto(f"{base_url}/{locale}/chat", wait_until="networkidle", timeout=20000)
    page.wait_for_timeout(1000)
    screenshot(page, f"{locale}-chat")

    # Input bar visible
    input_bar = page.locator("input[type='text'], input:not([type])").first
    check("Chat input bar visible", input_bar.is_visible(), page, f"{locale}-chat-input")

    # Check input is near bottom of viewport (within bottom 200px)
    if input_bar.is_visible():
        box = input_bar.bounding_box()
        if box:
            in_lower_half = box["y"] > MOBILE_VIEWPORT["height"] * 0.5
            check("Input bar positioned in lower half", in_lower_half, page, f"{locale}-chat-input-pos")
        else:
            check("Input bar positioned in lower half", False, page, f"{locale}-chat-input-pos")

    # Can type
    try:
        input_bar.fill("test message")
        check("Can type in chat input", input_bar.input_value() == "test message", page, f"{locale}-chat-type")
        input_bar.fill("")  # Clear
    except Exception:
        check("Can type in chat input", False, page, f"{locale}-chat-type")


def test_passport(page, locale, base_url):
    print(f"\n--- Passport Page (/{locale}/passport) ---")
    page.goto(f"{base_url}/{locale}/passport", wait_until="networkidle", timeout=20000)
    page.wait_for_timeout(2000)
    screenshot(page, f"{locale}-passport")

    # Stamp grid
    cards = page.locator("[data-slot='card'], .border-primary\\/40").all()
    check("Stamp cards visible", len(cards) > 0, page, f"{locale}-passport-cards")

    # Certificate button
    cert_btn = page.get_by_text("View Certificate").or_(page.get_by_text("عرض الشهادة")).first
    check("Certificate button present", cert_btn.is_visible(), page, f"{locale}-passport-cert")


def test_about(page, locale, base_url):
    print(f"\n--- About Page (/{locale}/about) ---")
    page.goto(f"{base_url}/{locale}/about", wait_until="networkidle", timeout=20000)
    screenshot(page, f"{locale}-about")

    check("About page loads", page.url.endswith("/about"), page, f"{locale}-about-load")

    # Content sections
    headings = page.locator("h2").all()
    check("Has section headings", len(headings) >= 2, page, f"{locale}-about-headings")


def test_navigation(page, locale, base_url):
    print(f"\n--- Navigation (/{locale}) ---")
    page.goto(f"{base_url}/{locale}", wait_until="networkidle", timeout=20000)

    # Open mobile menu
    hamburger = page.locator("header button").filter(has=page.locator("svg")).last
    try:
        hamburger.click(timeout=3000)
        page.wait_for_timeout(800)
        screenshot(page, f"{locale}-nav-open")

        sheet = page.locator("[data-slot='sheet-content']").first
        check("Mobile menu opens", sheet.is_visible(), page, f"{locale}-nav-open")

        # Click a nav link — menu should close
        nav_links = sheet.locator("a").all()
        if len(nav_links) > 1:
            nav_links[1].click()
            page.wait_for_timeout(1000)
            is_closed = not sheet.is_visible()
            check("Menu closes after link tap", is_closed, page, f"{locale}-nav-close")
        else:
            check("Menu closes after link tap", False, page, f"{locale}-nav-close")

    except PwTimeout:
        check("Mobile menu opens", False, page, f"{locale}-nav-timeout")
        check("Menu closes after link tap", False, page, f"{locale}-nav-close-timeout")


def main():
    parser = argparse.ArgumentParser(description="Athar Mobile UI Tests")
    parser.add_argument("--quick", action="store_true", help="Run only homepage + map")
    parser.add_argument("--locale", default="ar", choices=["ar", "en", "both"], help="Locale to test")
    parser.add_argument("--port", default=3000, type=int, help="Dev server port")
    args = parser.parse_args()

    base_url = f"http://localhost:{args.port}"
    locales = ["ar", "en"] if args.locale == "both" else [args.locale]

    os.makedirs(SCREENSHOT_DIR, exist_ok=True)

    print(f"Athar Mobile UI Tests")
    print(f"Viewport: {MOBILE_VIEWPORT['width']}x{MOBILE_VIEWPORT['height']}")
    print(f"Base URL: {base_url}")
    print(f"Locales: {', '.join(locales)}")
    print(f"Mode: {'quick' if args.quick else 'full'}")
    print(f"Screenshots: {SCREENSHOT_DIR}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport=MOBILE_VIEWPORT,
            is_mobile=True,
            has_touch=True,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        )
        page = context.new_page()

        for locale in locales:
            test_homepage(page, locale, base_url)
            test_map(page, locale, base_url)

            if not args.quick:
                test_chat(page, locale, base_url)
                test_passport(page, locale, base_url)
                test_about(page, locale, base_url)
                test_navigation(page, locale, base_url)

        browser.close()

    # Summary
    total = passed + failed
    print(f"\n{'='*50}")
    print(f"Results: {passed}/{total} passed, {failed} failed")
    if errors:
        print(f"\nFailed checks:")
        for e in errors:
            print(f"  - {e}")
    print(f"\nScreenshots saved to: {SCREENSHOT_DIR}")

    sys.exit(1 if failed > 0 else 0)


if __name__ == "__main__":
    main()
