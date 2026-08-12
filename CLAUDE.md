# CLAUDE.md — Andrew M. Jones robotics portfolio

Guidance for any AI agent editing this website. Read this before making changes.

## What this is
Andrew M. Jones's robotics/ME job-hunting portfolio. **Plain static HTML + one CSS file + vanilla JS.**
No framework, no build step, no `package.json`. Deploys as-is to GitHub Pages (user site →
`andrewthegr8.github.io`, repo `andrewthegr8/andrewthegr8`). Use relative / root-relative asset paths.

## Golden rules
- **The owner hand-tunes the copy. Preserve his wording and voice — don't "improve" prose unless asked.**
- **Honest role attribution, no invented metrics.** Never claim a teammate's work or a number that isn't in the source.
- **Keep the design language** (below). No rounded corners, no gradients, no drop-shadows.
- Every `<img>` needs `alt` (use `alt=""` for purely decorative thumbnails).

## Run & preview
- Serve from repo root: `python -m http.server 8099` → open `http://localhost:8099`.
- Available tooling on this machine: Python **with Pillow**, `pdftocairo` (Poppler), Inkscape, headless
  **Edge/Chrome**. There is **no** ImageMagick, ffmpeg, node, or cwebp.
- Screenshots for visual QA: use **old** headless mode (`--headless`, NOT `--headless=new`) for accurate
  narrow-viewport captures; give each launch a **unique** `--user-data-dir` (concurrent launches collide);
  add `--force-device-scale-factor=1`. Headless viewport is floored at ~492px, so a "mobile" shot needs a
  window width ≥ its layout width or the right edge clips (artifact, not a real bug).

## Files
- Pages (each standalone, edit HTML directly — no templating):
  `index.html` (home), `pose-estimation.html` (thesis — the flagship), `robotic-arm.html`,
  `autonomous-mobile-robot.html`, `harvester.html`, `about.html`, `resume.html`, `contact.html`, `404.html`.
- Shared: `assets/css/site.css` (all styling + design tokens), `assets/js/site.js` (theme toggle, footer year,
  lazy YouTube facade), `favicon.svg`.
- Docs: `assets/docs/andrew-jones-resume.pdf`, `assets/docs/andrew-jones-thesis.pdf`.
- `old/` holds retired/unused files (mirrors original structure) — not linked from the site.

## Design system ("engineering drawing / title block")
- **Theming:** warm-paper light + "blueprint" dark. OS-driven via `@media (prefers-color-scheme: dark)`, with
  `:root[data-theme="dark"|"light"]` overrides and a manual toggle. An inline `<head>` script sets `data-theme`
  from `localStorage` before paint (avoids FOUC). All colors are CSS variables in `:root` in `site.css`.
  One drafting-red accent, used sparingly. Monospace for all labels/nav/metadata/captions/specs; sans for headings/body.
- **Reusable components (in `site.css`):** `.sheet` (page frame), `.titleblock` / `.footer-tb` (header/footer
  title blocks), `.proj-hero`, `.spec-block` (vertical `<dl>` label/value rows), `.metrics`/`.metric`
  (dimension-line stat callouts: `.val` + `.unit` + `.lbl`), `.section` + `.section-head`
  (`.section-num` letter, `.section-title`, `.section-rule`, `.section-meta`), `.prose` (full-width copy;
  `<ul>` bullets get an em-dash marker), `.figure`(+`.figtag`,`figcaption`), `.figure.mid` (centered, max 760px),
  `.figrow`/`.gallery` (2-col), `.split` (text+figure), `.plot-canvas` (white bg so plots read in dark mode),
  `.chain` (tokenized dataflow diagram), `.note` (callout w/ `.note-k`), `.spec-table`/`.matrix`, `.timeline`,
  `.contact-list`, `.video` (lazy YouTube facade), `.proj-nav`, `.index-item` (home project list), `.btn`.

## Page conventions
- Every page: skip-link, exactly one `<h1>`, one `<main id="main">`, the title-block header + footer,
  favicon + theme-init script + `defer` `site.js`.
