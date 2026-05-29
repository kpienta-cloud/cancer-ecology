# Cancer Ecology Center — Site Source (v3.3)

Static-site source for the Cancer Ecology Center at the Johns Hopkins Brady Urological Institute, deployed via GitHub Pages.

Pure HTML, CSS, and JavaScript — no build step, no backend, no dependencies.

## Architecture

v3.3 reframes the site around three clinical pillars — **Risk · Detection · Treatment** — with the eco-evolutionary framework positioned as the underlying methodology. Through-line: **Predict · Detect · Intercept**.

Pages:

- `index.html` — Home
- `overview.html` — Framework overview
- `risk.html` — Risk pillar (exposure, susceptibility, BGES cohort, ExposoGraph/GeoToxGraph)
- `detection.html` — Detection pillar (IsoMCED, CTCs, ctDNA, PSMA, DTCs, dormancy)
- `treatment.html` — Treatment pillar (Prairie-Dogs G-function, adaptive therapy, CEDT)
- `care.html` — Clinical programs
- `writing.html` — Editorial
- `program.html` — The Center & consortium
- `tools.html` — Instruments index
- `donate.html` — Giving
- `legacy.html` — History
- `contact.html` — Contact

## Live site

https://kpienta-cloud.github.io/cancer-ecology/

## Local preview

Any static file server will work, e.g.:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/.

## Editing

Each page is a standalone `.html` file at the project root. Shared styles live in `assets/css/`, scripts in `assets/js/`, images and downloads in `assets/images/` and `assets/downloads/`.

To wire in the live Substack RSS feed once the publication exists, set `window.CEC_CONFIG.substackFeedUrl` in `assets/js/config.js`.

## Co-directed by

Kenneth J. Pienta, MD &middot; Sarah R. Amend, PhD
The Brady Urological Institute &middot; Johns Hopkins University School of Medicine
