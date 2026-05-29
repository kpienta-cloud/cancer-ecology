# Cancer Ecology Center — Site Source

Static-site source for the Cancer Ecology Center at the Johns Hopkins Brady Urological Institute, deployed via GitHub Pages.

Pure HTML, CSS, and JavaScript — no build step, no backend, no dependencies.

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
