# Gardenroom

Interactive garden room planner in React / Three.js. Configure dimensions, construction layers, openings, electrics and placement in 3D, with England planning screening and a running cost estimate.

```bash
npm install
npm run dev
```

`npm run build` produces the static site.

## Mobile & GitHub Pages

The editor switches between **3D view** and **Edit** panels on screens under 900px wide, with a bottom dock for quick navigation. Session edits autosave in the browser.

Deploy to GitHub Pages:

1. Push to `main` on GitHub (repo name `gardenroom`).
2. In the repository **Settings → Pages**, set source to **GitHub Actions**.
3. The **Deploy GitHub Pages** workflow publishes `https://<user>.github.io/gardenroom/`.

Local checks:

```bash
npm run build:pages
npm run preview:pages
```

Set `GITHUB_PAGES=true` when building so asset paths use the `/gardenroom/` base path.

## Demo specification

The default external footprint is 7.3 × 4 m (£37,960 at £1,300/m²), overall height 2.45 m. French door 1.6 m, corner window, construction layers and electrical quantities follow a sample supplier quote. Each enabled bifold door adds £2,000; other changes use explicit price adjustments. Disabling quoted items does not deduct an invented credit from the base price.

The **Site** tab sets a generic plot context (rear boundary width and depth) for placement — not tied to any real property.

## Model limits

This is an illustrative construction model, not structural detailing or a survey. Nominal 4 × 2 C24 is represented as 47 × 100 mm; actual section, spans, cavity/ventilation details, moisture control and thermal/fire performance must be confirmed. Unspecified layer thicknesses are labelled as assumptions. Frame and insulation share cavities. Exploded view lifts/separates assemblies for inspection; height checks use the assembled building.

Individual openings use wall cut-outs with overlap and height warnings. Doors and window opening angles are schematic. Wall offsets are measured left-to-right looking from outside that wall. Electrical placements and cable routes are visual planning only.

## England planning screening

Numeric guard caps overall height to 2.5 m when any modelled roof/gutter projection is within 2 m of any boundary; otherwise 3 m for flat/pent and 4 m for gable, with a separate 2.5 m eaves cap. Deck platforms are limited to 0.3 m.

The app never equates a passed height check with permission not being required. Plot coverage, original-house additions, listed status, designated land, restrictions, eligibility and use need property facts. Building regulations are screened separately using internal floor area and conservative projection clearance. Sources are linked in the app; rules checked 11 September 2026.

## Validation

```bash
node --test src/design.test.js
```

Browser tests in `smoke.spec.js` are optional and require the dev server.
