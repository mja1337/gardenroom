# Gardenroom

Personal React / Three.js garden-room configurator based on supplied photographs.

## Run

`npm install` then `npm run dev`. Build using `npm run build`.

## Model assumptions

- Rear boundary is 10 m, as supplied. Garden length defaults to an editable 22 m visual estimate, not a measured or photogrammetric reconstruction.
- Current ground-level photos take priority over historical aerial images. House, fences, garden structures, planting and surrounding buildings are approximate context geometry.
- Room dimensions represent external wall footprint. Cost = width × depth × editable rate, initially £1,300/m². No assumptions about VAT or included specification; site works and extras are excluded.
- Side windows and door use overlay glazing in this initial concept model. Interior cutaway is a visualization aid. Furniture and air conditioning are deferred.
- Left/right position is constrained within the 10 m boundary. Roof, deck and canopy can extend outside the wall footprint; this is a visual planning tool, not a construction drawing.
- The design stays in memory. Save image downloads the current 3D view.

## Checks

`npx playwright test smoke.spec.js` against the local development server checks pricing, controls, camera views, photo references and mobile overflow.
