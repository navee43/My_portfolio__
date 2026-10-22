# Naveen Yadav, portfolio

A personal portfolio for Naveen Yadav, software engineer (full-stack and AI). Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4, ready for Vercel or Render.

The look is playful and loud on purpose: chunky outlines, hard offset shadows, tilted paper stickers, marigold marker swipes and condensed all-caps headlines (Archivo's width axis), in a lavender-tinted light theme and a deep indigo dark theme.

The hero shows a live replay of Naveen's Autonomous Coding Agent: the real LangGraph node names from the repository, running the worked example from its README (a `KeyError`, a diagnosis, a repair, then verification). It is labelled as an illustration and is not connected to the live app.

Every fact on the site comes from Naveen's resume (updated October 2026) or his public GitHub repositories. See [What was verified](#what-was-verified) for details and the few items that need his confirmation.

---

## Run it locally

You need **Node.js 20.9 or newer** (22 recommended, see `.nvmrc`).

1. Open a terminal in this folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser.

No environment variables are needed to run it.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serves the production build (run `build` first) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run check` | Lint, type check and build in one go |

---

## Change the content

All content lives in typed files in `data/`. Edit those and the whole site updates; no component changes needed.

| What | File |
| --- | --- |
| Name, email, phone, location, intro, About highlights, availability | `data/profile.ts` |
| GitHub, LinkedIn, LeetCode and resume links | `data/social-links.ts` |
| Internships | `data/experience.ts` |
| Projects (cards and case-study pages) | `data/projects.ts` |
| Skills and where each one is used | `data/skills.ts` |
| Education | `data/education.ts` |
| Header navigation | `data/navigation.ts` |

Every external link is passed through `ext()` in `lib/links.ts`, which stops the build if a URL is malformed or not HTTPS.

### Add or edit a project

1. Open `data/projects.ts`.
2. Copy an existing entry and change the fields. Leave `links.repo` or `links.live` out if there isn't one; the buttons hide automatically.
3. Set `featured: true` to show it as a large card at the top.
4. Pick a `preview` style (`agent`, `kaamsetu`, `educompare`, `food`, `price`, `chat`), or add a new preview component in `components/projects/previews/` and register it in `previews/index.tsx`.

The case-study page at `/projects/<slug>` is generated automatically.

### Add your photo

The hero has a taped photo frame that shows a "Your photo here" placeholder until you add a picture.

1. Save your photo as `public/images/profile.jpg`. A portrait shot works best (roughly 4:5, at least 800 px wide).
2. Open `data/profile.ts` and change `photo.src` from `null` to `"/images/profile.jpg"`.
3. Optionally update `photo.alt` with a short description of the picture.

### Replace the resume

1. Put the new PDF at `public/resume/naveen-yadav-resume.pdf` (same name).
2. Update the preview image: export page 1 of the PDF as an image about 935 × 1210 px and save it as `public/images/resume-preview.webp`. If you use a different size or format, update `resume.previewImage` and `resume.previewImageSize` in `data/profile.ts`.
3. If the Google Drive file changes, update `resumeDrive` and `resumeDrivePreview` in `data/social-links.ts`. The Drive file must be shared as "Anyone with the link" for the in-page preview to work.
4. Update `resume.updated` in `data/profile.ts`.

### Show competitive programming stats

The resume lists LeetCode (Knight, 1900+, 500+ problems) and Codeforces (Specialist, 1600+). They're hidden until confirmed, because the brief asked for coding stats only from a reliable source. To show them, set `competitiveProgramming.show` to `true` in `data/profile.ts`.

---

## Environment variables

Both are optional. See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The public URL (for example `https://naveenyadav.dev`). Used for share previews, the sitemap and canonical links. Vercel's production URL is used automatically if it's empty. |
| `GITHUB_TOKEN` | Only if the GitHub section hits the anonymous API rate limit. A read-only token for public repositories is enough. |

For local use, copy `.env.example` to `.env.local`. Never commit real secrets; `.env*` files are git-ignored.

---

## Deploy to Vercel (recommended)

1. Create an empty repository on GitHub (no README), then push this folder to it:
   ```bash
   git init
   git add -A
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to https://vercel.com and sign in with GitHub.
3. Click **Add New…** then **Project**.
4. Find the repository in the list and click **Import**.
5. Leave the settings as detected (Framework: Next.js, Build: `next build`). Click **Deploy**.
6. When it finishes, open the URL Vercel shows you.
7. Optional, with a custom domain: go to **Settings → Domains** to add it, then **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with that domain, and redeploy from the **Deployments** tab.

Every push to `main` deploys again automatically.

## Deploy to Render

**With the included blueprint (fastest):**

1. Push the code to GitHub (step 1 above).
2. Go to https://dashboard.render.com and click **New → Blueprint**.
3. Connect the repository. Render reads `render.yaml` and creates a web service.
4. When asked for `NEXT_PUBLIC_SITE_URL`, you can leave it empty for the first deploy.
5. Click **Apply**. After the deploy finishes, copy the `onrender.com` URL, set it as `NEXT_PUBLIC_SITE_URL` under **Environment**, and click **Manual Deploy → Deploy latest commit**.

**Manually instead:** **New → Web Service**, pick the repository, then set
- Runtime: **Node**
- Build command: `npm ci --include=dev && npm run build`
- Start command: `npm start`
- Environment variable `NODE_VERSION` = `22`

Render's free tier sleeps after inactivity, so the first visit after a pause can take up to a minute. Vercel doesn't have this delay.

---

## Project structure

```
app/                     Routes, metadata, sitemap, robots, icons, share images, 404
  projects/[slug]/       Case-study pages (one per project, prerendered)
components/
  navigation/ hero/ about/ experience/ projects/ skills/
  education/ profiles/ resume/ contact/ footer/ ui/ brand/
data/                    All content (typed)
lib/                     Helpers: links, site URL, GitHub data, share-image renderer, hooks
public/resume/           The real resume PDF
public/images/           Resume preview image
assets/fonts/            Static Archivo fonts for generated share images (SIL Open Font License)
components/motion/       Reveal on scroll, count-up, marquee, draggable stickers, tilt, cursor ring
```

### How it's built

- **Rendering:** every page is prerendered at build time (Cache Components is on). The GitHub section fetches public repository data on the server, caches it for a few hours and falls back to the project list if GitHub can't be reached.
- **Theme:** dark and light, following the visitor's system setting on the first visit and remembering their choice. `next-themes` sets the theme before the first paint, so there's no flash.
- **Motion:** CSS and a few tiny client components, with no animation library (Motion/Framer Motion was dropped to save about 50 KB of JavaScript). What moves:
  - Hero: a marker swipe and a hand-drawn loop draw under the headline, stickers pop in, the hand waves, and the agent replay plays once it scrolls into view.
  - Two crossing ticker tapes under the hero and a giant outlined ticker above the contact section; they pause on hover.
  - Sections, cards and tiles fade, slide or pop in as they scroll into view, staggered (`components/motion/reveal.tsx`).
  - Internship figures count up from zero.
  - Cards lift with a growing hard shadow on hover and press flat on click; featured project previews tilt in 3D toward the mouse.
  - A reading-progress bar along the top edge, a cursor ring that swells over links, a gliding marigold pill in the header, and a bouncy mobile menu.
  - Hero stickers can be dragged with a mouse, and copying the email throws confetti.
  - Everything respects `prefers-reduced-motion`: animations stop, content shows immediately, and the replay shows its finished state. Content is never hidden if JavaScript fails (there's a five-second failsafe).
- **Fonts:** Archivo (variable, with a width axis: condensed and heavy for headings, normal width for reading) and Geist Mono for code, both self-hosted. Only Archivo is preloaded.
- **Design tokens:** colours are CSS variables in `app/globals.css`. Indigo is for actions and focus, marigold for stickers and highlights, lilac, mint and pink for sticker variety, and green and red only for passed and failed states in the agent replay.
- **Accessibility:** semantic landmarks and headings, skip link, visible focus, keyboard-operable controls, labelled icon buttons, text contrast of at least 4.5:1 in both themes.
- **SEO:** page titles and descriptions, Open Graph and Twitter cards with generated share images for the home page and each case study, JSON-LD for the person, `sitemap.xml`, `robots.txt`, and a custom 404 that returns a real 404 status.

---

## What was verified

**Sources:** the resume PDF in Google Drive (updated 21 October 2026), the six public repositories under `github.com/navee43` (cloned and read in October 2026), and the live deployments.

- Internship dates and figures match the resume. Wording keeps team outcomes as team outcomes.
- Each project's features and stack come from its source code. Only technologies found in the code or listed on the resume are shown, and each skill links to where it's used.
- The repository links for the Autonomous Coding Agent and KaamSetu come from the hyperlinks in the resume PDF.
- All project previews are illustrations, labelled as such, built from real details where they exist: the agent's README example, the menu items and prices on the live Gomino site, and real entries from EduCompare's course dataset. The price comparison preview shows no prices because they're fetched live.

### Needs Naveen's confirmation

1. **B.Tech dates.** The brief said "2026–Present", but the resume says **2023–2027**, which fits Class XII in 2022. The site uses 2023–2027 (`data/education.ts`).
2. **Agent benchmark.** The resume mentions 95% on 50 benchmark tasks, but the repository's README says the benchmark hasn't been run against a live model yet. Left out until results are published.
3. **KaamSetu load testing.** "100+ concurrent users" isn't backed by test results in the repository. Left out.
4. **Resume claims not in the public code:** Cloudinary storage and image preprocessing in KaamSetu's OCR pipeline, and Groq support in the agent (commented out in the code). Left out of the case studies.
5. **Competitive programming stats.** Hidden by default (see above).
6. **KaamSetu demo link** points to the app's home page, because the `/signup` link didn't load during testing.
7. **Price Comparison Website** has no deployment, so it shows "No hosted demo".

---

## Testing done

- `npm run lint`, `npm run typecheck` and `npm run build`: all pass.
- 51 automated browser checks with Playwright against the production build: no console errors on any page in either theme; theme follows the system on first visit, toggles and persists; skip link is the first Tab stop; header links and the mobile menu scroll to each section; the replay's nodes and Replay button work; skills show their evidence; the resume preview loads; `mailto:` and `tel:` links are correct; copy email copies and confirms; reduced motion shows the finished run; the header's active-section indicator sits under the right link; every external link is one of the 15 verified URLs and opens safely in a new tab; all internal links resolve; unknown pages return 404.
- Screenshots reviewed at 390, 820, 1280, 1440 and 1920 px wide, in dark and light, with no horizontal overflow.
- Lighthouse (production build, local): desktop 100 performance, 100 accessibility, 100 best practices, 100 SEO. Mobile (simulated slow 4G and a slowed CPU): 100 for accessibility, best practices and SEO; performance varied between runs on the shared test machine, between the high 70s and high 80s.
