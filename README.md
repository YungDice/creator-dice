# YUNG DICE — Personal Brand Site

Single-page personal brand site (portfolio · music · about) for Yung Dice —
**experienced from inside a 3D retro computer**, like the Ronas IT "Game Shop
Landing Page" reference (`original-2c5d72c0528e890a8e36bbdea6f93d9c.mp4` in
this folder, git-ignored): on load the pastel-blue PC boots up (BIOS text,
loading bar, blinking power LED), then the real, fully interactive site runs
on its screen — click the nav, scroll, filter the catalog, all inside the
monitor. The camera drifts with the cursor; a button drops you out to the
normal fullscreen site at any time.

Who gets what:

- **Desktop with WebGL** → the 3D PC experience (with a "View fullscreen
  site" escape hatch, and a "Back inside the PC" button to return)
- **Phones/small screens, `prefers-reduced-motion`, or no WebGL** → the flat
  site directly (same content, black-and-white palette, dice-red accent,
  scroll reveals)

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom palette/fonts in `tailwind.config.ts`)
- **Framer Motion** (all scroll/hover/hero animation; `prefers-reduced-motion`
  falls back to opacity-only fades everywhere)
- **three / @react-three/fiber / @react-three/drei** — the 3D computer is
  modeled from primitives in `components/three/Computer.tsx` (no external
  model files); the site is rendered on the screen via drei's `<Html transform>`
- Static export (`output: "export"`) — deploys to Vercel out of the box, or
  any static host from the `out/` folder

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export → out/
```

## Where things live

| Path | What it is |
| --- | --- |
| `app/` | Layout (fonts, metadata), page composition, global CSS |
| `components/Experience.tsx` | Orchestrator: 3D vs flat decision, boot state machine, mode toggle, in-screen anchor scrolling |
| `components/three/` | The 3D scene: `PCScene.tsx` (canvas, camera rig, lights), `Computer.tsx` (the modeled PC + live screen) |
| `components/BootScreen.tsx` | The retro BIOS boot sequence shown on the screen |
| `components/` | One component per section + `Reveal.tsx` (scroll-reveal primitives) + `RetroComputer.tsx` (hero SVG) + `icons.tsx` |
| `data/` | **All site content** as typed objects — edit copy/links here, not in JSX |
| `public/images/` | Placeholder SVG art (portrait, covers, portfolio stills) |
| `public/audio/` | Empty — drop MP3 previews here (see `data/discography.ts`) |

Tunables: boot timing in `components/Experience.tsx` (`OFF_MS`, `BOOT_MS`),
camera framing in `components/three/PCScene.tsx` (`TARGET_SCREEN_FRACTION`),
screen resolution in `components/three/Computer.tsx` (`SCREEN_PX`, 1024×768).

## Content you still need to supply

Everything below is currently a clearly-labeled stub. **No biographical facts
about Yung Dice were invented** — replace before launch.

| Placeholder from the brief | Where to fill it in | Status |
| --- | --- | --- |
| `{{ACCENT_COLOR}}` | `app/globals.css` → `--accent-rgb` (one line; gold `212 175 55` noted there). Also update `app/icon.svg` fills. | Defaulted to dice-red `#E8384F` |
| `{{HERO_TAGLINE}}` | `data/site.ts` → `heroTagline` | Using the brief's example line |
| `{{BIO_TEXT}}` | `data/site.ts` → `about.paragraphs` + `pullQuote` | Stub copy |
| `{{STATS}}` | `data/stats.ts` | **Sample numbers, not real figures** |
| `{{PROCESS_STEPS}}` | `data/process.ts` | Generic Write→Record→Produce→Release with stub descriptions |
| `{{DISCOGRAPHY}}` | `data/discography.ts` (titles, years, links) + `public/images/covers/` (real cover art, square, ≥800px) + optional `public/audio/*.mp3` previews | All stubs, links are `#` |
| `{{PORTFOLIO_ITEMS}}` | `data/portfolio.ts` + `public/images/portfolio/` (16:9, ≥1600px). Delete the "Selected Work" block in `components/Music.tsx` if music-only. | All stubs |
| `{{SOCIAL_LINKS}}` | `data/socials.ts` | All URLs are `#` |
| `{{PC_RENDER_ASSET}}` | See below | Not needed for v1 (SVG used instead) |
| Portrait photo | `public/images/portrait-placeholder.svg` → replace with a high-contrast B&W photo (4:5, ≥800×1000) and update `data/site.ts` → `about.portrait` | Stub SVG |
| "Listen Now" target | `data/site.ts` → `listenUrl` (currently scrolls to `#music`) | Stub |
| "As heard on" strip | `data/site.ts` → `heardOn` | Generic platform names |
| Booking/press email | `data/site.ts` → `bookingEmail` | Set to mgmt.yungdice@gmail.com |

### The retro computer (`{{PC_RENDER_ASSET}}`)

No external asset needed — the interactive 3D computer is modeled from code
primitives in `components/three/Computer.tsx` (option 2 from the brief,
implemented). To swap in a nicer commissioned glTF/GLB model later, load it
with drei's `useGLTF` inside that component and keep the existing `<Html
transform>` screen block positioned over the model's screen.

The flat site's hero still uses the lightweight SVG computer
(`components/RetroComputer.tsx`) — inside the 3D PC this reads as a fun
computer-in-a-computer recursion.

### Mailing list form

The Contact section's featured card has a working, accessible email form, but
this is a **static site with no backend** — submissions currently just show a
demo confirmation. Wire the `onSubmit` in `components/Contact.tsx`
(`MailingListCard`) to Mailchimp, Buttondown, ConvertKit, or a serverless
endpoint before launch.

### Social icons

`components/icons.tsx` contains hand-drawn generic glyphs, not official brand
marks. Swap in official SVGs (Simple Icons is a good source) if exact logos
matter.

## Design system cheat-sheet

- Colors: `ink` `#0A0A0A` · `bone` `#F5F5F0` · `accent` (CSS var) ·
  `pc-shell`/`pc-deep` (computer blues)
- Type: Space Grotesk 700 (display, headlines) + Inter (body), via `next/font`
- Cards: 1px `white/15` outline, hover → accent border + `shadow-glow` +
  1.02 scale
- Reveals: fade + 24px slide-up, ~500ms, staggered eyebrow → heading → copy →
  cards (`components/Reveal.tsx`); disabled to opacity-only under
  `prefers-reduced-motion`

## Deploying

- **Vercel**: import the repo, zero config.
- **Any static host**: `npm run build`, upload `out/`.
