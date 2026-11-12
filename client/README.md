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
- “See my work” opens `/index#overview`: a full-screen introduction with the landing page’s flower, framed crop, staggered links, and editorial copy. Scrolling enters the work reel.
- Each gallery item fills the viewport and reuses the individual work page’s iframe/image renderer, scaling, focus rectangle, and text placement. Gallery-specific blur panels are grayscale and grainy, with matching neutral edges between scenes; only the focus window remains in color. There are no card containers or dividers.
- Full-screen scroll snapping and a wheel-gesture handler advance one scene at a time. Touch scrolling stays native; reduced-motion preferences disable mandatory snapping and the wheel handler. The landing-style “+” opens the work index, category filters, and career/contact links. Each focus window opens the existing `/work/:slug` page.
- Opening an item saves its position and category in session storage. The existing close link returns to the same place in the gallery. Filtered galleries can also be opened with `?category=experience`, `freelance`, `projects`, or `community`.
- The home-page monochrome rules live in `src/Browsing.css`; the gallery’s full-screen composition is in `src/Gallery.css` and `src/WorkShowcase.tsx`. `src/WorkSceneMedia.tsx` shares the existing media markup between individual pages and the gallery. Original item data remains in `src/App.tsx`.
- The landing and work-page blurred areas have a static film-grain texture; focused previews and interface text remain untextured.
- Work pages embed each public website at a reduced scale behind a blurred backdrop. The focused rectangle expands on hover or keyboard focus and links to the site. Some external sites may prevent embedding.
- Items without a public website use their supplied artwork, fitted within the viewport over a blurred background; their focus rectangle links to a GitHub repository when one exists. The apartment and course interfaces are layered from the original artwork above the focus border. Tutoring and government use white backdrops, and the charity artwork uses a matching blue fill.
- Each work page pairs the item title with concise real-world impact and technical details sourced from the experience files.
- The typography uses a regular-weight, tightly spaced sans-serif editorial style; work-page text retains each item's accent color.
- Gallery artwork from the root `item-images/` directory is published from `public/item-images/`.
- The animated tracking overlay runs on the landing page, gallery, and individual work pages. It is the dependency-free script in `public/blob-overlay.js`, sourced from `blob-tracking/blob-overlay.js`; its lifecycle, density, motion preferences, and soft masks are managed by `src/App.tsx`. The gallery mounts live embeds only for the current scene and its immediate successor, using the supplied artwork while previews load.
