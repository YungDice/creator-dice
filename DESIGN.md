# Design system

Poster-style: one saturated colour, tall compressed type, images printed in the page colour.
Inspired by the structure of hermes-agent.nousresearch.com, with its own palette and fonts.

## Themes (`app/globals.css`)

| Token | Yung Dice (`.theme-dice`) | Uptime (`.theme-uptime`) |
| --- | --- | --- |
| `brand` | `#D0000B` signal red | `#FF9F0A` clock orange |
| `brand-deep` | `#8F0008` | `#D68000` |
| `on-brand` (text on brand) | `#F2F2F2` (5.1:1) | `#1A0F00` (9.2:1) |
| `paper` | `#F2F2F2` | `#F2F2F2` |
| `ink` (text on paper) | `#4A0006` (14.5:1) | `#1A0F00` (16.9:1) |
| `brand-text` (brand text on paper) | `#D0000B` (5.1:1) | `#9A5200` (5.3:1) |

Uptime orange is 1.8:1 on paper: use it as a fill, never as text on paper.

## Type

- Display: Big Shoulders Display, weight 200, uppercase, leading 0.86, tracking -0.02em (`.display`).
- Headings: same family, weight 300, sentence case (`.heading`).
- Body: Geist. Labels and meta: Geist Mono 11px uppercase (`.label`).

## Rules

- Page structure: colour, then one paper block inside a 8-12px coloured frame, then colour again.
- Images: `.duo` (multiply on brand) on paper, `.duo-screen` (inverted line-work) on brand.
  `.duo-live` restores original colour on hover or focus.
- Buttons: 44px minimum, compressed caps, pressed state `translateY(1px) scale(.98)`.
- Sharp corners everywhere. The only rounded things are real app screenshots.
- Max one small uppercase label per three sections. No numbered section labels.
- No em dashes or en dashes in visible copy.
- Motion: headline lines rise on load, sections fade up once on scroll. All of it is off under
  `prefers-reduced-motion`.
