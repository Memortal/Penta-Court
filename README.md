# Penta Court — Botanical BIM + Spatial Activities

An experimental computational architecture and botanical BIM project by **MEMO Studio**.

**Project:** 660 × 660 ft site study · 262 homes · 25 planted roofs · 20 spatial activity prototypes.

## Open the project

The homepage (\`index.html\`) connects two interactive workspaces:

1. **Spatial Activities & Experiences** — \`activities.html\`: twenty procedural isometric studies drawn from public-space activity references supplied for this project, arranged into arrival, culture, mobility, social, play, landscape, and productive categories.
2. **Original 3D BIM viewer** — \`Penta_Court_Viewer (4).html\`: the original self-contained architectural model, garden simulation, apartment facades, roof access, elevator studies, robots and drawing set.

### Twenty activity prototypes

| 01–05 | 06–10 | 11–15 | 16–20 |
| --- | --- | --- | --- |
| Arrival Plaza | Community Retail Interface | Landscape Viewing Deck | Ecological Nature Trail |
| Interpretive Exhibition Walk | Interactive Play Landscape | Active Play Zone | Social Dining Pavilion |
| Pedestrian & Cycle Circulation | Hammock Garden & Rest Zone | Active Recreation Zone | Informal Social Nodes |
| Community Event Plaza | Outdoor Workspaces | Interactive Pedestrian Promenade | Contemplative Retreat |
| Terraced Social Spaces | Amphitheatre & Performance Space | Community Productive Landscape | Bicycle Parking Infrastructure |

Activity workspace features include:

- Twenty distinct interactive isometric diagrams, program descriptions and spatial elements
- Category filtering and program inclusion/exclusion
- A **conceptual** 660 × 660 ft placement map with draggable nodes and keyboard controls
- Exportable placement JSON and CSV program schedule
- Mobile-responsive interface and direct navigation to the original BIM model

**Important:** The new activities are schematic program prototypes and a separate siting layer, **not** yet installed as BIM geometry within the 24.5 MB source model. Locations and components are illustrative; egress, accessibility, structural loads, life safety and building service coordination are not validated.

## Run locally

Run a local server from the repository root:

\`\`\`bash
python -m http.server 8000
\`\`\`

Open http://localhost:8000/ to enter the unified homepage, or open http://localhost:8000/activities.html directly.

## GitHub Pages

Open **Settings → Pages** and choose **Deploy from a branch**, **main**, **/(root)**, then save. After deployment the project root should be at:

https://memortal.github.io/Penta-Court/

GitHub Pages publishes the static HTML, CSS and JavaScript. No build step is needed. The large original model may take time to load on mobile connections.

## Technical notes

- \`index.html\` — unified site navigation
- \`activities.html\`, \`activities.css\`, \`activities.js\` — new activity design and siting tools
- \`Penta_Court_Viewer (4).html\` — original self-contained 3D model, preserved

The original building/growth/robot logic remains separate from the new conceptual activity studies.