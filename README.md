# Penta Court — Botanical BIM Viewer

Interactive single-page architectural concept viewer for **Penta Court, Concept 15**, by MEMO Studio.

## Project overview

- 660 × 660 ft conceptual site
- 262 homes and 25 planted roofs
- Interactive 3D model and apartment facade inspection
- Roof access and garden planting views
- Illustrative 30-year plant growth scenarios
- Simulated garden-care robot routes and activities
- Elevator studies
- Schematic drawing set with SVG/PDF export controls

## Run locally

Open `index.html` in a recent browser (Chrome, Edge, or Firefox). The model and geometry data are embedded into the HTML, so no build tools or external services are required. Optionally, start a local server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish with GitHub Pages

1. Upload `index.html` to the repository root.
2. In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then save.
3. Visit https://memortal.github.io/Penta-Court/ after deployment.

## Scope and caveats

This is a schematic, conceptual viewer—not validated design documentation or a commissioned robotic or environmental system. Growth estimates, robotic behavior, sensor readings, and related simulations are illustrative. Construction feasibility, egress, structure, and systems require additional design and verification.

## Technical notes

The original viewer is a single self-contained `index.html` file using browser-native HTML, CSS, JavaScript and WebGL, with compressed model data embedded in the page. Its large data payload may take time to load on slower devices.
