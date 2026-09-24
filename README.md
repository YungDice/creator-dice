# yungdice.com

Music and projects of Yung Dice. Next.js 14 static export, Tailwind 3, no 3D, no animation library.

```bash
npm install
npm run dev      # http://localhost:3000   (Uptime page: /uptime)
npm run build    # static site in out/
```

## What lives where

| File | What to edit |
| --- | --- |
| `data/discography.ts` | Releases, newest first. The first entry is the "Latest release" block. |
| `data/projects.ts` | The project rows (Nexo, Uptime, Dice Masters) and where they link. |
| `data/site.ts` | Hero copy, about text, booking email. Stats are counted from the discography. |
| `data/socials.ts` | Footer social buttons. |
| `data/uptime.ts` | Uptime page copy and the **three install links** (`href`). Empty href = "soon" button. |
| `app/globals.css` | Colour tokens for both themes, duotone image treatment, buttons, motion. |

## Domains (Vercel)

- `yungdice.com` serves `/`.
- `uptime.yungdice.com`: add the domain to the same Vercel project. `vercel.json` rewrites
  that host's `/` to `/uptime`, so no second project is needed.
- `nexo.delidev.net` and `dice-masters.yungdice.com` are separate apps; this site only links to them.

## House rules

See `DESIGN.md`. Short version: one colour per page, paper sections inside a coloured frame,
compressed display type, every image in duotone until hovered, zero em dashes in visible copy.
