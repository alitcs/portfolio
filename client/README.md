# Ali Hamoudi — Portfolio

The portfolio is a React, TypeScript, and Vite application.

## Development

```powershell
npm install
npm run dev
npm run build
npm run lint
```

## Work previews

- The landing page fits the viewport. Its work links lead to the separate `/index` gallery.
- Work pages embed each public website at a reduced scale behind a blurred backdrop. The focused rectangle expands on hover or keyboard focus and links to the site. Some external sites may prevent embedding.
- Items without a public website use their supplied artwork, fitted within the viewport over a blurred background; their focus rectangle links to a GitHub repository when one exists. The apartment and course interfaces are layered from the original artwork above the focus border. Tutoring and government use white backdrops, and the charity artwork uses a matching blue fill.
- Each work page pairs the item title with concise real-world impact and technical details sourced from the experience files.
- The typography uses a regular-weight, tightly spaced sans-serif editorial style; work-page text retains each item's accent color.
- Gallery artwork from the root `item-images/` directory is published from `public/item-images/`.
- The site-wide animated tracking overlay is the dependency-free script in `public/blob-overlay.js`, sourced from `blob-tracking/blob-overlay.js`. Its instance lifecycle, route-specific density, motion settings, and soft masks around text and controls are managed by `src/App.tsx`.