- **Project pages:** breadcrumb `Work / NN — Name`; sections lettered **A–E**
  (Problem → My role & decisions → What I changed and why → Results → What I'd build next);
  the **demo video goes near the top, directly under the hero metrics**; end with prev/next `.proj-nav`.
- **Top-level pages** (about/resume/contact): **no breadcrumb** — the eyebrow labels the page.

## Assets / media pipeline
- Source material lives in sibling OneDrive folders:
  - Arm (ME 507): `…\ME 507\507 Arm`
  - Thesis (ME 599): `…\ME 599 Thesis Project\Thesis Report` (+ parent for CAD / raw data)
  - AMR (ME 405): `…\ME 405\Term Report Files\Term-Project-ME-405`
  - Harvester (ME 423): `…\Job Search\Harvester Docs`
- Raster photos → `assets/img/<project-slug>/`, optimized with **Pillow**: `ImageOps.exif_transpose`,
  resize to ≤ ~1600px, save progressive JPEG q≈82 (or optimized PNG). Vector plots → convert with
  `pdftocairo -svg in.pdf out.svg` into `assets/diagrams/<slug>/`.
- Videos: never commit large files (>~50MB). Use the `.video` YouTube facade (`data-yt="<VIDEO_ID>"`); poster
  image = `https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg` saved locally as `assets/img/<slug>/yt-<ID>.jpg`.

## Content ground truth (reconciled against source docs — don't contradict)
- **Owner:** Andrew M. Jones. Graduated a concurrent **B.S./M.S. Mechanical Engineering, Cal Poly (2026), GPA 3.9.**
  Positioning: **robotics *systems* engineer** (embedded + control + estimation + integration) — not a "CV specialist."
  Contact: `andrewmj@outlook.com` · `linkedin.com/in/andrew-jones-aa05802b1` · `github.com/andrewthegr8`.
- **Thesis (pose-estimation):** solo M.S. thesis. **2.6 mm** avg accuracy, **~87 ms** end-to-end latency,
  **4 MCUs** (Pi → ESP32 → ESP32 → STM32). **Do NOT advertise a Hz / update-rate figure.** Fisheye + ArUco +
  iterative PnP + an original analytical world-coordinate transform; calibration used **42** images.
  Owner-approved iteration stories: regular lens → fisheye (markers too low-res when mounted high enough);
  homography → analytical PnP (homography wrongly assumed the robot's marker was coplanar with the floor markers);
  fisheye calibration was finicky (set-dependent image rejection) and is "sufficient but not perfect."
- **Robotic arm (ME 507):** team of 3. Owner did the **motion subsystem + its electronics** — selected the
  TMC429 motion-control chips + stepper drivers, contributed to the custom STM32H7 PCB, and wrote the firmware /
  trajectory engine. ~4.5 DOF; 203 N·cm peak joint torque; 32 microsteps. **Don't claim** the joystick /
  state-machine or color-sensing work (teammates). No performance metrics were measured — don't invent any.
- **AMR (ME 405):** **solo.** Observer-based state estimator (7 states, RK4) + custom heading/speed control law;
  **~30 s → ~11 s, fastest of 12 teams**; 25 ms control loop; MicroPython on STM32L476.
- **Harvester (ME 423):** team of 5. Owner was **Programming Lead** — wrote the entire embedded control stack on
  a Raspberry Pi (cubic-spline trajectories, PI/PID, **8 kHz hardware-timed PWM via pigpio**, telemetry).
  **Don't claim the DH kinematics / trajectory analysis** (a teammate's work). 5 DC motors, 21 waypoints,
  ~200 Hz target loop, ~$168 prototype. Signature story: software-timed PWM failed because the Pi's non-real-time
  OS jittered the loop period → switched to hardware-timed (DMA) PWM.
  (Exact DOF wording in the copy is being tweaked by the owner — defer to what's on the page.)

## When done
Serve locally, screenshot in **both** light and dark, confirm every internal link/asset resolves and every
image has `alt`. Static site — nothing to build; just save and preview.
