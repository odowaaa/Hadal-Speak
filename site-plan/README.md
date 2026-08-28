# Proposed Compound Wall & Access Layout — 2D Site Plan

This folder contains CAD-style 2D site plans converted from hand-marked
reference images showing a proposed compound boundary wall around
**Office MOG** and **House MOG**.

**Two versions exist, from two different reference sketches — they are not
revisions of each other:**

- **This folder (v1)** — from an undimensioned photo-mockup sketch (Main
  Gate on the left, Emergency Doors, Back Gate for Truck at the bottom).
  Everything is schematic/NTS since no dimensions were given.
- **[`v2-dimensioned/`](v2-dimensioned/)** — from a second, dimensioned
  hand-marked sketch (Front Main Gate at the bottom, Back Gate at the top,
  House back door and Gate on the right; 14/18/30.4/4/30.5 m labelled).
  This version is drawn **to true scale** for the labelled runs and is the
  more authoritative of the two — see its own README for details and
  open flags.

If you're looking for the latest/most accurate drawing, use `v2-dimensioned/`.

## Files (this folder, v1)

| File | Format | Purpose |
|---|---|---|
| `compound-wall-site-plan.svg` | SVG (editable vector) | Primary deliverable — open/edit in Illustrator, Inkscape, Figma, etc. |
| `compound-wall-site-plan.dxf` | DXF (CAD) | Import into AutoCAD / other CAD software for further drafting. |
| `compound-wall-site-plan.pdf` | PDF | Printable drawing. |
| `compound-wall-site-plan.png` | PNG | Quick-look preview / raster export. |

## What the drawing shows

- **Boundary wall** (0.40 m thick, 2.80 m high) — drawn as a filled/double-line
  polygon that follows the exact bend sequence traced from the red line in the
  reference sketch: large upper compound around Office MOG, a stepped
  right-hand edge, a narrower connecting section, and a lower enclosure
  around House MOG, closing back to the main gate side.
- **Existing buildings** — Office MOG and House MOG footprints, shown as
  reference-only (yellow outline), not redesigned.
- **Five access points**, each shown at the location indicated by the arrows
  in the reference image and distinguished by symbol/type (see the drawing's
  own Legend and Access Points Schedule):
  1. Main Gate (perimeter, vehicle + pedestrian)
  2. Emergency Door — north/upper boundary (perimeter, pedestrian)
  3. Back Gate – Truck Access (perimeter, vehicle)
  4. Emergency Door — lower/right boundary (perimeter, pedestrian)
  5. House Entry Door (building door on House MOG, **not** a wall opening)
- **North arrow, legend, general notes, title block, and a dedicated
  "FIELD MEASUREMENTS / TBD" panel.**

## Important limitations (read before construction)

- The reference image is a hand-marked satellite/sketch, **not a survey**.
  Only the wall's relative geometry (corners, bends, proportions) and the
  two specified construction values — **wall thickness 0.40 m** and
  **wall height 2.80 m** — are taken as given.
- **No other dimension has been invented.** Overall site size, gate/door
  widths, building dimensions, and setbacks are all marked **TBD** on the
  drawing and must be confirmed by field survey before construction.
- The drawing is explicitly marked **NTS (Not To Scale)** and
  **CONCEPT / FOR REVIEW**.

## Regenerating / editing

The SVG was generated programmatically (wall thickness computed as a true
buffered polygon around the traced centerline, so corners stay mitred and
consistent). If the underlying geometry needs to change, it's easiest to
edit `compound-wall-site-plan.svg` directly (it's plain, hand-readable
vector markup), or open the DXF in CAD software and redraw offsets there.
