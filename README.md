# Gardenroom

Photo-based garden planner in React / Three.js. `npm install`, then `npm run dev`; `npm run build` produces the static site.

## Quoted specification

The default external footprint is 7.3 × 4 m (£37,960 at £1,300/m²), overall height 2.45 m. French door 1.6 m, two 0.8 × 0.8 m windows, construction layers and all electrical quantities follow the supplied quote. Each enabled bifold door adds £2,000; other changes use explicit supplier price adjustments. Disabling quoted items does not deduct an invented credit from the base price. Export spec saves the current detailed JSON; unsaved state remains in memory.

## Model limits

Garden rear boundary is confirmed as 10 m; garden length and surroundings are approximate. The 22 m default is editable. This is an illustrative construction model, not structural detailing or a survey. Nominal 4 × 2 C24 is represented as 47 × 100 mm; actual section, spans, cavity/ventilation details, moisture control and thermal/fire performance must be confirmed. Unspecified layer thicknesses are labelled as assumptions. Frame and insulation share cavities. Exploded view lifts/separates assemblies for inspection; height checks use the assembled building.

Individual openings use wall cut-outs with overlap and height warnings. Doors and window opening angles are schematic. Wall offsets are measured left-to-right looking from outside that wall. Electrical placements and cable routes are visual planning only.

## England planning screening

Confirmed jurisdiction: England. Numeric guard caps overall height to 2.5 m when any modelled roof/gutter projection is within 2 m of any boundary; otherwise 3 m for flat/pent and 4 m for gable, with a separate 2.5 m eaves cap. Deck platforms are limited to 0.3 m. Close-limit warnings allow for survey/build uncertainty. Height is from adjacent ground, with exposed base included.

The app never equates a passed height check with permission not being required. Plot coverage, original-house additions, listed status, designated land, restrictions, eligibility and use need property facts. Coverage uses user-entered curtilage excluding the original house, not the photographed lawn. Building regulations are screened separately using internal floor area and conservative projection clearance. Timber construction is not treated as non-combustible merely because it has fibre-cement cladding. Sources are linked in the app; rules checked 11 September 2026.

## Validation

`node --test src/design.test.js` covers defaults, costs, height/position guards, unknown-property and coverage warnings, building-regulations separation, opening conflicts, cavity thickness and cable routing. Browser tests in `smoke.spec.js` are optional and require the dev server; they were not run for this update.
