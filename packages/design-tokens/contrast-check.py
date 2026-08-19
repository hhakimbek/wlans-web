#!/usr/bin/env python3
"""
wlans - design token contrast gate.

Parses color.css, converts every OKLCH token to sRGB, and asserts:
  * body text     >= 4.5:1 against the page ground
  * accents and control boundaries >= 3:1
  * text remains >= 4.5:1 on the card surface
  * every value is inside the sRGB gamut (an out-of-gamut colour clips
    silently to something duller than authored)

Reads the CSS rather than a copied table, so the gate cannot drift away from
the values actually shipped.

Run:  python packages/design-tokens/contrast-check.py
CI:   non-zero exit fails the build (Phase 1.5 gate).
"""

from __future__ import annotations

import math
import re
import sys
from pathlib import Path

CSS = Path(__file__).with_name("color.css")

# token -> (compared against, minimum ratio)
BASE_REQUIREMENTS = {
    "text-1": ("bg-0", 4.5),
    "text-2": ("bg-0", 4.5),
    "text-3": ("bg-0", 4.5),
    "success": ("bg-0", 4.5),
    "danger": ("bg-0", 4.5),
    "line-control": ("bg-0", 3.0),
}

# Which ramp step actually carries text differs per theme: light links with
# blue-600, dark links with blue-400. Checking one step against both grounds
# would flag a colour the theme never renders.
LINK_STEP = {"light": "blue-600", "dark": "blue-400"}
CTA_STEP = {"light": "blue-600", "dark": "blue-600"}

# `--line` is deliberately exempt: a decorative divider is not a UI component
# boundary. Controls must use --line-control, which is gated above.
# Ramp steps other than the two that carry text, plus decorative dividers.
EXEMPT = {
    "line", "blue-50", "blue-100", "blue-200", "blue-300",
    "blue-800", "blue-900", "warn", "accent-warm",
    "text-on-brand",
}

# Text can legitimately sit on any of these, so all of them are checked —
# a token that only passes on the page ground is not actually safe.
TEXT_TOKENS = ("text-1", "text-2", "text-3")
SURFACES = ("bg-0", "bg-1", "bg-2", "bg-3")


def oklch_to_linear(L: float, C: float, H: float) -> tuple[float, float, float]:
    h = math.radians(H)
    a, b = C * math.cos(h), C * math.sin(h)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_**3, m_**3, s_**3
    return (
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    )


def clamp(v: float) -> float:
    return max(0.0, min(1.0, v))


def to_hex(t: tuple[float, float, float]) -> str:
    def gamma(c: float) -> float:
        c = clamp(c)
        return 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055

    return "#" + "".join(f"{round(gamma(v) * 255):02X}" for v in oklch_to_linear(*t))


def in_gamut(t: tuple[float, float, float], tol: float = 0.002) -> bool:
    return all(-tol <= v <= 1 + tol for v in oklch_to_linear(*t))


def luminance(t: tuple[float, float, float]) -> float:
    r, g, b = oklch_to_linear(*t)
    return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b)


def contrast(x, y) -> float:
    a, b = luminance(x), luminance(y)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


TOKEN_RE = re.compile(
    r"--([a-z0-9-]+)\s*:\s*oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)\s*;",
    re.IGNORECASE,
)


def parse_themes(css: str) -> dict[str, dict[str, tuple[float, float, float]]]:
    """Extract one token table per theme.

    `:root` is the light theme and the base for both. The dark block only
    overrides part of it, so dark is resolved as light-then-overridden —
    checking the dark block in isolation would miss every token it inherits.

    Alpha-bearing values are skipped: a translucent token's contrast depends
    on whatever is painted behind it.
    """
    # Comments are stripped first. Without this, prose in a header comment
    # becomes part of the next block's "selector" — and a comment that merely
    # mentions [data-theme='dark'] silently files every light token as dark.
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)

    light: dict[str, tuple[float, float, float]] = {}
    dark_overrides: dict[str, tuple[float, float, float]] = {}

    for match in re.finditer(r"([^{}]+)\{([^{}]*)\}", css):
        selector, body = match.group(1).strip(), match.group(2)
        tokens = TOKEN_RE.findall(body)
        if not tokens:
            continue
        if "data-theme='dark'" in selector:
            target = dark_overrides
        elif ":root" in selector and "prefers-contrast" not in selector:
            target = light
        else:
            continue
        for tok, L, C, H in tokens:
            target.setdefault(tok, (float(L), float(C), float(H)))

    return {"light": light, "dark": {**light, **dark_overrides}}


def main() -> int:
    if not CSS.exists():
        print(f"FAIL  cannot find {CSS}")
        return 2

    themes = parse_themes(CSS.read_text(encoding="utf-8"))
    if not {"dark", "light"} <= themes.keys():
        print(f"FAIL  expected dark and light themes, found {sorted(themes)}")
        return 2

    failures: list[str] = []

    for theme in ("light", "dark"):
        table = themes[theme]
        link = LINK_STEP[theme]
        REQUIREMENTS = {**BASE_REQUIREMENTS, link: ("bg-0", 4.5)}
        text_tokens = (*TEXT_TOKENS, link)
        print(f"\n===== {theme.upper()} =====  (link step: --{link})")

        for tok, value in sorted(table.items()):
            notes = []
            if not in_gamut(value):
                failures.append(f"{theme}/{tok}: outside the sRGB gamut")
                notes.append("OUT OF GAMUT")
            if tok in REQUIREMENTS:
                against, need = REQUIREMENTS[tok]
                if against not in table:
                    failures.append(f"{theme}/{tok}: missing reference --{against}")
                    continue
                ratio = contrast(value, table[against])
                ok = ratio >= need
                if not ok:
                    failures.append(
                        f"{theme}/{tok}: {ratio:.2f}:1 vs --{against}, needs {need}"
                    )
                notes.append(f"{ratio:5.2f}:1 vs {against} {'ok' if ok else 'FAIL'}")
            elif tok in EXEMPT:
                notes.append("decorative - exempt")
            print(
                f"  --{tok:14s} oklch({value[0]:.3f} {value[1]:.3f} {value[2]:.0f})"
                f"  {to_hex(value)}  {'  '.join(notes)}"
            )

        for surface in SURFACES:
            if surface not in table:
                continue
            parts = []
            for tok in text_tokens:
                if tok not in table:
                    continue
                ratio = contrast(table[tok], table[surface])
                if ratio < 4.5:
                    failures.append(
                        f"{theme}/{tok} on --{surface}: {ratio:.2f}:1, needs 4.5"
                    )
                parts.append(f"{tok} {ratio:.2f}")
            print(f"  · on --{surface}: " + ", ".join(parts))

        # The CTA prints white text on the brand fill; that pairing has to be
        # checked explicitly because neither token is a "text on surface" case.
        cta_step = CTA_STEP[theme]
        if cta_step in table and "text-on-brand" in table:
            cta = contrast(table["text-on-brand"], table[cta_step])
            if cta < 4.5:
                failures.append(f"{theme}/CTA text on --{cta_step}: {cta:.2f}:1, needs 4.5")
            print(f"  · CTA white on --{cta_step}: {cta:.2f}:1")

    print()
    if failures:
        for f in failures:
            print(f"FAIL  {f}")
        print(f"\n{len(failures)} contrast/gamut failure(s)")
        return 1

    print("All contrast and gamut checks pass.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
